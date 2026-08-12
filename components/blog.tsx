"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";

interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  coverImage?: string;
  createdAt: string;
}

const FALLBACK_BLOG_IMAGE = "/branding/NxC b.jpg";

export function Blog() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts || []);
        }
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-8 md:py-12 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
            Insights
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-muted-foreground">
            Read the latest news, design trends, and engineering deep-dives from our team.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground font-medium">Loading articles...</p>
          </div>
        ) : (
          /* Blog Grid - Fixed aspect-ratio to prevent layout shift & mobile lag */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group bg-card border border-black/20 dark:border-white/20 rounded-3xl overflow-hidden flex flex-col hover:border-accent dark:hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                {/* Image Header with Fixed Aspect Ratio */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
                  <img
                    src={post.coverImage || FALLBACK_BLOG_IMAGE}
                    alt={post.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_BLOG_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-accent border border-border/80 shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read Article Button */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p>New articles coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}
