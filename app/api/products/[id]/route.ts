import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PRODUCTS } from "@/lib/mockData";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check DB first
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    });

    if (dbProduct) {
      return NextResponse.json({
        success: true,
        product: {
          ...dbProduct,
          images: JSON.parse(dbProduct.images || "[]"),
        },
      });
    }

    // Fallback to mock product
    const mockProduct = PRODUCTS.find((p) => p.id === id);
    if (!mockProduct) {
      return NextResponse.json(
        { error: "Jewellery product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: mockProduct,
    });
  } catch (error) {
    console.error("Product GET by ID error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve product details." },
      { status: 500 }
    );
  }
}
