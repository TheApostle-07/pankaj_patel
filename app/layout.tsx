import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import React from "react";

// Elegant, high-clarity typography (system-safe fallbacks)
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Pankaj Patel · Fitness Coach",
    template: "%s · Pankaj Patel",
  },
  description: "Indian fitness coach delivering strength, conditioning, and nutrition systems that actually stick.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Pankaj Patel · Fitness Coach",
    description: "Indian fitness coach delivering strength, conditioning, and nutrition systems that actually stick.",
    url: "/",
    siteName: "Pankaj Patel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pankaj Patel" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Patel · Fitness Coach",
    description: "Indian fitness coach delivering strength, conditioning, and nutrition systems that actually stick.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[inter.variable, jakarta.variable, "h-full scroll-smooth"].join(" ")}
      suppressHydrationWarning
    >
      <body className="relative isolate min-h-dvh bg-[#0b0f14] text-slate-50 antialiased selection:bg-[#22c55e22] selection:text-[#d9f99d]">
        {/* ===== Ambient, layered background (elegant + performant) ===== */}
        <div aria-hidden className="force-motion pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Soft radial glow (brand) */}
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(34,197,94,0.12),transparent_65%)]" />

          {/* Conic highlights for subtle directionality */}
          <div className="absolute inset-0 opacity-80 bg-[conic-gradient(from_220deg_at_60%_40%,rgba(34,197,94,0.12),transparent_35%,rgba(15,184,120,0.12),transparent_70%)]" />

          {/* Soft grid (fades toward edges via mask) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(900px 500px at 50% 20%, rgba(0,0,0,0.85), transparent 70%)",
              WebkitMaskImage: "radial-gradient(900px 500px at 50% 20%, rgba(0,0,0,0.85), transparent 70%)",
            }}
          />

          {/* Fine grain (soft-light blend for depth) */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.06'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              mixBlendMode: "soft-light",
            }}
          />

          {/* Subtle vignette to ground the hero */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(1200px 600px at 50% 115%, rgba(0,0,0,0.06), transparent 70%)" }}
          />

          {/* Floating blurred color orbs (gentle movement) */}
          <div
            className="float-1 absolute left-[-12%] top-[12%] h-[520px] w-[520px] rounded-full blur-[110px]"
            style={{ backgroundColor: "rgba(34,197,94,0.22)" }}
          />
          <div
            className="float-2 absolute right-[-10%] top-[38%] h-[460px] w-[460px] rounded-full blur-[110px]"
            style={{ backgroundColor: "rgba(74,222,128,0.18)" }}
          />
          <div
            className="absolute bottom-[-8%] left-[8%] h-[380px] w-[380px] rounded-full blur-[100px]"
            style={{ backgroundColor: "rgba(11,15,20,0.5)", animation: "float2 30s ease-in-out infinite reverse", willChange: "transform" }}
          />
        </div>

        {/* Skip link for keyboard users */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>

        {/* Main content */}
        <main id="content" className="relative z-10">
          {children}
        </main>

        {/* Minimal footer placeholder (optional) */}
        {/* <footer className="mt-16 border-t border-black/10 py-6 text-center text-sm text-black/60">
          © {new Date().getFullYear()} Seven-Figure Landing
        </footer> */}
      </body>
    </html>
  );
}
