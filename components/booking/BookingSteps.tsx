"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import { LinkButton } from "@/components/ui/Button";
import { telHref } from "@/data/business";
import { presetMessages, buildWaLink } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: "01",
    title: "Call or WhatsApp",
    desc: "Reach out by call or WhatsApp message.",
    src: "https://picsum.photos/seed/mfp-book-1/600/450",
  },
  {
    n: "02",
    title: "Share Your Event Date",
    desc: "Tell us your event date and location.",
    src: "https://picsum.photos/seed/mfp-book-2/600/450",
  },
  {
    n: "03",
    title: "Choose a Package",
    desc: "Pick the package that fits your budget.",
    src: "https://picsum.photos/seed/mfp-book-3/600/450",
  },
  {
    n: "04",
    title: "Confirm Booking",
    desc: "Confirm your date with an advance.",
    src: "https://picsum.photos/seed/mfp-book-4/600/450",
  },
];

/** A row of film-stock sprocket holes. */
function Sprockets({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-x-3 flex justify-between ${className}`} aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} className="h-2.5 w-4 rounded-sm bg-ivory/85" />
      ))}
    </div>
  );
}

export default function BookingSteps() {
  const reduce = useReducedMotion();
  const phone = telHref();
  const waLink = buildWaLink(presetMessages.general);

  return (
    <section className="overflow-hidden py-24 sm:py-32" aria-label="Booking process">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
              Process
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-6xl">
              Four steps
              <br />
              <em className="bg-linear-to-r from-gold-dark via-gold to-wine bg-clip-text font-medium normal-case text-transparent">
                to your date.
              </em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href={waLink} variant="primary" external>
              WhatsApp Us
            </LinkButton>
            <LinkButton href={phone ?? "#contact"} variant="outline">
              Call Now
            </LinkButton>
          </div>
        </motion.div>

        <ol className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-0">
          {steps.map((s, i) => {
            const first = i === 0;
            const last = i === steps.length - 1;
            return (
              <li key={s.n} className="flex flex-col">
                {/* Film frame — on desktop the four frames butt together into one strip */}
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: i * 0.18, ease }}
                  style={{ transformPerspective: 1200, transformOrigin: "0% 50%" }}
                  className={`relative bg-charcoal px-3 py-9 rounded-3xl lg:rounded-none ${
                    first ? "lg:rounded-l-3xl" : ""
                  } ${last ? "lg:rounded-r-3xl" : ""}`}
                >
                  <Sprockets className="top-3" />
                  <Sprockets className="bottom-3" />
                  <Tilt3D strength={7} className="aspect-4/3 overflow-hidden rounded-lg">
                    <div className="group relative h-full w-full">
                      <Image
                        src={s.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 to-transparent" />
                      <span className="absolute bottom-2 left-3 font-display text-5xl font-semibold text-ivory">
                        {s.n}
                      </span>
                    </div>
                  </Tilt3D>
                </motion.div>

                {/* Timeline segment: draws in, then its dot pops */}
                <div className="relative mt-8 flex h-4 items-center">
                  <span className="absolute inset-x-0 h-px bg-charcoal/15" />
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.35, ease: "easeInOut" }}
                    style={{ transformOrigin: "0% 50%" }}
                    className={`absolute left-0 h-px bg-gold ${last ? "right-1/2 lg:right-0" : "right-0"}`}
                  />
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.4 + i * 0.35 }}
                    className="relative grid h-4 w-4 place-items-center rounded-full bg-gold ring-4 ring-ivory"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-charcoal" />
                  </motion.span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.35, ease }}
                  className="mt-5 lg:pr-8"
                >
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-charcoal">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/55">{s.desc}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
