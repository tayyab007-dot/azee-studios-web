"use client";

import { motion } from "framer-motion";
import { Monitor, Gamepad2, PenTool, Palette, Video, TrendingUp, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Web & App Development",
    description: "High-performance websites and mobile applications built with modern frameworks.",
    icon: Monitor,
    image: "/services/web and app dev.png",
    tags: ["Web Development", "Mobile Apps", "Full-Stack"],
  },
  {
    title: "Game Dev & 3D",
    description: "Immersive game development and high-quality 3D modeling and animation.",
    icon: Gamepad2,
    image: "/services/3d and game dev.png",
    tags: ["Game Development", "3D Modeling", "3D Animation"],
  },
  {
    title: "UI/UX & Product Design",
    description: "Intuitive and beautiful interfaces driven by user research and product design principles.",
    icon: PenTool,
    image: "/services/uiux.png",
    tags: ["UI/UX Design", "Product Design", "Creative Direction"],
  },
  {
    title: "Visual & Brand Identity",
    description: "Striking visual asset creation, brand identity design, and motion graphics.",
    icon: Palette,
    image: "/services/visual and brand identity.png",
    tags: ["Brand Identity", "Graphic Design", "Motion Graphics"],
  },
  {
    title: "Media & Video Content",
    description: "Engaging short and long-form video content tailored for modern platforms.",
    icon: Video,
    image: "/services/vedio and media.png",
    tags: ["Short-Form Video", "Long-Form Video", "Content Creation"],
  },
  {
    title: "Marketing & Strategy",
    description: "Data-driven digital marketing and social media strategies to scale your brand.",
    icon: TrendingUp,
    image: "/services/marketing strategy.png",
    tags: ["Digital Marketing", "Social Media Strategy", "Growth"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section id="services" className="pt-4 md:pt-6 pb-16 md:pb-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
            Services
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Everything you need to <br className="hidden md:block" />
            <span className="text-gradient inline-block mt-2 md:mt-4">build & ship</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            End-to-end development and design services for ambitious teams and startups. We bring complex digital concepts to life with technical speed and precision.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{ animationDelay: `${index * 0.2}s` }}
              className="group relative h-full animate-float z-10 hover:z-20"
            >
              {/* Contained gradient glow strictly BEHIND the card (doesn't bleed into gaps) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[70%] bg-gradient-to-br from-[#ff1e56] to-purple-600 opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-50 transition-all duration-700 blur-[35px] rounded-full -rotate-12 -z-10 pointer-events-none" />

              {/* The Foggy Frosted Glass Card */}
              <div className="relative rounded-[2rem] p-6 transition-all hover:shadow-2xl overflow-hidden flex flex-col h-full border border-black/60 dark:border-white/30 hover:border-black/80 dark:hover:border-white/60 bg-white/30 dark:bg-white/10 backdrop-blur-[60px] backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                
                {/* Gradient Hover Glow behind card */}
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              
              {service.image && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden mb-5 relative shadow-md ring-1 ring-border/50 group-hover:ring-accent/50 transition-all duration-500">
                  <img src={service.image} alt={service.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-background/90 backdrop-blur-md flex items-center justify-center text-[#ff1e56] ring-1 ring-border shadow-lg group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                    <service.icon className="w-5 h-5" />
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-3 relative z-10">
                <h3 className="text-2xl font-bold pr-2">{service.title}</h3>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-card ring-1 ring-border opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#ff1e56] group-hover:ring-accent shadow-sm shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed flex-grow relative z-10">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-6 py-1.5 text-xs font-semibold bg-background ring-1 ring-border rounded-full text-muted-foreground group-hover:ring-accent/30 group-hover:text-foreground transition-colors duration-300"
                  >
                    {tag}
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
