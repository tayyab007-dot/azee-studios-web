import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Azee Studios | End-to-end Digital & Creative Agency",
  description: "Azee Studios is a full-spectrum digital studio delivering end-to-end solutions in Development, Design, and Growth Media for global clients. Driven by expert craftsmanship and technical speed.",
  openGraph: {
    title: "Azee Studios | End-to-end Digital & Creative Agency",
    description: "Azee Studios is a full-spectrum digital studio delivering end-to-end solutions in Development, Design, and Growth Media for global clients.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Azee Studios | End-to-end Digital & Creative Agency",
    description: "Azee Studios is a full-spectrum digital studio delivering end-to-end solutions in Development, Design, and Growth Media for global clients.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-accent/30 selection:text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* Organization Schema (No location data) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Azee Studios",
                "url": "https://azeestudios.com",
                "logo": "https://azeestudios.com/logo.png",
                "description": "A full-spectrum digital studio delivering end-to-end solutions in Development, Design, and Growth Media.",
                "sameAs": [
                  "https://instagram.com/azeestudios",
                  "https://linkedin.com/company/azeestudios",
                  "https://t.me/azeestudios"
                ]
              })
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
