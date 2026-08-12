"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandsShowcase } from "@/components/brands-showcase";
import { CryptoShowcase } from "@/components/crypto-showcase";
import { FavoriteShowcase } from "@/components/favorite-showcase";

export function PortfolioTabs() {
  const [activeTab, setActiveTab] = useState<"brands" | "memecoins" | "favorites">("brands");

  return (
    <section className="py-10 md:py-24 relative bg-background">
      <div className="container mx-auto px-4">
        
        {/* Unified Section Header */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-2 md:mb-4 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            Projects We're <span className="text-gradient">Proud Of</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Explore our curated work across different industries and niches.
          </p>
          
          {/* Tabs / Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <button
              onClick={() => setActiveTab("brands")}
              className={`px-4 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full font-medium transition-all duration-300 ${
                activeTab === "brands"
                  ? "bg-accent text-white shadow-lg shadow-accent/20 scale-105"
                  : "bg-muted text-muted-foreground hover:bg-card border border-border"
              }`}
            >
              Design & Visual Branding
            </button>
            <button
              onClick={() => setActiveTab("memecoins")}
              className={`px-4 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full font-medium transition-all duration-300 ${
                activeTab === "memecoins"
                  ? "bg-accent text-white shadow-lg shadow-accent/20 scale-105"
                  : "bg-muted text-muted-foreground hover:bg-card border border-border"
              }`}
            >
              Web3 & Memecoins
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 py-2 md:px-6 md:py-3 text-xs md:text-base rounded-full font-medium transition-all duration-300 ${
                activeTab === "favorites"
                  ? "bg-accent text-white shadow-lg shadow-accent/20 scale-105"
                  : "bg-muted text-muted-foreground hover:bg-card border border-border"
              }`}
            >
              Favorite Projects
            </button>
          </div>
        </div>

        {/* Tab Content - Responsive heights & clean overflow */}
        <div className="mt-6 md:mt-12 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "brands" && (
              <motion.div
                key="brands"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <BrandsShowcase />
              </motion.div>
            )}
            
            {activeTab === "memecoins" && (
              <motion.div
                key="memecoins"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <CryptoShowcase />
              </motion.div>
            )}

            {activeTab === "favorites" && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <FavoriteShowcase />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
