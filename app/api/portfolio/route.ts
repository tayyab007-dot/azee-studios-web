import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import PortfolioItem from "@/lib/models/PortfolioItem";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    await connectToDatabase();

    const query = category && category !== "all" ? { category } : {};
    const items = await PortfolioItem.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error: any) {
    console.error("GET Portfolio Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio items." },
      { status: 500 }
    );
  }
}