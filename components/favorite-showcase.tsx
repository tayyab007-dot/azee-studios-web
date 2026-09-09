"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const favorites = [
  { name: "Hero Animation", videoUrl: "/projects/hero.mp4" },
  { name: "Statue Rendering", videoUrl: "/projects/statue.mp4" },
  { name: "Watch 3D Model", videoUrl: "/projects/watch.mp4" },
  { name: "Leaf VFX", videoUrl: "/projects/leaf.mp4" },
];

function LazyVideo({ src, name }: { src: string, name: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "2500px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <video
        src={isNearViewport ? src : undefined}
        autoPlay={isNearViewport}
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <h3 className="text-white text-xl font-bold">{name}</h3>
      </div>
    </div>
  );
}

export function FavoriteShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
      {favorites.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative bg-card border border-border rounded-3xl overflow-hidden aspect-video group shadow-md hover:shadow-xl transition-all"
        >
          <LazyVideo src={item.videoUrl} name={item.name} />
        </motion.div>
      ))}
    </div>
  );
}
