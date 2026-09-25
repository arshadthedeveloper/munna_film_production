"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import PackageCard from "./PackageCard";
import { packagesFor, priceDisclaimer } from "@/data/packages";
import { ServiceId } from "@/data/services";
import { ArrowRightIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const tabs: { id: ServiceId; label: string }[] = [
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "corporate", label: "Corporate" },
];

const gridCols: Record<number, string> = {
  1: "lg:grid-cols-1 lg:max-w-sm",
  2: "lg:grid-cols-2 lg:max-w-3xl",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Pass `event` on an event page to lock the list to that event;
 * without it (home / packages page) visitors switch events with tabs.
 */
export default function PackagesSection({ event }: { event?: ServiceId }) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<ServiceId>(event ?? "wedding");
  const current = event ?? selected;
  const list = packagesFor(current);

  return (
    <section id="packages" className="overflow-hidden py-24 sm:py-32" aria-label="Packages">
      <Container>
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
              Packages
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-6xl">
              Pick your
              <br />
              <em className="bg-linear-to-r from-gold-dark via-gold to-wine bg-clip-text font-medium normal-case text-transparent">
                perfect frame.
              </em>
            </h2>
          </motion.div>

          {!event && (
            <div
              role="tablist"
              aria-label="Event type"
              className="relative flex w-fit rounded-full bg-ivory-dark/70 p-1.5 ring-1 ring-charcoal/10"
            >
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={current === t.id}
                  onClick={() => setSelected(t.id)}
                  className={`relative rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors sm:px-6 ${
                    current === t.id ? "text-ivory" : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {current === t.id && (
                    <motion.span
                      layoutId="pkg-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-charcoal"
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ perspective: 1600 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              className={`mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 ${gridCols[Math.min(list.length, 4)]}`}
            >
              {list.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -60, y: 30 }}
                  whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, rotateY: 60, transition: { duration: 0.3 } }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease }}
                  style={{ transformOrigin: "0% 50%" }}
                  className={pkg.highlighted ? "lg:-translate-y-4" : ""}
                >
                  <PackageCard pkg={pkg} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-xs leading-relaxed text-charcoal/50">{priceDisclaimer}</p>
          <a
            href="/packages#build-package"
            className="link-underline inline-flex shrink-0 items-center gap-3 font-display text-xl italic text-charcoal hover:text-gold-dark"
          >
            Build your own package
            <ArrowRightIcon size={16} strokeWidth={1.3} />
          </a>
        </div>
      </Container>
    </section>
  );
}
