import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideRota - Smart Cab Allocation & Management System",
  description:
    "Streamline your organization's employee transportation with RideRota. Complete solution for cab allocation, driver management, and ride tracking.",
  keywords:
    "cab management, employee transportation, ride allocation, fleet management, driver assignment",
  authors: [{ name: "RideRota Team" }],
  openGraph: {
    title: "RideRota - Smart Cab Allocation & Management System",
    description:
      "Streamline your organization's employee transportation with RideRota.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RideRota - Smart Cab Allocation & Management System",
    description:
      "Streamline your organization's employee transportation with RideRota.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
