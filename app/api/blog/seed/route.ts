import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";

const samplePosts = [
  {
    title: "Building High-Performance Web Apps with Next.js 14",
    slug: "building-high-performance-nextjs-14",
    excerpt: "Learn how server components, streaming, and edge caching can supercharge your agency web applications.",
    content: "Next.js 14 brings unprecedented performance improvements through React Server Components...",
    category: "Engineering",
    readTime: "4 min read",
    coverImage: "/branding/Hashium b.png",
  },
  {
    title: "Why Modern Web3 Brands Need Striking Visual Identities",
    slug: "modern-web3-branding-guide",
    excerpt: "Exploring the intersection of UI design, motion graphics, and community trust in crypto projects.",
    content: "In Web3, visual representation directly correlates with project credibility...",
    category: "Design",
    readTime: "6 min read",
    coverImage: "/branding/Mozcartel b.jpg",
  },
  {
    title: "Maximizing Conversion Rates with Targeted Landing Pages",
    slug: "landing-page-conversion-optimization",
    excerpt: "Key architectural principles to turn casual web traffic into high-value qualified client leads.",
    content: "A landing page must deliver clear value propositions within 3 seconds of load time...",
    category: "Marketing",
    readTime: "5 min read",
    coverImage: "/branding/NxC b.jpg",
  },
];

export async function POST() {
  try {
    await connectToDatabase();

    // Clear old unformatted posts and re-seed
    await BlogPost.deleteMany({});
    await BlogPost.insertMany(samplePosts);

    return NextResponse.json({ message: "Successfully updated and re-seeded blog posts!" }, { status: 201 });
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}