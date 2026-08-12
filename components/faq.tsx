"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, Briefcase, ShieldCheck, Rocket } from "lucide-react";

const faqCategories = [
  {
    title: "Services & Brand Retainers",
    description: "High-performance development, branding, retainers & more.",
    icon: <Briefcase className="w-6 h-6 text-[#ff1e56]" />,
    faqs: [
      {
        question: "What specialized services does Azee Studios deliver?",
        answer: "We build bespoke digital assets across all core pillars: High-Performance Web & App Development, UI/UX Systems, Branding, Motion Graphics & VFX, Character Animation, and On Device/Cloud AI Integrations."
      },
      {
        question: "Do you offer ongoing branding partnerships on a monthly basis?",
        answer: "Yes. We offer dedicated monthly retainers for high growth brands that require continuous design direction, motion graphics, social assets, and visual system updates."
      },
      {
        question: "Do you handle full brand identity alongside technical builds?",
        answer: "Yes. We construct comprehensive visual identities including motion guidelines, typography systems, and design tokens, so your brand remains cohesive across all platforms."
      },
      {
        question: "Can we engage Azee Studios for single standalone assets?",
        answer: "Yes. While we build full scale platforms, we also take on standalone high impact deliverables like cinematic product teasers, animations, and designs and more."
      }
    ]
  },
  {
    title: "Engineering, Security & Quality",
    description: "Custom code, cybersecurity, performance & AI workflow.",
    icon: <ShieldCheck className="w-6 h-6 text-[#ff1e56]" />,
    faqs: [
      {
        question: "Do you rely on AI generation or \"vibe coding\" for production development?",
        answer: "No. While AI assists in research, every line of production code is custom architected, manually reviewed, and engineered from scratch to ensure zero bloated dependencies and maximum stability."
      },
      {
        question: "How do you protect platforms from cyber threats and data breaches?",
        answer: "We implement enterprise-grade security standards, including encrypted data pipelines, secure authentication protocols, rigid access controls, and zero-trust architectures to defend against vulnerabilities."
      },
      {
        question: "Why build custom code instead of using traditional website builders?",
        answer: "Custom headless builds eliminate third party plugin vulnerabilities, drastically shrink your attack surface, and deliver uncompromised loading speeds that platform builders cannot achieve."
      }
    ]
  },
  {
    title: "Process, Timelines & Ownership",
    description: "Delivery timelines, ownership, communication & onboarding.",
    icon: <Rocket className="w-6 h-6 text-[#ff1e56]" />,
    faqs: [
      {
        question: "How fast is project delivery?",
        answer: "Designs, Reels, Motion Graphics etc ship in 1–3 days. Full-scale web, AI, Game and mobile platforms take 2–6+ weeks depending on technical complexity."
      },
      {
        question: "Who retains ownership of the deliverables?",
        answer: "You retain 100% full ownership of all source code, design systems, assets, and intellectual property upon final settlement."
      },
      {
        question: "What is required from our side to initiate a project?",
        answer: "After signing the agreement and finalizing the initial milestone deposit, we kick off with a brief strategic alignment call to lock in technical requirements and begin execution immediately."
      }
    ]
  }
];

export function FAQ() {
  const [openCategoryIndex, setOpenCategoryIndex] = React.useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const toggleCategory = (index: number) => {
    if (openCategoryIndex === index) {
      setOpenCategoryIndex(null);
    } else {
      setOpenCategoryIndex(index);
      setOpenFaqIndex(null); // reset open faq when switching categories
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 md:py-12 relative bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-accent font-semibold tracking-wider text-xs uppercase mb-4 block">
            FAQS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know before starting your project.
          </p>
        </div>

        {/* Categories List */}
        <div className="flex flex-col gap-4">
          {faqCategories.map((category, catIndex) => {
            const isCategoryOpen = openCategoryIndex === catIndex;
            
            return (
              <div
                key={catIndex}
                className="border border-black/20 dark:border-white/20 rounded-3xl overflow-hidden bg-card transition-all duration-300 shadow-[0_0_15px_rgba(255,30,86,0.1)] hover:shadow-[0_0_25px_rgba(255,30,86,0.2)] hover:border-accent/80 dark:hover:border-accent"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(catIndex)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-card/40 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl md:text-2xl mb-1 text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 transition-all duration-300 ml-4 hover-glow \${isCategoryOpen ? "bg-card" : "bg-transparent"}`}>
                    {isCategoryOpen ? (
                      <Minus className="w-5 h-5 text-[#ff1e56] stroke-[3]" />
                    ) : (
                      <Plus className="w-5 h-5 text-foreground stroke-[3]" />
                    )}
                  </div>
                </button>

                {/* Category Content (FAQs) */}
                <AnimatePresence initial={false}>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 pt-2 flex flex-col gap-2">
                        {category.faqs.map((faq, faqIndex) => {
                          const isFaqOpen = openFaqIndex === faqIndex;
                          return (
                            <div key={faqIndex} className="border-b border-border last:border-0">
                              <button
                                onClick={() => toggleFaq(faqIndex)}
                                className="w-full flex items-center justify-between py-4 text-left group"
                              >
                                <div className="flex items-start gap-3 pr-4">
                                  <span className="text-accent font-bold mt-0.5">Q.</span>
                                  <span className="font-medium text-foreground/90 group-hover:text-accent transition-colors">
                                    {faq.question}
                                  </span>
                                </div>
                                <div className={`shrink-0 transition-all duration-300 hover-glow \${isFaqOpen ? "rotate-180" : ""}`}>
                                  <ChevronDown className={`w-4 h-4 \${isFaqOpen ? "text-accent" : "text-muted-foreground"}`} />
                                </div>
                              </button>
                              <AnimatePresence initial={false}>
                                {isFaqOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pb-4 pl-7 text-muted-foreground text-sm leading-relaxed">
                                      {faq.answer}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
