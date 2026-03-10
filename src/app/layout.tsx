import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CrimeTak - Fearless Journalism | Crime News, Investigation & Justice",
  description:
    "India's most trusted source for crime news, court verdicts, political scandals, investigations, and exclusive stories.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg-main">

        {/* NextAuth Session Provider */}
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}