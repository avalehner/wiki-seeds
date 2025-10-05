import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <head>
        <meta name="apple-mobile-web-app-title" content="WikiGarden" />
      </head>
      <body
        className={`${linuxLibertineFont.variable} ${linuxLibertineFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
