import type { Metadata } from "next";
import ServicesGrid from "@/components/services/ServicesGrid";
import TrustSection from "@/components/trust/TrustSection";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Services — Wedding, Birthday & Corporate Photography",
  description:
    "Explore Munna Flim Production's photography and videography services in Bhagalpur: wedding, birthday and corporate events.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-10" />
      <ServicesGrid />
      <TrustSection />
      <ContactSection />
    </>
  );
}
