import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import mongoose, { Schema, model, models } from "mongoose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Client" },
    text: { type: String, required: true },
    screenshotUrl: { type: String, default: "" },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ReviewModel = models.Review || model("Review", ReviewSchema);

// GET: Fetch Reviews
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    const query = all === "true" ? {} : { isApproved: true };
    const reviews = await ReviewModel.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, reviews },
      { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST: Create Review
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newReview = await ReviewModel.create(body);
    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create review" }, { status: 500 });
  }
}

// PUT: Approve Review
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const id = body.id || body._id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid Review ID" }, { status: 400 });
    }

    const updated = await ReviewModel.findByIdAndUpdate(
      id,
      { $set: { isApproved: true } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Review document not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    console.error("Approve API Error:", error);
    return NextResponse.json({ success: false, error: error?.message || "DB update error" }, { status: 500 });
  }
}