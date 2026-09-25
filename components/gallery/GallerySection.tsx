"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, PanInfo, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Lightbox from "./Lightbox";
import { itemsByCategory, GalleryCategory } from "@/data/gallery";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const filters: { key: "all" | GalleryCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wedding", label: "Wedding" },
  { key: "birthday", label: "Birthday" },
  { key: "corporate", label: "Corporate" },
];

const pad = (n: number) => String(n).padStart(2, "0");
const caption = (alt: string) => alt.replace(/\s*\(placeholder\)/i, "");

/**
 * Homepage portfolio: a 3D coverflow. The active photo faces the viewer;
 * neighbours swing away on the Y axis and recede in Z, so the row reads like
 * prints fanned out on a table. Drag, click a side card, or use arrow keys.
 */
export default function GallerySection() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const items = itemsByCategory(filter);
  const [active, setActive] = useState(Math.floor(items.length / 2));
  const [lightbox, setLightbox] = useState<number | null>(null);

  const go = (i: number) => setActive(Math.max(0, Math.min(items.length - 1, i)));

  function changeFilter(key: "all" | GalleryCategory) {
    setFilter(key);
    setActive(Math.floor(itemsByCategory(key).length / 2));
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) go(active + 1);
    else if (info.offset.x > 60) go(active - 1);
  }

  const current = items[active];

  return (
    <section id="gallery" className="overflow-hidden bg-charcoal py-24 text-ivory sm:py-32" aria-label="Gallery">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Portfolio
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Our
              <em className="ml-4 bg-linear-to-r from-gold via-gold to-ivory bg-clip-text font-medium normal-case text-transparent">
                work.
              </em>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Gallery filters"
            className="no-scrollbar flex w-fit max-w-full overflow-x-auto rounded-full bg-ivory/5 p-1.5 ring-1 ring-ivory/10"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => changeFilter(f.key)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                  filter === f.key ? "text-charcoal" : "text-ivory/60 hover:text-ivory"
                }`}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="work-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gold"
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* ── Coverflow stage ── */}
      <motion.div
        role="region"
        aria-roledescription="carousel"
        aria-label="Portfolio photos — use arrow keys to browse"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(active + 1);
          if (e.key === "ArrowLeft") go(active - 1);
          if (e.key === "Enter") setLightbox(active);
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={onDragEnd}
        className="relative mt-16 h-96 cursor-grab select-none outline-none active:cursor-grabbing sm:h-120"
        style={{ perspective: 1600 }}
      >
        {items.map((item, i) => {
          const offset = i - active;
          const dist = Math.abs(offset);
          if (dist > 3) return null;
          const isActive = offset === 0;
          return (
            <motion.button
              key={`${filter}-${item.id}`}
              type="button"
              aria-label={isActive ? `Open photo: ${caption(item.alt)}` : `Show photo: ${caption(item.alt)}`}
              tabIndex={-1}
              onClick={() => (isActive ? setLightbox(i) : go(i))}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                x: `${offset * (reduce ? 105 : 62)}%`,
                rotateY: reduce ? 0 : Math.max(-55, Math.min(55, offset * -38)),
                z: reduce ? 0 : -dist * 160,
                scale: isActive ? 1 : 0.9,
                opacity: dist === 3 ? 0 : 1 - dist * 0.22,
              }}
              transition={{ type: "spring", stiffness: 170, damping: 26 }}
              style={{ zIndex: 10 - dist, transformStyle: "preserve-3d" }}
              className="absolute left-1/2 top-0 -ml-30 h-full w-60 sm:-ml-40 sm:w-80"
            >
              <span
                className={`relative block h-full w-full overflow-hidden rounded-4xl transition-shadow duration-500 ${
                  isActive ? "shadow-[0_40px_80px_-30px_rgba(180,138,78,0.45)] ring-1 ring-gold/50" : ""
                }`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  draggable={false}
                  sizes="320px"
                  className="pointer-events-none object-cover"
                />
                <span
                  className={`absolute inset-0 bg-charcoal transition-opacity duration-500 ${
                    isActive ? "opacity-0" : "opacity-40"
                  }`}
                />
                {isActive && (
                  <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-ivory text-charcoal">
                    <ArrowRightIcon size={18} strokeWidth={1.4} className="-rotate-45" />
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* ── Caption + controls ── */}
      <Container className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-3">
        <div className="min-h-16 text-center md:text-left">
          <AnimatePresence mode="wait" initial={false}>
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <p className="eyebrow text-gold">{current.category}</p>
                <p className="mt-2 font-display text-2xl italic">{caption(current.alt)}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous photo"
            className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeftIcon size={18} strokeWidth={1.4} />
          </button>
          <div className="w-28 text-center">
            <p className="font-display text-xl">
              <span className="text-gold">{pad(active + 1)}</span>
              <span className="text-ivory/35"> / {pad(items.length)}</span>
            </p>
            <div className="mt-2 h-px bg-ivory/15">
              <motion.div
                className="h-full bg-gold"
                animate={{ width: `${((active + 1) / items.length) * 100}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === items.length - 1}
            aria-label="Next photo"
            className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRightIcon size={18} strokeWidth={1.4} />
          </button>
        </div>

        <div className="flex justify-center md:justify-end">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-4 rounded-full bg-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-gold"
          >
            View Full Gallery
            <ArrowRightIcon size={16} strokeWidth={1.4} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </Link>
        </div>
      </Container>

      {lightbox !== null && (
        <Lightbox
          items={items}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={(i) => {
            setLightbox(i);
            go(i);
          }}
        />
      )}
    </section>
  );
}
