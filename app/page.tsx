import { NoiseTexture } from "@/components/ui/noise-texture";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Niches } from "@/components/niches";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { BrandsShowcase } from "@/components/brands-showcase";
import { Testimonials } from "@/components/testimonials";

    import { Blog } from "@/components/blog";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between">
      <NoiseTexture />
      <Hero />
      <Services />
      <Niches />
      <Stats />
      <BrandsShowcase />
      <About />
      <PortfolioGallery />

      <Testimonials />

      <Blog />
      <FAQ />
      <Contact />
    </main>
  );
}
