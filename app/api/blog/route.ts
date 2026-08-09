import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";

// GET: Fetch all published blog posts
export async function GET() {
  try {
    await connectToDatabase();

    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.error("GET Blog Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}

// POST: Create a new blog post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, readTime, coverImage } = body;

    if (!title || !slug || !content || !excerpt) {
      return NextResponse.json(
        { error: "Title, slug, excerpt, and content are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newPost = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      category: category || "Engineering",
      readTime: readTime || "5 min read",
      coverImage: coverImage || "/assets/branding/NxC b.jpg",
    });

    return NextResponse.json(
      { message: "Blog post published successfully!", post: newPost },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Blog Error:", error);
    return NextResponse.json(
      { error: error.code === 11000 ? "Slug already exists." : "Internal server error." },
      { status: 500 }
    );
  }
}