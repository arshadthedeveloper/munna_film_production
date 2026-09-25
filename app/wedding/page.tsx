import type { Metadata } from "next";
import EventPageTemplate from "@/components/services/EventPageTemplate";

export const metadata: Metadata = {
  title: "Wedding Photography & Videography in Bhagalpur",
  description:
    "Wedding photography and videography packages in Bhagalpur, Bihar, starting from ₹25,000. Couple shoots, albums, and highlight videos.",
};

export default function WeddingPage() {
  return <EventPageTemplate id="wedding" />;
}
