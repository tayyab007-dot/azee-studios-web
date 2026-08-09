"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const niches = [
  {
    num: "01",
    icon: "🏛️",
    title: "Art & Culture",
    tagline: "Immersive. Timeless. Expressive.",
    description: "Elegant and visually immersive websites for brands that celebrate art, culture, history, and creativity.",
    videoUrl: "/projects/statue.mp4",
  },
  {
    num: "02",
    icon: "🛒",
    title: "E-Commerce",
    tagline: "Seamless. Engaging. Converting.",
    description: "Conversion-focused e-commerce websites designed to deliver smooth shopping experiences and drive sales.",
    videoUrl: "/projects/watch.mp4",
  },
  {
    num: "03",
    icon: "🤍",
    title: "Health & Wellness",
    tagline: "Calming. Trustworthy. Human.",
    description: "Clean and approachable websites for healthcare, wellness, and lifestyle brands that build trust and care.",
    videoUrl: "/projects/leaf.mp4",
  },
  {
    num: "04",
    icon: "🎮",
    title: "Gaming & Entertainment",
    tagline: "Bold. Dynamic. Immersive.",
    description: "High-impact websites for gaming studios, entertainment brands, and immersive digital experiences.",
    videoUrl: "/projects/hero.mp4",
  },
];

export function Niches() {
  return (
    <section id="niches" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="mb-20 text-center relative flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-sm mb-6">
            <span className="font-medium text-muted-foreground">Real Projects. Real Impact.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="font-bold text-accent">NDA Protected.</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight mt-2">
            Crafting Digital Experiences <br className="hidden md:block" /> Across <span className="text-accent">Every Niche.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-balance">
            Due to NDA agreements, we are unable to showcase our previous client web projects. However, here&apos;s a glimpse of the types of websites we design and develop.
          </p>
        </div>


        <div className="flex flex-col gap-6">
          {niches.map((niche, index) => (
            <motion.div
              key={niche.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col-reverse md:flex-row bg-card rounded-[2rem] border border-border/50 overflow-hidden hover:border-accent/30 transition-colors duration-500"
            >

              <div className="p-6 md:p-14 flex flex-col justify-center w-full md:w-[45%] relative">
                <span className="text-accent font-bold text-2xl md:text-4xl mb-3 md:mb-4">{niche.num}</span>
                <div className="text-3xl md:text-4xl mb-4 md:mb-6 opacity-80">{niche.icon}</div>
                <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{niche.title}</h3>
                <p className="text-accent font-medium mb-4 md:mb-6 text-base md:text-lg">{niche.tagline}</p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-lg mb-6 md:mb-8">{niche.description}</p>
                

                <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-border/40">
                  <button className="px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 flex items-center gap-2">
                    <span>View Projects</span>
                    <span className="text-lg leading-none">→</span>
                  </button>
                  <button className="px-6 py-2.5 rounded-full bg-muted/50 text-foreground font-medium text-sm border border-border/50 hover:bg-muted transition-colors">
                    Case Study
                  </button>
                </div>
              </div>


              <div className="w-full md:w-[55%] relative min-h-[300px] md:min-h-0 bg-muted/20 flex items-center justify-center overflow-hidden">
                {niche.videoUrl ? (
                  <video
                    src={niche.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-background to-muted flex items-center justify-center">
                    <span className="text-muted-foreground opacity-50">Visual Content Coming Soon</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent w-24 hidden md:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent h-24 mt-auto md:hidden"></div>
              </div>
            </motion.div>
          ))}
        </div>


        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between bg-card/50 p-8 rounded-3xl border border-border/50">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Your ideas are safe with us.</h4>
              <p className="text-sm text-muted-foreground">We respect every client&apos;s privacy and NDA. Excellence you can trust. Results you can see.</p>
            </div>
          </div>
          <div className="text-left md:text-right flex flex-col items-start md:items-end w-full md:w-auto mt-4 md:mt-0 pt-6 md:pt-0 border-t md:border-0 border-border/50">
            <div className="flex items-center justify-start md:justify-end mb-2">
              <img src="/logo.png" alt="Azee Studios" className="h-6 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">We Create <span className="text-accent font-medium">Visual Stories</span> That Connect.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
