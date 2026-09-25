import type { Metadata } from "next";
import PackagesSection from "@/components/packages/PackagesSection";
import CustomPackageBuilder from "@/components/packages/CustomPackageBuilder";
import BookingSteps from "@/components/booking/BookingSteps";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Wedding photography packages starting from ₹25,000. Birthday and corporate packages available on request — get a custom quote on WhatsApp.",
};

export default function PackagesPage() {
  return (
    <>
      <div className="pt-10" />
      <PackagesSection />
      <CustomPackageBuilder />
      <BookingSteps />
    </>
  );
}
