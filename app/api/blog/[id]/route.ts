import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";

// DELETE: Remove a blog post by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Article deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE Article Error:", error);
    return NextResponse.json(
      { error: "Failed to delete article." },
      { status: 500 }
    );
  }
}