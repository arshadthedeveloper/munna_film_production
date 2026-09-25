import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import VideoShowcase from "@/components/video/VideoShowcase";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Our Work — Photography & Video Gallery",
  description:
    "Browse wedding, birthday and corporate photography and videos by Munna Flim Production, Bhagalpur.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="py-20 sm:py-24">
        <Container>
          <p className="eyebrow mb-4 text-gold-dark">Portfolio</p>
          <h1 className="mb-10 font-display text-5xl italic text-charcoal sm:text-6xl">
            Our Work
          </h1>
          <GalleryGrid />
        </Container>
      </section>
      <VideoShowcase />
      <ContactSection />
    </>
  );
}
