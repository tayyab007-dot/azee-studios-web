"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

type Brand = {
  name: string;
  logoUrl: string;
  posts: string[];
  category: "branding" | "motion" | "crypto";
  serviceProvided: string;
};

const brands: Brand[] = [
  { name: "Hashium", logoUrl: "/branding/logos/hashium (2).jpeg", posts: ["/branding/Hashium b.png"], category: "branding", serviceProvided: "Full Branding" },
  { name: "Easyblast", logoUrl: "/branding/logos/easyblast logo.jpeg", posts: ["/branding/Easyblast b.jpg"], category: "branding", serviceProvided: "Full Branding" },
  { name: "Mozcartel", logoUrl: "/branding/logos/mozcartel.jpeg", posts: ["/branding/Mozcartel b.jpg"], category: "branding", serviceProvided: "Full Branding" },
  { name: "NxC", logoUrl: "/branding/logos/nxc.jpeg", posts: ["/branding/NxC b.jpg"], category: "branding", serviceProvided: "Full Branding" },
  { name: "Tripling", logoUrl: "/branding/logos/tripling.jpeg", posts: ["/branding/tripling b.jpg"], category: "branding", serviceProvided: "Full Branding" },
  { name: "Volunteering", logoUrl: "/branding/logos/volunteering.jpeg", posts: ["/branding/Volunteering b.jpg"], category: "branding", serviceProvided: "Full Branding" },
];

export function BrandsShowcase() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="mb-8 text-center pt-12 mt-8 border-t border-border/40">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
            Branding Showcase
          </span>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-4">
            Our <span className="text-gradient">Branding</span> Work
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            A glimpse into the visual identities and creative directions we've crafted for ambitious brands worldwide.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16 w-full mx-auto pb-12">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col md:flex-row items-center gap-6 lg:gap-10 w-full group"
            >

              <div className="w-full md:w-2/5 flex flex-col items-center justify-center order-2 md:order-1">
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-background border-[3px] border-accent/80 shadow-[0_0_25px_rgba(255,30,86,0.4)] group-hover:border-accent group-hover:shadow-[0_0_45px_rgba(255,30,86,0.7)] overflow-hidden flex items-center justify-center transition-all duration-700 ease-out z-10 group-hover:scale-[1.05]">
                  <img 
                    src={brand.logoUrl || brand.posts[0]} 
                    alt={`${brand.name} logo`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />

                  <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
                </div>
                
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <span className="inline-block px-6 py-1 rounded-full bg-muted/50 border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {brand.serviceProvided}
                  </span>
                </div>
              </div>


              <div className="w-full md:w-3/5 relative rounded-3xl bg-card/20 border-2 border-accent/50 shadow-[0_0_20px_rgba(255,30,86,0.2)] overflow-hidden p-4 md:p-8 flex items-center justify-center min-h-[250px] order-1 md:order-2 group-hover:bg-card/40 group-hover:border-accent group-hover:shadow-[0_0_50px_rgba(255,30,86,0.5)] transition-all duration-500">
                {brand.posts[0] ? (
                  <img 
                    src={brand.posts[0]} 
                    alt={`${brand.name} branding`} 
                    className="w-full max-h-[280px] md:max-h-[340px] object-contain drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 ease-out rounded-xl relative z-10"
                  />
                ) : (
                  <div className="text-muted-foreground/40 flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span>Visual Coming Soon</span>
                  </div>
                )}
                

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-accent/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/20 transition-colors duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
