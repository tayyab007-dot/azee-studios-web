"use client";

import { Star, Quote, PlayCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Moz", role: "Client", text: "Vouch @azeeden for gfx service ❤️ quick guy" },
  { name: "Guss", role: "Web Client", text: "Vouch @azeeden for web development service, instant and trusted service" },
  { name: "Anonymous", role: "Design Client", text: "Vouching @AzeeDen for quick graphic work. Helpful guy" },
  { name: "Simi", role: "SMM Client", text: "@AzeeDen Good social media manager, Vouch 🖤" },
  { name: "Haider", role: "Development Client", text: "Best go to Developer on Telegram Vouching @AzeeDen✅Will hire you again fs❤️" },
  { name: "sfren", role: "Art Client", text: "Vouch for AzeeDen, helped me with getting art work done, very fast and responsive!" },
  { name: "Crypto Ballout", role: "Crypto Client", text: "You’re going to be my firm graphic designer now" },
  { name: "luxa", role: "Video Client", text: "Vouch @Azeeden best gfx and video work" },
  { name: "fuerza.regida", role: "Client", text: "Vouch for Azee good work fast and simple good guy 💯" },
  { name: "Agency Owner", role: "Agency Client", text: "Vouch Azee, fast turn around time and best graphics in the comm helped me with the rebranding of my OF agency" },
  { name: "death", role: "Design Client", text: "Vouch @AzeeDen did logos, posts and stories for me. He was patient and easy to work with !!" },
  { name: "ghost", role: "Client", text: "Vouch @azeeden Quick turn around times and good pricing. Great designs as well" },
  { name: "Restaurant Owner", role: "Local Business", text: "Vouch @Azee, edited some Quality Videos for my restaurant, will work with you again fs" }
];

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            What our <span className="text-gradient">clients</span> say
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group max-w-[100vw] -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[400px] flex-shrink-0 bg-card border border-border rounded-2xl p-8 flex flex-col shadow-sm whitespace-normal"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[url(#star-gradient)] text-transparent" />
                  ))}
                  <svg width="0" height="0">
                    <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff4d8d" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                  </svg>
                </div>
                
                <Quote className="w-8 h-8 text-accent/20 mb-4" />
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                  &quot;{testimonial.text}&quot;
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border text-lg font-bold text-muted-foreground">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{testimonial.name}</h4>
                    <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient Fades for Marquee */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>

        {/* Featured Video Testimonial */}
        <div className="mt-24 mb-16 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch">
            {/* Left: Text & Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center flex-1 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-8 text-accent/5">
                <Quote className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  &quot;Incredible quality and fast turnaround!&quot;
                </h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Watch our client share their experience working with our team and how we helped bring their vision to life with stunning visuals.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Verified Client</h4>
                    <span className="text-sm text-muted-foreground">Telegram Vouch</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Video */}
            <div className="w-full md:w-[400px] lg:w-[450px] shrink-0 bg-card relative flex items-center justify-center border-t md:border-t-0 md:border-l border-border/50">
              <video 
                src="/reviews/vouch_video.mp4" 
                controls
                playsInline
                preload="metadata"
                className="w-full max-h-[500px] object-contain" 
              />
            </div>
          </div>
        </div>

        {/* Telegram Vouch Panel */}
        <div className="mt-20 max-w-xl mx-auto">
          <Link href="https://t.me/VouchedZee" target="_blank" rel="noopener noreferrer" className="block group w-full relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 flex items-center gap-6 hover:border-blue-500/50 transition-colors shadow-lg relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                {/* Telegram Icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[-2px] mt-[2px]">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-foreground font-bold text-xl leading-tight mb-2 truncate">Join our Telegram</h4>
                <p className="text-muted-foreground text-sm">Read 100+ verified client reviews and stay updated with our latest work.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 text-blue-500 group-hover:text-white transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
