import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import PillNav from "@/components/PillNav";
import "@/components/PillNav.css";

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap', // Ensures text is visible during font loading
});
;

export const metadata: Metadata = {
  title: "Imagine - Visual Prompts for AI Art",
  description: "Discover, Create, and Share Stunning AI Art Prompts",
  icons: {
    icon: '/Logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${satoshi.className} h-screen`}
      >
        <div className="min-h-screen w-full relative">
          {/* Orchid Depths */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #350136 100%)",
            }}
          />
          {/* Your Content/Components */}
          <div className="relative z-10">
            <PillNav
              items={[
                { label: 'Home', href: '/' },
                { label: 'Explore', href: '/trending' }
              ]}
              activeHref="/"
              className="custom-nav"
              ease="power2.easeOut"
              baseColor="#000000"
              pillColor="#ffffff"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#000000"
            />
            {children}
          </div>
        </div>


      </body>
    </html>
  );
}

// bg-[linear-gradient(to_bottom,#342A3E_0%,#000000_100%)]