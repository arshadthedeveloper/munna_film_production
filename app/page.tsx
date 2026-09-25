import Hero from "@/components/hero/Hero";
import ServicesGrid from "@/components/services/ServicesGrid";
import GallerySection from "@/components/gallery/GallerySection";
import VideoShowcase from "@/components/video/VideoShowcase";
import PackagesSection from "@/components/packages/PackagesSection";
import BookingSteps from "@/components/booking/BookingSteps";
import AboutSection from "@/components/about/AboutSection";
import TrustSection from "@/components/trust/TrustSection";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQAccordion from "@/components/faq/FAQAccordion";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <GallerySection />
      <VideoShowcase />
      <PackagesSection />
      <TrustSection />
      <BookingSteps />
      <AboutSection />
      <Testimonials />
      <FAQAccordion />
      <ContactSection />
    </>
  );
}
