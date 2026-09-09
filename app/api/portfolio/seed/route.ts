import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import PortfolioItem from "@/lib/models/PortfolioItem";
import { portfolioAssets } from "@/lib/asset-data";

export async function POST() {
  try {
    await connectToDatabase();

    // Check if items already exist
    const count = await PortfolioItem.countDocuments();
    if (count > 0) {
      return NextResponse.json(
        { message: `Database already seeded with ${count} items. Skipping.` },
        { status: 200 }
      );
    }

    // Transform asset data for Mongoose
    const itemsToInsert = portfolioAssets.map((asset) => ({
      idString: asset.id,
      category: asset.category,
      type: asset.type,
      url: asset.url,
      title: asset.title,
    }));

    await PortfolioItem.insertMany(itemsToInsert);

    return NextResponse.json(
      { message: `Successfully seeded ${itemsToInsert.length} portfolio items into MongoDB!` },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}