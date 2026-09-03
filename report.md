# Azee Studios — Final Project Requirements & Architecture Report

This document serves as the master record of every detail, requirement, and design decision made during the development of the Azee Studios website. It can be used as a reference for future developers, hosting setups, or business documentation.

---

## 1. Business Identity & Privacy Constraints
* **Brand Name:** Azee Studios
* **Tagline:** Software Solutions Built to Scale. From idea to launch and beyond, your long-term technology partner.
* **Core Philosophy:** A full-spectrum digital studio delivering end-to-end solutions. Driven by expert craftsmanship and backed by 100+ positive client reviews.
* **CRITICAL PRIVACY RULE:** Absolutely **NO** physical addresses, cities, or countries are to be displayed anywhere on the website. The business operates entirely digitally.

## 2. Core Capabilities (Services)
The studio operates across three primary pillars:
1. **Development:** Web, App & Game Development.
2. **Design & Visuals:** UI/UX Design, 3D Modeling, Animation & Graphic Assets.
3. **Media & Growth:** Short & Long-Form Video Content, Social Media & Marketing Strategy.

## 3. Technology Stack & Architecture
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Vanilla Tailwind CSS (No component libraries like Shadcn/UI used to maintain fully custom, bespoke designs).
* **Animations:** Framer Motion (used for bouncy hovers, infinite marquees, and smooth scroll reveals).
* **Backend:** **None.** This is a purely frontend, high-performance static site. There is no database or authentication system. All user contact is routed directly to social media channels.
* **Icons:** `lucide-react`

## 4. Design System & Theme
The design is built to feel ultra-premium, dynamic, and visually striking.
* **Logo:** 3D glossy red/pink letter "A" (Must be saved as `logo.png` in the `public` folder).
* **Primary Accent Colors:** Sampled exactly from the logo.
  * *Reddish-Pink Gradient:* `linear-gradient(to right, #ff1e56, #e60039)`
* **Dark Mode (Default):** 
  * Background: Deep Black (`#050505`)
  * Cards: Rich charcoal (`#0d0d0d`)
* **Light Mode:** 
  * Background: Warm blush (`#f3dbe8`) with subtle pink radial glow accents
  * Cards: Soft rose pink (`#ffd0e6`) that echo the logo’s red/pink palette for strong visual consistency
  * Borders: Stronger pink edge (`#c74382`) with a slightly glowing feel
* **Typography:** Inter (Clean, modern sans-serif).
* **Texture:** A subtle pink ambient glow and fine overlay keeps the site premium while maintaining readability.

## 5. Website Structure & Sections
The single-page application is structured top-to-bottom as follows:

1. **Navbar:** Sticky, blurred background. Contains the logo, navigation links, and a Theme Toggle (Sun/Moon).
2. **Hero Section:** High-impact entry text featuring a pulsing radial background glow, highlighting the core capabilities and a "Start Your Project" CTA.
3. **Services Grid:** A responsive 3x2 grid of cards featuring icons in squircles.
4. **Stats Bar:** A horizontal strip displaying key metrics (120+ Projects Delivered, 98% Client Satisfaction, etc.).
5. **Process Timeline:** A 4-step agile delivery process (Discovery, Design, Develop, Deploy) connected by a dashed line.
6. **Featured Work (Portfolio):** Browser mockup containers for major case studies.
7. **Niches Showcase:** An asymmetrical grid highlighting 5 industries (Art & Culture, Business, Luxury, Health, Gaming). Built to dynamically adapt to light/dark mode without images.
8. **Branding & Motion Showcase:** An interactive split-panel section. Hovering over client names on the left reveals their respective media on the right.
9. **Technologies Stack:** Visual pill tags (with "Content & Video Branding" highlighted in teal) and a grid of tool logos (Premiere, Midjourney, etc.).
10. **Memecoin & Crypto Showcase:** A visually distinct, vibrant grid of bouncy cards specifically for Web3 branding projects.
11. **Testimonials:** An infinite auto-scrolling marquee of client reviews. Below it sits a custom **Telegram Vouch panel** linked to `https://t.me/VouchedZee`.
12. **Pricing:** 3-tier pricing table (Starter, Growth, Enterprise) with the middle tier visually emphasized as "Most Popular".
13. **FAQ:** A responsive accordion (2 columns on desktop, 1 on mobile).
14. **CTA Banner:** A full-width, vibrant reddish-pink gradient banner prompting users to book a call, featuring social proof avatars.
15. **Contact Section:** No traditional form. Replaced with three large, prominent cards pointing directly to social channels.

## 6. Contact Information & Links
All communication is funneled through the following direct channels:
* **Telegram:** `@AzeeDen` (Fastest response time)
* **Instagram:** `@azee.studios`
* **LinkedIn:** `https://www.linkedin.com/company/azeestudios/`

## 7. SEO & Technical Details
* **Metadata:** Full OpenGraph and Twitter card metadata configured in `layout.tsx`.
* **Schema Markup:** JSON-LD `Organization` schema implemented for Google Search (strictly omitting all location data to protect privacy).
* **Crawling:** `sitemap.ts` and `robots.ts` generated and configured.

## 8. Final Checklist / Next Steps for Launch
- [ ] Save the provided logo file as `logo.png` inside the `frontend/public/` folder.
- [ ] Search the codebase for `TODO: replace with real asset` to swap in actual portfolio images, videos, and client logos.
- [ ] Deploy the `frontend` folder to a hosting provider like **Vercel** or **Netlify** (completely free for frontend sites).
