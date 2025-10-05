import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const linuxLibertineFont = localFont({
  src: [
    {
      path: "./../public/fonts/LinLibertine_R.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../public/fonts/LinLibertine_RI.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--linux-libertine-font",
});

export const metadata: Metadata = {
  title: "WikiGarden",
  description: "Collect seeds of knowledge!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${linuxLibertineFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
