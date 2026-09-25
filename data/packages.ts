import { ServiceId } from "./services";

export interface PricingPackage {
  id: string;
  event: ServiceId;
  tier: "simple" | "standard" | "premium" | "custom";
  name: string;
  // Only the wedding starting price was actually supplied. Everything else
  // is "Contact for price" until real numbers are provided — never invent prices.
  priceLabel: string;
  features: string[];
  highlighted?: boolean;
}

export const priceDisclaimer =
  "Final price depends on event duration, photography/videography requirements, album, location and other services.";

export const packages: PricingPackage[] = [
  {
    id: "wedding-simple",
    event: "wedding",
    tier: "simple",
    name: "Simple",
    priceLabel: "From ₹25,000",
    features: ["1 day photography", "Basic editing", "Digital photos"],
  },
  {
    id: "wedding-standard",
    event: "wedding",
    tier: "standard",
    name: "Standard",
    priceLabel: "Contact for price",
    features: ["Photo + film", "Couple shoot", "Album", "Highlight film"],
    highlighted: true,
  },
  {
    id: "wedding-premium",
    event: "wedding",
    tier: "premium",
    name: "Premium",
    priceLabel: "Contact for price",
    features: [
      "Multi-day coverage",
      "Cinematic film",
      "Premium album",
      "Drone shots (subject to availability)",
    ],
  },
  {
    id: "birthday-standard",
    event: "birthday",
    tier: "standard",
    name: "Birthday Package",
    priceLabel: "Contact for price",
    features: ["Photography", "Cake-cutting coverage", "Family portraits"],
  },
  {
    id: "corporate-standard",
    event: "corporate",
    tier: "standard",
    name: "Corporate Package",
    priceLabel: "Contact for price",
    features: ["Event photography", "Event film", "Team & stage coverage"],
  },
  {
    id: "custom",
    event: "wedding",
    tier: "custom",
    name: "Custom",
    priceLabel: "Tell us what you need",
    features: ["Tailored to your event", "Flexible budget", "Get a quote on WhatsApp"],
  },
];

export function packagesFor(event: ServiceId): PricingPackage[] {
  return packages.filter((p) => p.event === event || p.tier === "custom");
}
