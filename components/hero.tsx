"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    /* pt-28 adjusts top spacing cleanly right below the navbar */
    <section className="relative w-full overflow-hidden pt-28 md:pt-32 pb-16 md:pb-20 text-center">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-20%] w-[150vw] h-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(255,30,86,0.12)_0%,transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center">
        {/* Software studio tag - slightly moved up for balanced padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 text-xs md:text-sm font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase text-accent dark:text-white mb-6 drop-shadow-[0_0_15px_rgba(255,30,86,0.6)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <span className="animate-pulse text-accent">●</span>
          <span>SOFTWARE STUDIO · SINCE 2022</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-foreground">
            Software Solutions
            <span className="block text-gradient">Built to Scale.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-base md:text-xl text-muted-foreground mb-10"
        >
          We design, build and ship digital products that drive real business impact. From idea to launch and beyond, we&apos;re your long-term technology partner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto"
        >
          <Link
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-accent text-white rounded-2xl font-medium shadow-lg hover:opacity-95 transition-all duration-300 hover-glow"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-border bg-card/90 rounded-2xl font-medium text-foreground hover:border-accent hover:bg-accent/5 transition-all duration-300 hover-glow"
          >
            View Our Work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm font-medium text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span>120+ projects shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span>40+ engineers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}








// "use client";

// import { motion } from "framer-motion";
// import { ArrowRight, CheckCircle2 } from "lucide-react";
// import Link from "next/link";



// export function Hero() {
//   return (
//     <section className="relative w-full overflow-hidden pt-32 pb-20 text-center">
//       {/* Background Glow */}
//       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//         <div className="absolute left-1/2 -translate-x-1/2 top-[-20%] w-[150vw] h-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(255,30,86,0.12)_0%,transparent_50%)]" />
//       </div>

//       <div className="container relative z-10 mx-auto px-4 flex flex-col items-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.3em] uppercase text-accent dark:text-white mb-8 drop-shadow-[0_0_15px_rgba(255,30,86,0.6)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
//         >
//           <span className="animate-pulse text-accent">●</span>
//           SOFTWARE STUDIO · SINCE 2022
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="max-w-4xl mb-6"
//         >
//           <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-foreground">
//             Software Solutions
//             <span className="block text-gradient">Built to Scale.</span>
//           </h1>
//         </motion.div>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10"
//         >
//           We design, build and ship digital products that drive real business impact. From idea to launch and beyond, we&apos;re your long-term technology partner.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="flex flex-col sm:flex-row items-center gap-4 mb-10"
//         >
//           <Link
//             href="#contact"
//             className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-accent text-white rounded-2xl font-medium shadow-lg hover:opacity-95 transition-all duration-300 hover-glow"
//           >
//             Start Your Project
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//           <Link
//             href="#portfolio"
//             className="inline-flex items-center justify-center px-8 py-4 border border-border bg-card/90 rounded-2xl font-medium text-foreground hover:border-accent hover:bg-accent/5 transition-all duration-300 hover-glow"
//           >
//             View Our Work
//           </Link>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="flex flex-col sm:flex-row items-center gap-6 text-sm font-medium text-muted-foreground"
//         >
//           <div className="flex items-center gap-2">
//             <CheckCircle2 className="w-5 h-5 text-accent" />
//             <span>120+ projects shipped</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckCircle2 className="w-5 h-5 text-accent" />
//             <span>40+ engineers</span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
