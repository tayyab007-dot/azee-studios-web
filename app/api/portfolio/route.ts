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

    const validItems = items.filter(item => {
      const url = item.url || '';
      return !url.includes('video_5_') && 
             !url.includes('video_6_') && 
             !url.includes('photo_11_') && 
             !url.includes('photo_12_') && 
             !url.includes('photo_13_') &&
             !url.includes('video_21_') &&
             !url.includes('video_22_') &&
             !url.includes('video_23_');
    });

    return NextResponse.json({ items: validItems }, { status: 200 });
  } catch (error: any) {
    console.error("GET Portfolio Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio items." },
      { status: 500 }
    );
  }
}