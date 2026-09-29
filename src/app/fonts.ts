import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

/*
 * PRD §11.2 "Plan B": Instrument Serif (SIL OFL) for display headings.
 * Soria's licence differs between download sites and could not be verified,
 * so the PRD's fallback is used. To switch to Soria, replace this call with
 * `localFont({ src: "./fonts/Soria.ttf", variable: "--font-display-serif", weight: "400" })`.
 */
export const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
