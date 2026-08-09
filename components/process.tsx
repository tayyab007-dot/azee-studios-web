"use client";

import { motion } from "framer-motion";
import { Target, PenTool, Code2, Rocket } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Discovery",
    description: "Understand goals, users, and business needs.",
    icon: Target,
  },
  {
    num: "02",
    title: "Design",
    description: "Craft intuitive UX/UI and solid architecture.",
    icon: PenTool,
  },
  {
    num: "03",
    title: "Develop",
    description: "Build, test, and iterate with clean scalable code.",
    icon: Code2,
  },
  {
    num: "04",
    title: "Deploy",
    description: "Launch, monitor, and continuously improve.",
    icon: Rocket,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Process() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              A proven <span className="text-gradient">delivery</span> process
            </h2>
          </div>
          <Link
            href="#process"
            className="inline-flex items-center text-sm font-medium hover:text-accent transition-colors"
          >
            See Full Process <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Process Steps */}
        <div className="relative mt-20">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-[2px] border-t-2 border-dashed border-border/60 -z-10" />

          {/* Connecting Line (Mobile/Tablet) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[2.25rem] w-[2px] border-l-2 border-dashed border-border/60 -z-10" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex lg:flex-col items-start lg:items-center gap-6 lg:gap-8 group"
              >
                {/* Icon Badge */}
                <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-full bg-card border-2 border-border flex items-center justify-center group-hover:border-accent transition-colors duration-500 shadow-xl">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-accent text-white flex items-center justify-center text-xs font-bold shadow-lg">
                    {step.num}
                  </div>
                  <step.icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col lg:text-center mt-2 lg:mt-0">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
