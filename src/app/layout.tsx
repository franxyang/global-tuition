import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Tuition, Local Austerity",
  description: "How U.S. public universities rely on international & non-resident tuition to plug funding gaps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
          Skip to main content
        </a>
        
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-lg font-bold gradient-text hover:opacity-80 transition-opacity">
                  Global Tuition
                </Link>
              </div>
              
              <div className="flex items-center space-x-1">
                <Link href="/" className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Home
                </Link>
                <Link href="/explore" className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Explore
                </Link>
                <Link href="/reflection" className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  Reflection
                </Link>
                <Link href="/references" className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                  References
                </Link>
              </div>
            </div>
          </nav>
        </header>
        
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
        
        <footer className="mt-20 border-t border-gray-200/50 bg-white/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-sm text-gray-600">
              EDPOL 210 · Final Unessay Project · August 2025
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
