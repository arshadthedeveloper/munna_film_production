"use client";

import { useState } from "react";
import Image from "next/image";
import { itemsByCategory, GalleryCategory } from "@/data/gallery";
import Lightbox from "./Lightbox";
import { Reveal3D } from "@/components/ui/Reveal";

const filters: { key: "all" | GalleryCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wedding", label: "Wedding" },
  { key: "birthday", label: "Birthday" },
  { key: "corporate", label: "Corporate" },
];

export default function GalleryGrid({
  initialCategory = "all",
}: {
  initialCategory?: "all" | GalleryCategory;
}) {
  const [active, setActive] = useState<"all" | GalleryCategory>(initialCategory);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = itemsByCategory(active);

  return (
    <div>
      <div
        className="no-scrollbar mb-10 flex gap-8 overflow-x-auto border-b border-charcoal/10 pb-4"
        role="tablist"
        aria-label="Gallery filters"
      >
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={active === f.key}
            onClick={() => setActive(f.key)}
            className={`link-underline shrink-0 text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
              active === f.key ? "text-gold-dark" : "text-charcoal/50 hover:text-charcoal"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="masonry columns-2 sm:columns-3">
        {items.map((item) => {
          const globalIndex = items.indexOf(item);
          return (
            <Reveal3D key={item.id} delay={(globalIndex % 3) * 0.08}>
              <button
                onClick={() => setOpenIndex(globalIndex)}
                className="block w-full overflow-hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label={`Open photo: ${item.alt}`}
              >
                <span
                  className="relative block w-full"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </span>
              </button>
            </Reveal3D>
          );
        })}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={(i) => setOpenIndex(i)}
        />
      )}
    </div>
  );
}
