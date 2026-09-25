"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import { LinkButton } from "@/components/ui/Button";
import { faqItems } from "@/data/faq";
import { telHref } from "@/data/business";
import { presetMessages, buildWaLink } from "@/lib/whatsapp";
import { PlusIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function FAQAccordion() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const phone = telHref();
  const waLink = buildWaLink(presetMessages.general);

  return (
    <section className="py-24 sm:py-32" aria-label="FAQ">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        {/* ── Left: heading + help card ── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
                Frequently Asked
              </p>
              <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-6xl">
                Good
                <br />
                <em className="bg-linear-to-r from-gold-dark via-gold to-wine bg-clip-text font-medium normal-case text-transparent">
                  questions.
                </em>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-charcoal/60">
                The things couples, parents and teams ask us most before they book.
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -30, y: 30 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: 0.1, ease }}
              style={{ transformPerspective: 1200 }}
              className="mt-10 hidden lg:block"
            >
              <Tilt3D strength={5} glare={false}>
                <div className="flex items-center gap-6 rounded-4xl bg-charcoal p-5 text-ivory">
                  <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-t-full bg-wine">
                    <Image
                      src="https://picsum.photos/seed/mfp-faq-help/300/400"
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-2xl italic leading-tight">Still have a question?</p>
                    <p className="mt-2 text-xs leading-relaxed text-ivory/55">Ask us directly — we reply on call or WhatsApp.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <LinkButton href={waLink} variant="secondary" external className="rounded-full px-4! py-2.5!">
                        WhatsApp
                      </LinkButton>
                      <LinkButton href={phone ?? "#contact"} variant="outline-light" className="rounded-full px-4! py-2.5!">
                        Call
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          </div>
        </div>

        {/* ── Right: question cards ── */}
        <div className="space-y-3 lg:col-span-7">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -40, y: 20 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease }}
                style={{ transformPerspective: 1000, transformOrigin: "50% 0%" }}
                className={`overflow-hidden rounded-3xl transition-colors duration-500 ${
                  isOpen ? "bg-charcoal text-ivory" : "bg-ivory-dark/50 text-charcoal ring-1 ring-charcoal/10 hover:ring-charcoal/30"
                }`}
              >
                <h3>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center gap-5 px-6 py-5 text-left sm:px-7"
                  >
                    <span className={`font-display text-lg italic ${isOpen ? "text-gold" : "text-gold-dark"}`}>{pad(i + 1)}</span>
                    <span className="flex-1 font-display text-xl font-semibold leading-snug sm:text-2xl">{item.q}</span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? "bg-gold text-charcoal" : "bg-ivory text-charcoal"
                      }`}
                    >
                      <PlusIcon size={16} strokeWidth={1.6} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <motion.p
                        initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -60 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.08, ease }}
                        style={{ transformPerspective: 600, transformOrigin: "50% 0%" }}
                        className="px-6 pb-6 pl-15 text-sm leading-relaxed text-ivory/65 sm:px-7 sm:pl-16"
                      >
                        {item.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Mobile help strip (the sticky card is desktop-only) */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-charcoal p-6 text-ivory lg:hidden">
            <p className="font-display text-xl italic">Still have a question?</p>
            <div className="flex gap-2">
              <LinkButton href={waLink} variant="secondary" external className="rounded-full px-4! py-2.5!">
                WhatsApp
              </LinkButton>
              <LinkButton href={phone ?? "#contact"} variant="outline-light" className="rounded-full px-4! py-2.5!">
                Call
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
