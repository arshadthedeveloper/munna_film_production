import type { Metadata } from "next";
import AboutSection from "@/components/about/AboutSection";
import TrustSection from "@/components/trust/TrustSection";
import Testimonials from "@/components/testimonials/Testimonials";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Munna Flim Production offers photography and videography services in Bhagalpur, Bihar for weddings, birthdays and corporate events.",
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-10" />
      <AboutSection />
      <TrustSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}
