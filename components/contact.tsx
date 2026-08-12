"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web & App Development",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
  setStatus("success");
  setFormData({ name: "", email: "", service: "Web & App Development", message: "" });
  
  // Reset message after 5 seconds
  setTimeout(() => {
    setStatus("idle");
  }, 5000);
} else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-8 md:py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-4 block">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s Build <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-muted-foreground">
            Send us a message below or reach out directly through any of our social channels.
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 bg-card border border-black/20 dark:border-white/20 rounded-3xl p-8 md:p-12 shadow-xl hover:border-black/30 dark:hover:border-white/30 transition-colors duration-300"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Service Select */}
            <div>
              <label className="block text-sm font-semibold mb-2">Service Needed</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-all"
              >
                <option value="Web & App Development">Web & App Development</option>
                <option value="Game Dev & 3D">Game Dev & 3D</option>
                <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                <option value="Visual & Brand Identity">Visual & Brand Identity</option>
                <option value="Media & Video Content">Media & Video Content</option>
                <option value="Marketing & Strategy">Marketing & Strategy</option>
              </select>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Project Details</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project goals and requirements..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button & Feedback */}
            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl bg-accent text-white font-bold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="mt-4 text-center text-green-500 font-semibold">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-red-500 font-semibold">
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </motion.div>

        {/* Direct Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Telegram */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="h-full">
            <Link href="https://t.me/azeestudios" target="_blank" rel="noopener noreferrer" className="group bg-card border border-black/20 dark:border-white/20 rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-accent dark:hover:border-accent shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="w-20 h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-inner">
                <img src="/logos/telegram logo.avif" alt="Telegram" className="w-12 h-12 object-contain rounded-xl drop-shadow-[0_0_15px_rgba(255,30,86,0.4)] transition-all duration-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Telegram</h4>
                <p className="text-sm text-muted-foreground mb-4">Fastest response time for inquiries.</p>
                <span className="text-sm font-semibold text-accent">@azeestudios</span>
              </div>
            </Link>
          </motion.div>

          {/* Instagram */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="h-full">
            <Link href="https://instagram.com/azee.studios" target="_blank" rel="noopener noreferrer" className="group bg-card border border-black/20 dark:border-white/20 rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-accent dark:hover:border-accent shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="w-20 h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-inner">
                <img src="/logos/instagram logo.avif" alt="Instagram" className="w-12 h-12 object-contain rounded-xl drop-shadow-[0_0_15px_rgba(255,30,86,0.4)] transition-all duration-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Instagram</h4>
                <p className="text-sm text-muted-foreground mb-4">Check out our visual portfolio & updates.</p>
                <span className="text-sm font-semibold text-accent">@azee.studios</span>
              </div>
            </Link>
          </motion.div>

          {/* LinkedIn */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="h-full">
            <Link href="https://www.linkedin.com/company/azeestudios/" target="_blank" rel="noopener noreferrer" className="group bg-card border border-black/20 dark:border-white/20 rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-accent dark:hover:border-accent shadow-sm hover:shadow-xl transition-all duration-300 h-full">
              <div className="w-20 h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-inner">
                <img src="/logos/linkedin logo.avif" alt="LinkedIn" className="w-12 h-12 object-contain rounded-xl drop-shadow-[0_0_15px_rgba(255,30,86,0.4)] transition-all duration-500" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">LinkedIn</h4>
                <p className="text-sm text-muted-foreground mb-4">Professional network and agency news.</p>
                <span className="text-sm font-semibold text-accent">@azeestudios</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




