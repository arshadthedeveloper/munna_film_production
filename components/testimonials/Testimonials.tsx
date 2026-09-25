"use client";

import { useState } from "react";
import { motion, PanInfo, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import { testimonials } from "@/data/testimonials";
import { buildWaLink } from "@/lib/whatsapp";
import { business } from "@/data/business";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Reviews as a physical deck of cards stacked in depth. The front card can be
 * dragged or swiped away; the deck shuffles forward with a spring.
 */
export default function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) next();
  }

  const reviewLink = buildWaLink(
    `Hello ${business.name}, I'd like to share a review of my experience with you.`
  );

  return (
    <section className="overflow-hidden bg-charcoal py-24 text-ivory sm:py-32" aria-label="Testimonials">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* ── Left: heading + controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-5"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            What Customers Say
          </p>
          <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Kind
            <em className="ml-4 bg-linear-to-r from-gold via-gold to-ivory bg-clip-text font-medium normal-case text-transparent">
              words.
            </em>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">
            What families and teams say after the album lands and the film plays.
          </p>

          {count > 1 && (
            <div className="mt-10 flex items-center gap-5">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
              >
                <ChevronLeftIcon size={18} strokeWidth={1.4} />
              </button>
              <p className="font-display text-xl">
                <span className="text-gold">{pad(index + 1)}</span>
                <span className="text-ivory/35"> / {pad(count)}</span>
              </p>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
              >
                <ChevronRightIcon size={18} strokeWidth={1.4} />
              </button>
            </div>
          )}

          <a
            href={reviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-10 inline-flex items-center gap-3 font-display text-xl italic text-ivory/80 hover:text-gold"
          >
            Worked with us? Share your experience
            <ArrowRightIcon size={16} strokeWidth={1.3} />
          </a>
        </motion.div>

        {/* ── Right: the deck ── */}
        <div className="lg:col-span-7">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -35, y: 60 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease }}
            className="relative mx-auto h-104 max-w-xl sm:h-96"
            style={{ transformPerspective: 1400, transformStyle: "preserve-3d" }}
            aria-live="polite"
          >
            {testimonials.map((item, i) => {
              const depth = (i - index + count) % count;
              if (depth > 2) return null;
              const isFront = depth === 0;
              return (
                <motion.blockquote
                  key={i}
                  aria-hidden={!isFront}
                  drag={isFront && count > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={onDragEnd}
                  whileDrag={{ rotate: 0, scale: 1.02, cursor: "grabbing" }}
                  initial={false}
                  animate={{
                    y: depth * -22,
                    z: reduce ? 0 : depth * -80,
                    scale: 1 - depth * 0.05,
                    rotate: reduce ? 0 : depth === 0 ? -1.5 : depth % 2 ? 3 : -4,
                    opacity: 1 - depth * 0.25,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  style={{ zIndex: 10 - depth, transformStyle: "preserve-3d" }}
                  className={`absolute inset-x-0 bottom-0 flex h-[88%] flex-col justify-between rounded-4xl p-8 sm:p-10 ${
                    isFront ? "cursor-grab bg-ivory text-charcoal" : "bg-ivory-dark text-charcoal/60"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="font-display text-8xl leading-[0.6] text-gold" aria-hidden="true">
                        &ldquo;
                      </span>
                      {item.isPlaceholder && (
                        <span className="rounded-full bg-charcoal/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/40">
                          Sample Review
                        </span>
                      )}
                    </div>
                    <p className="mt-4 font-display text-2xl italic leading-snug sm:text-3xl">{item.quote}</p>
                  </div>

                  <footer className="flex items-center gap-4 border-t border-charcoal/10 pt-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-gold to-wine font-display text-lg font-semibold text-ivory">
                      {initials(item.name)}
                    </span>
                    <span className="flex-1 text-sm font-semibold">{item.name}</span>
                    <span className="rounded-full bg-charcoal px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory">
                      {item.event}
                    </span>
                  </footer>
                </motion.blockquote>
              );
            })}
          </motion.div>
          {count > 1 && (
            <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-ivory/35">Drag the card to see the next</p>
          )}
        </div>
      </Container>
    </section>
  );
}
