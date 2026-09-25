import type { Metadata } from "next";
import EventPageTemplate from "@/components/services/EventPageTemplate";

export const metadata: Metadata = {
  title: "Corporate Event Photography in Bhagalpur",
  description:
    "Corporate event photography and videography in Bhagalpur, Bihar — team photos, stage photos and brand events.",
};

export default function CorporatePage() {
  return <EventPageTemplate id="corporate" />;
}
