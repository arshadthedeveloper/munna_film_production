import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call or WhatsApp Munna Flim Production for wedding, birthday and corporate photography in Bhagalpur, Bihar.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-10" />
      <ContactSection />
    </>
  );
}
