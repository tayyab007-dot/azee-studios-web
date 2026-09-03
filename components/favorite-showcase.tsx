"use client";

import { motion } from "framer-motion";

const favorites = [
  { name: "Hero Animation", videoUrl: "/projects/hero.mp4" },
  { name: "Statue Rendering", videoUrl: "/projects/statue.mp4" },
  { name: "Watch 3D Model", videoUrl: "/projects/watch.mp4" },
  { name: "Leaf VFX", videoUrl: "/projects/leaf.mp4" },
];

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
          <video
            src={item.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <h3 className="text-white text-xl font-bold">{item.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
