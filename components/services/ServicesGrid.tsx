"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { services } from "@/data/services";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Expanding 3D panels. On desktop the active service opens wide while the
 * others fold into narrow strips that turn slightly toward it (rotateY),
 * like doors angled around the one that's open. On mobile every panel is
 * shown open, stacked.
 */
export default function ServicesGrid() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="services" className="overflow-hidden py-24 sm:py-32" aria-label="Services">
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
              Services
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-6xl">
              What we
              <em className="ml-4 bg-linear-to-r from-gold-dark via-gold to-wine bg-clip-text font-medium normal-case text-transparent">
                shoot.
              </em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal/60">
            Photography and film for the days that matter — one crew, from the
            first frame to the final album.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5 lg:h-144 lg:flex-row lg:gap-4" style={{ perspective: 2000 }}>
          {services.map((service, i) => {
            const isActive = i === active;
            const turn = reduce || !desktop || isActive ? 0 : i < active ? 12 : -12;
            return (
              <motion.article
                key={service.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -30, y: 40 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                animate={{ flexGrow: isActive ? 5 : 1, rotateY: turn }}
                transition={{
                  flexGrow: { duration: 0.7, ease },
                  rotateY: { duration: 0.7, ease },
                  default: { duration: 1, delay: i * 0.12, ease },
                }}
                style={{ flexBasis: 0, transformOrigin: i < active ? "100% 50%" : "0% 50%" }}
                className="group relative min-h-120 cursor-pointer overflow-hidden rounded-4xl bg-charcoal text-ivory lg:min-h-0 lg:min-w-24"
              >
                <Image
                  src={`https://picsum.photos/seed/mfp-${service.id}-card/1000/1100`}
                  alt={`${service.title} photography`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={`object-cover transition-transform duration-1000 ${isActive ? "scale-100" : "scale-110"}`}
                />
                <div
                  className={`absolute inset-0 transition-colors duration-700 ${
                    isActive
                      ? "bg-linear-to-t from-charcoal via-charcoal/40 to-charcoal/5"
                      : "bg-charcoal/40 lg:bg-charcoal/70"
                  }`}
                />

                {/* Collapsed strip (desktop only): number + vertical title */}
                <div
                  className={`absolute inset-0 flex-col items-center justify-between py-8 transition-opacity duration-500 ${
                    isActive ? "hidden" : "hidden lg:flex"
                  }`}
                  aria-hidden="true"
                >
                  <span className="font-display text-xl italic text-gold">{service.number}</span>
                  <span className="font-display text-3xl font-semibold uppercase tracking-tight [writing-mode:vertical-rl] rotate-180">
                    {service.title}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-ivory/30">
                    <ArrowRightIcon size={14} strokeWidth={1.4} className="-rotate-45" />
                  </span>
                </div>

                {/* Open content */}
                <div className={`absolute inset-0 flex flex-col justify-between p-7 sm:p-9 ${isActive ? "" : "lg:hidden"}`}>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-2xl italic text-gold">{service.number}</span>
                    <Link
                      href={service.ctaHref}
                      aria-label={service.ctaLabel}
                      className="grid h-14 w-14 place-items-center rounded-full bg-ivory text-charcoal transition-colors hover:bg-gold"
                    >
                      <ArrowRightIcon size={20} strokeWidth={1.3} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </Link>
                  </div>

                  <motion.div
                    key={isActive ? "open" : "closed"}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease }}
                    className="max-w-xl"
                  >
                    <h3 className="font-display text-5xl font-semibold uppercase leading-none tracking-tight sm:text-6xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70">{service.subtitle}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-ivory/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory/80 backdrop-blur-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.ctaHref}
                      className="link-underline mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold"
                    >
                      {service.ctaLabel}
                      <ArrowRightIcon size={15} strokeWidth={1.4} />
                    </Link>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
