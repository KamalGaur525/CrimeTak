import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "CrimeTak - Fearless Journalism | Crime News, Investigation & Justice",
  description:
    "India's most trusted source for crime news, court verdicts, political scandals, investigations, and exclusive stories. Get breaking crime news, in-depth analysis, and video reports.",
  keywords:
    "crime news, breaking news, court news, investigation, politics, entertainment, exclusive stories",
  openGraph: {
    title: "CrimeTak - Fearless Journalism",
    description:
      "India's most trusted source for crime news, investigations, and justice reporting.",
    type: "website",
    locale: "en_IN",
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-bg-main">
        <Header />
        {children}
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
