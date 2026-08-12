"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    name: "Hero Animation",
    industry: "Motion Graphics",
    description: "A stunning hero animation crafted for high-impact landing pages.",
    metric: "Engaging Visuals",
    tags: ["After Effects", "3D", "Motion"],
    videoUrl: "/projects/hero.mp4", 
  },
  {
    name: "Statue Rendering",
    industry: "3D Art",
    description: "Detailed 3D rendering of a classic statue with modern texturing.",
    metric: "High Fidelity",
    tags: ["Blender", "CGI", "Rendering"],
    videoUrl: "/projects/statue.mp4",
  },
  {
    name: "Watch 3D Model",
    industry: "Product Visualization",
    description: "Photorealistic 3D visualization of a premium luxury watch.",
    metric: "Premium Look",
    tags: ["Cinema 4D", "Product", "Lighting"],
    videoUrl: "/projects/watch.mp4",
  },
  {
    name: "Leaf VFX",
    industry: "VFX",
    description: "Dynamic visual effects featuring a floating leaf simulation.",
    metric: "Smooth Physics",
    tags: ["Simulation", "VFX", "Animation"],
    videoUrl: "/projects/leaf.mp4",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturedWork() {
  return (
    <section id="work" className="py-8 md:py-12 relative bg-card/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Selected Work
            </h2>
          </div>
          <Link
            href="#work"
            className="inline-flex items-center text-sm font-medium hover:text-accent transition-colors pb-2"
          >
            View All Projects <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              style={{ animationDelay: `${index * 0.3}s` }}
              className="group flex flex-col gap-6 animate-float"
            >
              {/* Browser/Device Mockup */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-card border border-black/20 dark:border-white/20 group-hover:border-accent/50 dark:group-hover:border-accent/50 overflow-hidden flex flex-col shadow-lg group-hover:-translate-y-2 transition-all duration-500">
                {/* Browser Top Bar */}
                <div className="h-8 border-b border-border bg-muted/50 flex items-center px-4 gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
                {/* Image Placeholder */}
                <div className="relative flex-1 bg-muted w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <video 
                    src={project.videoUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {project.industry}
                    </span>
                  </div>
                  <Link href="#work" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:border-accent transition-all group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-6 bg-background border border-border w-fit px-3 py-1.5 rounded-lg shadow-sm">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  {project.metric}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {tag} {tagIndex < project.tags.length - 1 && <span className="mx-2 opacity-30">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
