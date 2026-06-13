import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Libre_Baskerville,
  Lora,
  Caveat,
} from "next/font/google";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-baskerville",
  display: "swap",
});

const lora = Lora({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Museum of Mango",
  description:
    "An archive where ordinary moments were preserved until they quietly became extraordinary.",
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${baskerville.variable} ${lora.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
