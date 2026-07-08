import type { Metadata } from "next";
import { IBM_Plex_Mono, Fraunces, Special_Elite } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-typewriter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Quiet Collection", // Neutral title, hiding the real name and project name for privacy
  description: "An archival collection.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "A Quiet Collection",
    description: "An archival collection.",
    type: "website",
  },
};

import ArchiveAtmosphere from "@/components/prologue/ArchiveAtmosphere";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${fraunces.variable} ${specialElite.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var saved = localStorage.getItem('museum-theme');
              if (saved === 'light' || saved === 'dark') {
                document.documentElement.setAttribute('data-theme', saved);
              } else {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            } catch(e) {
              document.documentElement.setAttribute('data-theme', 'dark');
            }
          })();
        ` }} />
      </head>
      <body className="antialiased theme-transition">
        <ArchiveAtmosphere />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
