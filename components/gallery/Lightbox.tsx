"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { GalleryItem } from "@/data/gallery";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icon";

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onNavigate]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) onNavigate((index - 1 + items.length) % items.length);
        if (delta < -50) onNavigate((index + 1) % items.length);
        touchStartX.current = null;
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-ivory/80 hover:text-gold"
      >
        <CloseIcon size={24} strokeWidth={1.3} />
      </button>

      <button
        onClick={() => onNavigate((index - 1 + items.length) % items.length)}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/80 hover:text-gold sm:left-4"
      >
        <ChevronLeftIcon size={28} strokeWidth={1.2} />
      </button>

      <div className="relative h-[75vh] w-full max-w-3xl">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <button
        onClick={() => onNavigate((index + 1) % items.length)}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/80 hover:text-gold sm:right-4"
      >
        <ChevronRightIcon size={28} strokeWidth={1.2} />
      </button>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-ivory/70">
        {index + 1} / {items.length}
      </p>
    </div>
  );
}
