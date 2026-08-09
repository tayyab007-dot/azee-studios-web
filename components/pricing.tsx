"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for startups and small projects.",
    price: "$4,999",
    features: [
      "Custom UI/UX Design",
      "Responsive Frontend Development",
      "Basic SEO Optimization",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Growth",
    description: "For growing businesses scaling their operations.",
    price: "$9,999",
    features: [
      "Everything in Starter",
      "Full-stack Web Application",
      "CMS & API Integration",
    ],
    buttonText: "Get Started",
    buttonVariant: "gradient",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for complex enterprise needs.",
    price: "Let's talk",
    features: [
      "Dedicated Engineering Team",
      "Custom Infrastructure & Cloud",
      "24/7 Priority Support",
    ],
    buttonText: "Contact Us",
    buttonVariant: "outline",
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
              Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple, transparent pricing
            </h2>
          </div>
          <Link
            href="#pricing"
            className="inline-flex items-center text-sm font-medium hover:text-accent transition-colors pb-2"
          >
            See Full Pricing <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-3xl bg-card border p-8 flex flex-col h-full transition-all duration-300 ${
                plan.popular 
                  ? "border-2 border-accent shadow-2xl lg:-mt-8 lg:mb-8 md:scale-[1.02] lg:scale-105 z-10" 
                  : "border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black">{plan.price}</span>
                {plan.price.includes("$") && <span className="text-muted-foreground font-medium">/project</span>}
              </div>

              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`w-full py-4 rounded-xl text-center font-medium transition-all ${
                  plan.buttonVariant === "gradient"
                    ? "bg-gradient-accent text-white hover:opacity-90 shadow-lg"
                    : "border border-border hover:bg-muted text-foreground"
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
