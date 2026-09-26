import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createOrderSchema } from "@/lib/validations";
import { verifyJwtToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createOrderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Order validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { items, shippingAddress, paymentMethod, voucherCode } = validated.data;

    // Check optional authenticated user
    const token = req.cookies.get("luxora_token")?.value;
    const userPayload = token ? verifyJwtToken(token) : null;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.03); // 3% jewellery tax
    let discount = 0;

    if (voucherCode?.toUpperCase() === "LUXORA10") {
      discount = Math.round(subtotal * 0.1);
    } else if (voucherCode?.toUpperCase() === "GOLDEN") {
      discount = Math.min(15000, subtotal);
    }

    const totalAmount = Math.max(0, subtotal + tax - discount);

    const order = await prisma.order.create({
      data: {
        userId: userPayload?.userId || null,
        subtotal,
        tax,
        shipping: 0,
        discount,
        totalAmount,
        status: "processing",
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod,
        paymentStatus: "confirmed",
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            price: i.price,
            quantity: i.quantity,
            size: i.size || null,
            image: i.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully with white-glove courier dispatch.",
        orderId: `LX-${order.id.slice(-6).toUpperCase()}`,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to place order." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("luxora_token")?.value;
    const userPayload = token ? verifyJwtToken(token) : null;

    const orders = await prisma.order.findMany({
      where: userPayload ? { userId: userPayload.userId } : undefined,
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Orders list error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve orders." },
      { status: 500 }
    );
  }
}
