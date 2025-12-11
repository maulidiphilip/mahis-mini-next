import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MaHIS – Maternal Health Information System",
  description: "Digital Health Division • Ministry of Health Malawi",
  icons: {
    icon: '/Coat_of_arms_of_Malawi.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <AuthProvider>
          <Header />
        <main className="min-h-screen pt-20 pb-10">{children}</main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}