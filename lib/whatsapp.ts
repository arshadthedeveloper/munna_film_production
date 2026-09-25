import { waHref } from "@/data/business";

export function serviceEnquiryMessage(serviceName: string): string {
  return `Hello, I'd like some information about ${serviceName}.`;
}

export function packageEnquiryMessage(packageName: string): string {
  return `Hello, I'd like some information about the ${packageName} package.`;
}

export const presetMessages = {
  wedding: "Hello, I'd like information about your Wedding Photography packages.",
  birthday: "Hello, I'd like information about your Birthday Photography packages.",
  corporate: "Hello, I want to enquire about Corporate Event Photography.",
  general: "Hello Munna Flim Production, I'd like to talk about my photography requirement.",
};

export function customQuoteMessage(input: {
  event: string;
  needs: string[];
  budget: string;
}): string {
  const needsText = input.needs.length ? input.needs.join(", ") : "Photography";
  return `Hello, I'd like a quote for a ${input.event}.\nRequirement: ${needsText}\nBudget: ${input.budget}`;
}

export function availabilityMessage(input: {
  event: string;
  date: string;
  location: string;
}): string {
  return `Hello Munna Flim Production, I'd like to check availability.\n\nEvent: ${input.event}\nDate: ${input.date || "TBD"}\nLocation: ${input.location || "-"}`;
}

export function buildWaLink(message: string): string {
  return waHref(message);
}
