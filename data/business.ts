// Centralized business data.
// IMPORTANT: `phone` and `whatsapp` are intentionally left blank as placeholders.
// Fill them in once (here) and every Call/WhatsApp button on the site will update
// automatically — nothing else needs to change.
export const business = {
  name: "TechNextHive",
  shortName: "Munna Flim",
  tagline: "Your day. Told in light.",
  services: "Photography — Videography",

  // TODO: Add real phone number, e.g. "+919999999999"
  phone: "",
  // TODO: Add real WhatsApp number (with country code, no + or spaces), e.g. "919999999999"
  whatsapp: "",

  instagram: "https://www.instagram.com/production.munnaflims/",
  instagramHandle: "@production.munnaflims",

  address: {
    line1: "Kalifabad / Railway",
    line2: "Bhagalpur, Bihar - 812002",
    full: "Kalifabad / Railway, Bhagalpur, Bihar - 812002, India",
  },

  // TODO: Replace with the real Google Maps link once available
  // e.g. "https://maps.google.com/?q=Munna+Flim+Production+Bhagalpur"
  mapsUrl: "",

  city: "Bhagalpur",
  state: "Bihar",
} as const;

export function telHref(): string | null {
  return business.phone ? `tel:${business.phone}` : null;
}

export function waHref(message: string): string {
  const base = business.whatsapp
    ? `https://wa.me/${business.whatsapp}`
    : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}
