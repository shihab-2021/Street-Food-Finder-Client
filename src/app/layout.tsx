import type { Metadata } from "next";
import "./globals.css";
import { Sansita, Lobster, Arima, Oleo_Script } from "next/font/google";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";

const sansita = Sansita({
  variable: "--font-sansita", // Link this to a CSS variable
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

const oleo_script = Oleo_Script({
  variable: "--font-oleo_script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Street Food",
  description: "Discover the Exceptional Tastes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansita.variable} ${arima.variable} ${oleo_script.variable} ${lobster.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
