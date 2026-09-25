"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import { customQuoteMessage, buildWaLink } from "@/lib/whatsapp";
import { ArrowRightIcon, CheckIcon, PlusIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const eventOptions = [
  { label: "Wedding", src: "https://picsum.photos/seed/mfp-build-wedding/500/600" },
  { label: "Birthday", src: "https://picsum.photos/seed/mfp-build-birthday/500/600" },
  { label: "Corporate", src: "https://picsum.photos/seed/mfp-build-corporate/500/600" },
];
const needOptions = ["Photography", "Videography", "Album", "Highlight Video"];
const budgetOptions = ["₹10,000 – ₹20,000", "₹20,000 – ₹30,000", "₹30,000 – ₹50,000", "₹50,000+"];

function Step({ n, title, hint, children }: { n: string; title: string; hint: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease }}
      className="border-t border-charcoal/10 pt-8"
    >
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-display text-2xl italic text-gold-dark">{n}</span>
        <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-charcoal">{title}</h3>
        <span className="ml-auto text-xs text-charcoal/45">{hint}</span>
      </div>
      {children}
    </motion.div>
  );
}

/** One line of the summary ticket; the value swaps with a small vertical flip. */
function TicketRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <span className="eyebrow pt-1 text-ivory/45">{label}</span>
      <span className="text-right" style={{ perspective: 400 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value ?? "empty"}
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.35 }}
            className={`block font-display text-xl italic ${value ? "text-ivory" : "text-ivory/30"}`}
          >
            {value ?? "Not chosen"}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export default function CustomPackageBuilder() {
  const reduce = useReducedMotion();
  const [event, setEvent] = useState<string | null>(null);
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);

  const toggleNeed = (key: string) => {
    setNeeds((prev) => (prev.includes(key) ? prev.filter((n) => n !== key) : [...prev, key]));
  };

  const canSubmit = event && budget;
  const waLink = canSubmit
    ? buildWaLink(customQuoteMessage({ event, needs, budget }))
    : undefined;
  const progress = [event, needs.length > 0, budget].filter(Boolean).length;

  return (
    <section
      id="build-package"
      className="border-y border-charcoal/10 bg-(--builder-bg) py-24 sm:py-32"
      style={{ "--builder-bg": "color-mix(in srgb, var(--color-ivory-dark) 50%, var(--color-ivory))" } as React.CSSProperties}
      aria-label="Build your package"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
              Tailored
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-6xl">
              Build your
              <br />
              <em className="bg-linear-to-r from-gold-dark via-gold to-wine bg-clip-text font-medium normal-case text-transparent">
                own package.
              </em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal/60">
            Three quick choices and we&apos;ll send a quote on WhatsApp — no forms,
            no waiting for an email.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ── Steps ── */}
          <div className="space-y-12 lg:col-span-7">
            <Step n="01" title="Event" hint="Pick one">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {eventOptions.map((opt) => {
                  const active = event === opt.label;
                  return (
                    <motion.button
                      key={opt.label}
                      type="button"
                      onClick={() => setEvent(opt.label)}
                      aria-pressed={active}
                      whileHover={reduce ? undefined : { rotateX: 8, y: -4 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      style={{ transformPerspective: 700 }}
                      className="group text-left"
                    >
                      <span
                        className={`relative block aspect-4/5 overflow-hidden rounded-t-full transition-all duration-300 ${
                          active ? "ring-2 ring-gold ring-offset-4 ring-offset-(--builder-bg)" : "opacity-75 group-hover:opacity-100"
                        }`}
                      >
                        <Image src={opt.src} alt="" fill sizes="(min-width: 1024px) 18vw, 30vw" className="object-cover" />
                        <span className={`absolute inset-0 transition-colors ${active ? "bg-charcoal/10" : "bg-charcoal/35"}`} />
                        <AnimatePresence>
                          {active && (
                            <motion.span
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-gold text-charcoal"
                            >
                              <CheckIcon size={15} strokeWidth={2} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span
                        className={`mt-3 block text-center text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                          active ? "text-gold-dark" : "text-charcoal/60"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </Step>

            <Step n="02" title="Requirement" hint="Choose any">
              <div className="flex flex-wrap gap-3">
                {needOptions.map((opt) => {
                  const active = needs.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleNeed(opt)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                        active
                          ? "border-charcoal bg-charcoal text-ivory"
                          : "border-charcoal/20 text-charcoal/65 hover:border-charcoal hover:text-charcoal"
                      }`}
                    >
                      <motion.span animate={{ rotate: active ? 0 : 90 }} className="grid place-items-center">
                        {active ? <CheckIcon size={13} strokeWidth={2} /> : <PlusIcon size={13} strokeWidth={1.8} />}
                      </motion.span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n="03" title="Budget" hint="Pick one">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {budgetOptions.map((b) => {
                  const active = budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      aria-pressed={active}
                      className={`relative rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-colors ${
                        active
                          ? "border-gold bg-ivory text-charcoal"
                          : "border-charcoal/15 text-charcoal/60 hover:border-charcoal/50 hover:text-charcoal"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="budget-dot"
                          className="absolute right-3 top-3 h-2 w-2 rounded-full bg-gold"
                        />
                      )}
                      {b}
                    </button>
                  );
                })}
              </div>
            </Step>
          </div>

          {/* ── Summary ticket ── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: 25, x: 30 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, ease }}
                style={{ transformPerspective: 1400 }}
              >
                <Tilt3D strength={4} glare={false}>
                  <div className="relative rounded-4xl bg-charcoal p-8 text-ivory">
                    <div className="flex items-center justify-between">
                      <p className="eyebrow text-gold">Your Package</p>
                      <p className="text-xs text-ivory/45">Step {Math.min(progress + 1, 3)} of 3</p>
                    </div>

                    <div className="mt-5 h-1 overflow-hidden rounded-full bg-ivory/10">
                      <motion.div
                        className="h-full rounded-full bg-linear-to-r from-gold to-wine"
                        animate={{ width: `${(progress / 3) * 100}%` }}
                        transition={{ duration: 0.6, ease }}
                      />
                    </div>

                    <div className="mt-6 divide-y divide-ivory/10">
                      <TicketRow label="Event" value={event} />
                      <TicketRow label="Needs" value={needs.length ? needs.join(", ") : null} />
                      <TicketRow label="Budget" value={budget} />
                    </div>

                    {/* Perforation: notches punched into both sides + dashed tear line */}
                    <div className="relative -mx-8 my-6 h-8" aria-hidden="true">
                      <span className="absolute -left-4 top-0 h-8 w-8 rounded-full bg-(--builder-bg)" />
                      <span className="absolute -right-4 top-0 h-8 w-8 rounded-full bg-(--builder-bg)" />
                      <span className="absolute inset-x-8 top-1/2 border-t border-dashed border-ivory/20" />
                    </div>

                    {canSubmit ? (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-full bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-ivory"
                      >
                        Get Quote on WhatsApp
                        <ArrowRightIcon
                          size={16}
                          strokeWidth={1.4}
                          className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                        />
                      </a>
                    ) : (
                      <span className="flex cursor-not-allowed items-center justify-between rounded-full border border-ivory/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ivory/35">
                        Get Quote on WhatsApp
                        <ArrowRightIcon size={16} strokeWidth={1.4} className="-rotate-45" />
                      </span>
                    )}
                    <p className="mt-4 text-center text-xs text-ivory/40">
                      {canSubmit ? "Opens WhatsApp with your choices filled in." : "Choose an event and a budget to continue."}
                    </p>
                  </div>
                </Tilt3D>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
