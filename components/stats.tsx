"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { CheckCircle2, Heart, Clock } from "lucide-react";

const stats = [
  {
    value: () => <><AnimatedNumber value={100} />+</>,
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
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [count, isInView, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className="py-12 border-y border-border/50 bg-card/20 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <stat.icon className="w-6 h-6 text-accent mb-4 opacity-80" />
              <h4 className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">
                {stat.value()}
              </h4>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
