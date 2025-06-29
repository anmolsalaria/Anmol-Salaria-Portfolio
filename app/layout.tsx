import type { Metadata } from 'next'
import './globals.css'

export const metadata = {
  title: "Anmol's Portfolio - Built with Next.js | The Journey's Just Begun",
  description: "Welcome to Anmol Salaria's portfolio. Explore projects, skills, and the journey of a passionate developer.",
  openGraph: {
    title: "Anmol's Portfolio - Built with Next.js | The Journey's Just Begun",
    description: "Welcome to Anmol Salaria's portfolio. Explore projects, skills, and the journey of a passionate developer.",
    url: "https://anmol-salaria.vercel.app/",
    siteName: "Anmol's Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anmol's Portfolio Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anmol's Portfolio - Built with Next.js | The Journey's Just Begun",
    description: "Welcome to Anmol Salaria's portfolio. Explore projects, skills, and the journey of a passionate developer.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
