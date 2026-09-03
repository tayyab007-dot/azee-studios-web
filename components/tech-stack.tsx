"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Video, Mic, Edit3, Type, Layers } from "lucide-react";

const categories = [
  "Design & Visual Branding",
  "Brand Strategy & Management",
  "Marketing & Advertising",
  "Website & Online Presence",
  "Analytics & Performance Tracking",
  "Content & Video Branding",
];

const tools = [
  { name: "Adobe Premiere Pro", icon: Video },
  { name: "CapCut", icon: Edit3 },
  { name: "After Effects", icon: Layers },
  { name: "ElevenLabs", icon: Mic },
  { name: "Illustrator", icon: ImageIcon },
  { name: "Midjourney", icon: Type },
];

export function TechStack() {
  return (
    <section className="py-24 bg-card/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Technologies We Work With
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            We embrace emerging technologies and industry-standard tools to provide smarter, faster, and more efficient digital solutions for our clients.
          </p>
        </div>

        {/* Categories (Visual Pills) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, index) => {
            const isActive = category === "Content & Video Branding";
            return (
              <div
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border ${
                  isActive
                    ? "bg-accent text-white border-2 border-accent shadow-md"
                    : "bg-transparent text-muted-foreground border-border hover:border-muted-foreground/50 hover:text-foreground"
                }`}
              >
                {category}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-12" />

        {/* Tools Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-card/20 border border-border/50 hover:border-accent transition-colors group"
            >
              {/* TODO: replace with real asset - Tool Logo */}
              <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-3 group-hover:bg-accent/10 group-hover:text-accent transition-colors text-muted-foreground">
                <tool.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-center px-2 text-muted-foreground group-hover:text-foreground transition-colors">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
