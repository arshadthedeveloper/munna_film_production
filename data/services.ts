export type ServiceId = "wedding" | "birthday" | "corporate";

export interface Service {
  id: ServiceId;
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  includes: string[];
  ctaHref: string;
  ctaLabel: string;
}

export const services: Service[] = [
  {
    id: "wedding",
    number: "01",
    slug: "wedding",
    title: "Wedding",
    subtitle:
      "Every look, every vow, every quiet moment between the noise — held the way you'll want to remember it.",
    includes: [
      "Wedding Photography",
      "Wedding Film",
      "Couple Portraits",
      "Family Portraits",
      "Album",
      "Highlight Film",
    ],
    ctaHref: "/wedding",
    ctaLabel: "View Wedding Packages",
  },
  {
    id: "birthday",
    number: "02",
    slug: "birthday",
    title: "Birthday",
    subtitle:
      "From the first candle to the last laugh — a birthday told the way it actually felt.",
    includes: ["Birthday Photography", "Cake Cutting", "Family Portraits", "Event Film"],
    ctaHref: "/birthday",
    ctaLabel: "View Birthday Packages",
  },
  {
    id: "corporate",
    number: "03",
    slug: "corporate",
    title: "Corporate",
    subtitle:
      "Your brand and your people, presented the way a serious business deserves to be seen.",
    includes: ["Event Photography", "Event Film", "Team Portraits", "Stage Coverage", "Brand Events"],
    ctaHref: "/corporate",
    ctaLabel: "View Corporate Packages",
  },
];

export function getService(id: ServiceId): Service {
  return services.find((s) => s.id === id)!;
}
