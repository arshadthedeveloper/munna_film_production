export interface Testimonial {
  name: string;
  event: string;
  quote: string;
  isPlaceholder: boolean;
}

// PLACEHOLDER TESTIMONIALS — these are NOT real customer reviews.
// Replace with actual client testimonials once collected. Keep
// `isPlaceholder: false` only for genuine, verified reviews.
export const testimonials: Testimonial[] = [
  {
    name: "Sample Customer",
    event: "Wedding",
    quote: "This is a placeholder review — replace with a real customer review here.",
    isPlaceholder: true,
  },
  {
    name: "Sample Customer",
    event: "Birthday",
    quote: "This is a placeholder review — replace with a real customer review here.",
    isPlaceholder: true,
  },
];
