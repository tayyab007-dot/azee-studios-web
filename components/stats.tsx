"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { CheckCircle2, Heart, Clock } from "lucide-react";

const stats = [
  {
    value: () => <><AnimatedNumber value={120} />+</>,
    label: "Positive Client Reviews",
    icon: Heart,
  },
  {
    value: () => <><AnimatedNumber value={100} />+</>,
    label: "Projects Delivered",
    icon: CheckCircle2,
  },
  {
    value: () => <AnimatedNumber value={2022} from={2000} />,
    label: "Year Founded",
    icon: Clock,
  }
];

function AnimatedNumber({ value, from = 0 }: { value: number, from?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [count, isInView, value]);

  return <motion.span ref={ref} className="inline-block min-w-[1ch]">{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className="py-4 border-y border-border/50 bg-card/20 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 gap-4 md:gap-4 divide-x divide-border">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-2 md:px-6"
            >
              <stat.icon className="w-6 h-6 text-accent mb-4 opacity-80" />
              <h4 className="text-xl md:text-4xl font-extrabold text-gradient mb-1 md:mb-2">
                {stat.value()}
              </h4>
              <p className="text-[10px] md:text-sm font-medium text-muted-foreground uppercase tracking-wider leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
