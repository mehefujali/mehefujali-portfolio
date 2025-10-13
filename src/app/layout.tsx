import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-portfolio-domain.com'),
  title: {
    default: "Mehefuj Ali | Full Stack Developer & MERN Stack Expert",
    template: "%s | Mehefuj Ali"
  },
  description: "Mehefuj Ali is a passionate Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies. Explore his projects, skills, and work experience.",
  keywords: ["Mehefuj Ali", "Full Stack Developer", "MERN Stack", "React", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Web Developer", "Portfolio", "Software Engineer", "Frontend", "Backend"],
  authors: [{ name: "Mehefuj Ali" }],
  creator: "Mehefuj Ali",
  publisher: "Mehefuj Ali",
  alternates: {
    canonical: "https://www.mehefujali.com",
  },
  openGraph: {
    title: "Mehefuj Ali | Full Stack Developer",
    description: "Mehefuj Ali's personal portfolio showcasing his expertise in MERN stack, Next.js, and full-stack web development.",
    url: "https://www.mehefujali.com",
    siteName: "Mehefuj Ali Portfolio",
    images: [
      {
        url: "/about-me.png",
        width: 800,
        height: 600,
        alt: "Mehefuj Ali - Full Stack Developer",
      },
      {
        url: "/about-me.png",
        width: 1800,
        height: 1600,
        alt: "Mehefuj Ali - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehefuj Ali | Full Stack Developer",
    description: "Explore the portfolio of Mehefuj Ali, a MERN Stack and Next.js expert.",
    creator: "@mehefujali",
    images: ["https://www.mehefujali.com/about-me.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-black text-white relative`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}