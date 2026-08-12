import { NextResponse } from "next/server";
import mongoose, { Schema, model, models } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

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

// DELETE: Delete Review by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await ReviewModel.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}

// PUT: Approve Review by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const updated = await ReviewModel.findByIdAndUpdate(
      params.id,
      { isApproved: true },
      { new: true }
    );
    return NextResponse.json({ success: true, review: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Approval failed" }, { status: 500 });
  }
}