import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const cereal = Nunito_Sans({
  variable: "--font-cereal",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kyoto Trip Planner · Airbnb",
  description:
    "Suggest a stay, experience, and meal for a two-night weekend in Kyoto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cereal.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
