import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";


export const metadata: Metadata = {
  title: "Mehefuj Ali - Full Stack Developer | Professional Portfolio",
  description: "Crafting modern, scalable web applications with a focus on clean code and exceptional user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={` antialiased font-sans bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 `}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}