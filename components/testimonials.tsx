"use client";

import { useState, useEffect } from "react";
import { Star, Quote, PlusCircle, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ReviewItem {
  _id?: string;
  name: string;
  role: string;
  text: string;
  screenshotUrl?: string;
}

const fallbackTestimonials: ReviewItem[] = [
  { name: "Moz", role: "Client", text: "Vouch @azeeden for gfx service ❤️ quick guy" },
  { name: "Guss", role: "Web Client", text: "Vouch @azeeden for web development service, instant and trusted service" },
  { name: "Simi", role: "SMM Client", text: "@AzeeDen Good social media manager, Vouch 🖤" },
  { name: "Haider", role: "Development Client", text: "Best go to Developer on Telegram Vouching @AzeeDen✅" },
  { name: "death", role: "Design Client", text: "Vouch @AzeeDen did logos, posts and stories for me!!" },
];

export function Testimonials() {
  const [reviews, setReviews] = useState<ReviewItem[]>(fallbackTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "Client", text: "", screenshotUrl: "", isApproved: false });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/admin/reviews");
        const data = await res.json();
        if (res.ok && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic reviews:", err);
      }
    }
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMsg(true);
        setFormData({ name: "", role: "Client", text: "", screenshotUrl: "", isApproved: false });
        setTimeout(() => {
          setSuccessMsg(false);
          setIsModalOpen(false);
        }, 2500);
      }
    } catch (err) {
      alert("Error submitting review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-wider text-xs sm:text-sm uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            What our <span className="text-gradient">clients</span> say
          </h2>

          {/* Public Add Review Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all text-xs sm:text-sm cursor-pointer hover-glow"
          >
            <PlusCircle className="w-4 h-4" /> Leave a Review
          </button>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group max-w-[100vw] -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((testimonial, index) => (
              <div
                key={index}
                className="w-[300px] sm:w-[350px] md:w-[400px] flex-shrink-0 bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm whitespace-normal"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                  ))}
                </div>

                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent/20 mb-4" />

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                  &quot;{testimonial.text}&quot;
                </p>

                {testimonial.screenshotUrl && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-border bg-muted/20">
                    <img src={testimonial.screenshotUrl} alt="Vouch screenshot" className="w-full h-auto max-h-48 object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center border border-border text-base sm:text-lg font-bold text-muted-foreground shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm">{testimonial.name}</h4>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>

        {/* Featured Video Testimonial */}
        <div className="mt-16 md:mt-24 mb-16 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch">
            {/* Left: Text & Details */}
            <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center flex-1 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-8 text-accent/5">
                <Quote className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  &quot;Incredible quality and fast turnaround!&quot;
                </h3>
                <p className="text-muted-foreground mb-8 text-sm sm:text-base md:text-lg">
                  Watch our client share their experience working with our team and how we helped bring their vision to life with stunning visuals.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Verified Client</h4>
                    <span className="text-xs sm:text-sm text-muted-foreground">Telegram Vouch</span>
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
                className="w-full max-h-[400px] md:max-h-[500px] object-contain" 
              />
            </div>
          </div>
        </div>

        {/* Telegram Vouch Panel */}
        <div className="mt-12 sm:mt-20 max-w-xl mx-auto">
          <Link href="https://t.me/VouchedZee" target="_blank" rel="noopener noreferrer" className="block group w-full relative overflow-hidden rounded-3xl">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-6 sm:p-8 flex items-center gap-6 hover:border-blue-500/50 transition-colors shadow-lg relative z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[-2px] mt-[2px]">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-foreground font-bold text-lg sm:text-xl leading-tight mb-1 sm:mb-2 truncate">Join our Telegram</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">Read 100+ verified client reviews and stay updated with our latest work.</p>
              </div>
            </div>
          </Link>
        </div>

      </div>

      {/* Submit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border-2 border-border rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold mb-1">Leave a Review</h3>
            <p className="text-xs text-muted-foreground mb-6">Your feedback will be sent to admin for approval before appearing live.</p>

            {successMsg ? (
              <div className="py-8 text-center text-green-500 space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <p className="font-bold text-sm">Review submitted successfully!</p>
                <p className="text-xs text-muted-foreground">It will appear live once approved by admin.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex M."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Service / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development Client"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Review Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your feedback here..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-xl text-xs resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Screenshot Image URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="Paste image URL if any"
                    value={formData.screenshotUrl}
                    onChange={(e) => setFormData({ ...formData, screenshotUrl: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-xl text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-accent text-white font-bold rounded-xl text-xs hover:opacity-90 transition-all cursor-pointer"
                >
                  {submitting ? "Submitting..." : "Submit Review for Approval"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}