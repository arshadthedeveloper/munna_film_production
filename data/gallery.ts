export type GalleryCategory = "wedding" | "birthday" | "corporate" | "video";

export interface GalleryItem {
  id: string;
  src: string;
  category: GalleryCategory;
  alt: string;
  width: number;
  height: number;
}

// PLACEHOLDER IMAGES — replace `src` with real Munna Flim Production photos
// (e.g. "/images/gallery/wedding-01.jpg") once available. The structure below
// is deliberately flat and data-driven so swapping images later never
// requires touching any component code.
export const galleryItems: GalleryItem[] = [
  { id: "w1", src: "https://picsum.photos/seed/mfp-wedding-1/800/1000", category: "wedding", alt: "Wedding couple portrait (placeholder)", width: 800, height: 1000 },
  { id: "w2", src: "https://picsum.photos/seed/mfp-wedding-2/900/700", category: "wedding", alt: "Wedding mandap decor (placeholder)", width: 900, height: 700 },
  { id: "w3", src: "https://picsum.photos/seed/mfp-wedding-3/800/1100", category: "wedding", alt: "Bride getting ready (placeholder)", width: 800, height: 1100 },
  { id: "w4", src: "https://picsum.photos/seed/mfp-wedding-4/1000/750", category: "wedding", alt: "Wedding ceremony (placeholder)", width: 1000, height: 750 },
  { id: "w5", src: "https://picsum.photos/seed/mfp-wedding-5/800/1000", category: "wedding", alt: "Couple candid shot (placeholder)", width: 800, height: 1000 },
  { id: "b1", src: "https://picsum.photos/seed/mfp-birthday-1/900/700", category: "birthday", alt: "Birthday cake cutting (placeholder)", width: 900, height: 700 },
  { id: "b2", src: "https://picsum.photos/seed/mfp-birthday-2/800/1000", category: "birthday", alt: "Kids birthday party (placeholder)", width: 800, height: 1000 },
  { id: "b3", src: "https://picsum.photos/seed/mfp-birthday-3/1000/750", category: "birthday", alt: "Birthday decorations (placeholder)", width: 1000, height: 750 },
  { id: "b4", src: "https://picsum.photos/seed/mfp-birthday-4/800/1000", category: "birthday", alt: "Family birthday photo (placeholder)", width: 800, height: 1000 },
  { id: "c1", src: "https://picsum.photos/seed/mfp-corporate-1/1000/700", category: "corporate", alt: "Corporate event stage (placeholder)", width: 1000, height: 700 },
  { id: "c2", src: "https://picsum.photos/seed/mfp-corporate-2/900/1100", category: "corporate", alt: "Team group photo (placeholder)", width: 900, height: 1100 },
  { id: "c3", src: "https://picsum.photos/seed/mfp-corporate-3/1000/750", category: "corporate", alt: "Corporate brand event (placeholder)", width: 1000, height: 750 },
];

export function itemsByCategory(category: "all" | GalleryCategory): GalleryItem[] {
  if (category === "all") return galleryItems;
  return galleryItems.filter((i) => i.category === category);
}
