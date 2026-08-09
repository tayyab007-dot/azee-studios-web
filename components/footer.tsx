"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="inline-block mb-2">
              <img src="/logo.png" alt="Azee Studios" className="h-8 md:h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              End-to-end solutions in Development, Design, and Growth Media.
            </p>
            <div className="flex gap-4 mt-2">
              {/* Social Icons Placeholders */}
              <Link href="https://t.me/azeestudios" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors">
                <span className="sr-only">Telegram</span>
                {/* replace with real asset - Telegram Icon */}
                <img src="/logos/telegram logo.avif" alt="Telegram" className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="https://instagram.com/azee.studios" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors">
                <span className="sr-only">Instagram</span>
                {/* replace with real asset - Instagram Icon */}
                <img src="/logos/instagram logo.avif" alt="Instagram" className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="https://www.linkedin.com/company/azeestudios/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors">
                <span className="sr-only">LinkedIn</span>
                {/* replace with real asset - LinkedIn Icon */}
                <img src="/logos/linkedin logo.avif" alt="LinkedIn" className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/#niches" className="hover:text-accent transition-colors">Web & App Development</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Game Dev & 3D</Link></li>
              <li><Link href="/#portfolio" onClick={() => window.dispatchEvent(new CustomEvent('setPortfolioTab', {detail: 'posts'}))} className="hover:text-accent transition-colors">UI/UX & Product Design</Link></li>
              <li><Link href="/#portfolio" onClick={() => window.dispatchEvent(new CustomEvent('setPortfolioTab', {detail: 'logos'}))} className="hover:text-accent transition-colors">Visual & Brand Identity</Link></li>
              <li><Link href="/#portfolio" onClick={() => window.dispatchEvent(new CustomEvent('setPortfolioTab', {detail: 'motion-graphics'}))} className="hover:text-accent transition-colors">Media & Video Content</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Marketing & Strategy</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="#about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="#blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="#portfolio" className="hover:text-accent transition-colors">Portfolio</Link></li>
              <li><Link href="#faq" className="hover:text-accent transition-colors">FAQs</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Azee Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
