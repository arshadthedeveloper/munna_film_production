import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyContactBar from "@/components/layout/StickyContactBar";
import { business } from "@/data/business";

const siteUrl = "https://munnaflimproduction.example.com"; // TODO: replace with the real domain once live

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Munna Flim Production | Wedding Photographer & Videographer in Bhagalpur",
    template: "%s | Munna Flim Production",
  },
  description:
    "Wedding, birthday and corporate photography & videography in Bhagalpur, Bihar. View our work, packages and contact Munna Flim Production on WhatsApp.",
  openGraph: {
    title: "Munna Flim Production | Wedding Photographer & Videographer in Bhagalpur",
    description:
      "Wedding, birthday and corporate photography & videography in Bhagalpur, Bihar.",
    url: siteUrl,
    siteName: "Munna Flim Production",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Munna Flim Production | Wedding Photographer & Videographer in Bhagalpur",
    description:
      "Wedding, birthday and corporate photography & videography in Bhagalpur, Bihar.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: business.name,
  image: `${siteUrl}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.line1,
    addressLocality: business.city,
    addressRegion: business.state,
    postalCode: "812002",
    addressCountry: "IN",
  },
  url: siteUrl,
  sameAs: [business.instagram],
  areaServed: "Bhagalpur, Bihar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#17120c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="pb-24 lg:pb-0">{children}</main>
        <Footer />
        <StickyContactBar />
      </body>
    </html>
  );
}
