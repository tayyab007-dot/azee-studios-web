"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const cryptoProjects = [
  { name: "Crypto Project 1", service: "Memecoin Animation (Coming Soon)", color: "from-accent/90 via-[#ff4a7c] to-[#9d0d3f]", imageUrl: "" },
  { name: "Crypto Project 2", service: "Total Branding (Coming Soon)", color: "from-accent/90 via-[#ff4a7c] to-[#9d0d3f]", imageUrl: "" },
  { name: "Crypto Project 3", service: "Banner (Coming Soon)", color: "from-accent/90 via-[#ff4a7c] to-[#9d0d3f]", imageUrl: "" },
];

export function CryptoShowcase() {
  return (
    <div className="w-full relative overflow-hidden pb-12">
      {/* Playful background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-0 md:px-6 relative z-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {cryptoProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: index * 0.05,
              }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`relative aspect-square rounded-3xl overflow-hidden p-[2px] bg-gradient-to-br ${project.color}`}
            >
              <div className="w-full h-full rounded-[1.4rem] bg-card backdrop-blur-sm flex flex-col p-4">
                
                {/* Image Container */}
                <div className="w-full h-[60%] mb-4 rounded-xl bg-background border border-border overflow-hidden">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                </div>

                {/* Text Container */}
                <div className="w-full flex-1 flex flex-col items-center justify-center text-center">
                  <h3 className="font-bold text-lg w-full truncate mb-1">
                    {project.name}
                  </h3>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-1 bg-background border border-border rounded-full w-full truncate">
                    {project.service}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
