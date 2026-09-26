import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PRODUCTS } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const metal = searchParams.get("metal");
    const stone = searchParams.get("stone");
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
    const search = searchParams.get("search")?.toLowerCase();

    // Check if products exist in Prisma DB
    const dbCount = await prisma.product.count();

    let items;
    if (dbCount > 0) {
      const whereClause: Record<string, unknown> = {};
      if (category && category !== "all") whereClause.category = category;
      if (metal && metal !== "all") whereClause.metal = metal;
      if (stone && stone !== "all") whereClause.stone = stone;
      if (maxPrice) whereClause.price = { lte: maxPrice };

      const dbProducts = await prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
      });

      items = dbProducts.map((p) => ({
        ...p,
        images: JSON.parse(p.images || "[]"),
      }));
    } else {
      // Use structured mock data
      items = PRODUCTS.filter((p) => {
        if (category && category !== "all" && p.category !== category) return false;
        if (metal && metal !== "all" && p.metal !== metal) return false;
        if (stone && stone !== "all" && p.stone !== stone) return false;
        if (maxPrice && p.price > maxPrice) return false;
        if (search && !p.name.toLowerCase().includes(search) && !p.description.toLowerCase().includes(search)) {
          return false;
        }
        return true;
      });
    }

    return NextResponse.json({
      success: true,
      count: items.length,
      products: items,
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve jewellery products." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        subtitle: body.subtitle,
        description: body.description,
        price: Number(body.price),
        discountPrice: body.discountPrice ? Number(body.discountPrice) : null,
        category: body.category,
        metal: body.metal,
        stone: body.stone,
        stock: body.stock ? Number(body.stock) : 1,
        images: JSON.stringify(body.images || []),
        rating: body.rating ? Number(body.rating) : 5.0,
        sku: body.sku,
        purity: body.purity,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to add new jewellery product." },
      { status: 500 }
    );
  }
}
