"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { LazyVideo } from "@/components/ui/lazy-video";

interface PortfolioAsset {
  _id: string;
  idString: string;
  category: string;
  type: "image" | "video";
  url: string;
  title: string;
}

const categories = [
  { id: "logos", label: "Logos" },
  { id: "posts", label: "Posts" },
  { id: "motion-graphics", label: "Motion Graphics" },
  { id: "memecoins", label: "Memecoins" },
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";

export function PortfolioGallery() {
  const [activeTab, setActiveTab] = useState("logos");
  const [allAssets, setAllAssets] = useState<PortfolioAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [selectedAsset, setSelectedAsset] = useState<PortfolioAsset | null>(null);

  useEffect(() => {
    const handleSetTab = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('setPortfolioTab', handleSetTab);
    return () => window.removeEventListener('setPortfolioTab', handleSetTab);
  }, []);

  useEffect(() => {
    async function fetchAllPortfolio() {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        if (res.ok && Array.isArray(data.items)) {
          setAllAssets(data.items);
        }
      } catch (error) {
        console.error("Failed to load portfolio items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPortfolio();
  }, []);

  // Filter duplicate images based on URL & match active category
  const filteredAssets = useMemo(() => {
    if (!allAssets.length) return [];
    
    // 1. Filter by Active Category
    const categoryFiltered = allAssets.filter(
      (item) => item.category.toLowerCase().trim() === activeTab.toLowerCase().trim()
    );

    // 2. Remove Duplicate Images (Keep only unique URLs)
    const uniqueAssets: PortfolioAsset[] = [];
    const seenUrls = new Set<string>();

    for (const item of categoryFiltered) {
      const cleanUrl = item.url.trim();
      if (!seenUrls.has(cleanUrl)) {
        seenUrls.add(cleanUrl);
        uniqueAssets.push(item);
      }
    }

    const PREFERRED_KEYWORDS: Record<string, string[]> = {
      // 1: V logo, 2: D logo, 3: H logo, 4: Chat logo
      "logos": ["photo_3_", "photo_4_", "photo_40_", "photo_37_"],
      // 1: Tate, 2: Payment Methods
      "posts": ["photo_1_17", "photo_22_"],
      // 1: Forbes, 2: Charter, 3: Hashium, 4: Ascend
      "motion-graphics": ["video_1_25", "9.16.16 AM (1)", "9.16.15 AM", "motion graphics"]
    };

    uniqueAssets.sort((a, b) => {
      const getRank = (item: PortfolioAsset) => {
        const keywords = PREFERRED_KEYWORDS[activeTab.toLowerCase().trim()] || [];
        for (let i = 0; i < keywords.length; i++) {
          if (item.url && item.url.includes(keywords[i])) return i;
        }
        return 999; // Default rank for everything else
      };

      const rankA = getRank(a);
      const rankB = getRank(b);

      return rankA - rankB; // Returns 0 for equal ranks, preserving original API order
    });

    return uniqueAssets;
  }, [allAssets, activeTab]);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  const visibleAssets = filteredAssets.slice(0, visibleCount);

  return (
    <section id="portfolio" className="pt-8 md:pt-12 pb-4 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 gap-6 text-center">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 block">
            Our Masterpieces
          </span>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight">
            Portfolio Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-lg">
            Explore our diverse range of creative work, from impactful logos and engaging posts to stunning motion graphics and memecoin projects.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              style={{ borderRadius: '9999px', WebkitTapHighlightColor: 'transparent', outline: 'none' }}
              className={`relative px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border-0 overflow-hidden outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 ring-0 select-none ${
                activeTab === category.id
                  ? "bg-[#ff1e56] text-white"
                  : "bg-muted text-muted-foreground hover:bg-accent/20 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground font-medium">Loading Portfolio...</p>
          </div>
        ) : (
          /* Flex Layout for Centering */
          <motion.div
            layout
            className="flex flex-wrap justify-center gap-6 w-full"
          >
            <AnimatePresence mode="popLayout">
              {visibleAssets.map((asset) => (
                <motion.div
                  key={asset._id || asset.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] group relative break-inside-avoid rounded-2xl overflow-hidden bg-card border border-black/20 dark:border-white/20 hover:border-accent dark:hover:border-accent shadow-md transition-all duration-300"
                >
                  <div 
                    className="relative w-full overflow-hidden bg-muted/20 aspect-[4/3] sm:aspect-square md:aspect-[4/3] cursor-pointer"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    {asset.type === "video" ? (
                      <div className="relative w-full h-full">
                        <LazyVideo
                          src={asset.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white/90">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={asset.url}
                        alt={asset.title || "Portfolio Item"}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      />
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 backdrop-blur-[2px]">
                      <span className="text-white font-bold text-lg tracking-wider uppercase">
                        {asset.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredAssets.length > visibleCount && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/25"
            >
              Show More
            </button>
          </div>
        )}

        {!loading && filteredAssets.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p>No assets found for this category yet.</p>
          </div>
        )}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setSelectedAsset(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/50 p-2 rounded-full"
              onClick={() => setSelectedAsset(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedAsset.type === "video" ? (
                <video
                  src={selectedAsset.url}
                  autoPlay
                  controls
                  className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <img
                  src={selectedAsset.url}
                  alt={selectedAsset.title || "Portfolio Item"}
                  className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
