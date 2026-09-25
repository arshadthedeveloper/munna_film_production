import type { Metadata } from "next";
import EventPageTemplate from "@/components/services/EventPageTemplate";

export const metadata: Metadata = {
  title: "Birthday Photography & Video in Bhagalpur",
  description:
    "Birthday photography and videography in Bhagalpur, Bihar — cake cutting, family photos and event video coverage.",
};

export default function BirthdayPage() {
  return <EventPageTemplate id="birthday" />;
}
