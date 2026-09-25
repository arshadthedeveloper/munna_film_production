"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import { business, telHref } from "@/data/business";
import { presetMessages, buildWaLink } from "@/lib/whatsapp";
import { PhoneIcon, ChatIcon, PinIcon, InstagramIcon, ArrowRightIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const reduce = useReducedMotion();
  const phone = telHref();
  const waLink = buildWaLink(presetMessages.general);

  const rows = [
    {
      icon: PhoneIcon,
      title: "Call",
      value: business.phone || "Coming soon",
      href: phone ?? undefined,
    },
    {
      icon: ChatIcon,
      title: "WhatsApp",
      value: "Chat with us",
      href: waLink,
      external: true,
    },
    {
      icon: PinIcon,
      title: "Location",
      value: `${business.address.line1}, ${business.city}`,
      href: business.mapsUrl || undefined,
      external: true,
    },
    {
      icon: InstagramIcon,
      title: "Instagram",
      value: business.instagramHandle,
      href: business.instagram,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32" aria-label="Contact">
      <Container>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: 22, y: 80 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
          style={{ transformPerspective: 1800, transformOrigin: "50% 100%" }}
          className="grid grid-cols-1 overflow-hidden rounded-[2.5rem] bg-charcoal text-ivory lg:grid-cols-12"
        >
          {/* ── Left: headline, CTAs, contact tiles ── */}
          <div className="p-7 sm:p-12 lg:col-span-7 lg:p-14">
            <p className="flex items-center gap-2 text-sm font-medium text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Get In Touch
            </p>
            <h2 className="mt-4 font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight sm:text-8xl" style={{ perspective: 800 }}>
              {["Let’s", "talk."].map((word, i) => (
                <motion.span
                  key={word}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -90 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease }}
                  className={`inline-block origin-bottom ${
                    i === 1
                      ? "ml-4 bg-linear-to-r from-gold via-gold to-ivory bg-clip-text font-medium normal-case italic text-transparent"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/60">
              Share your date, your event and what you have in mind — we&rsquo;ll
              take it from there.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 rounded-full bg-gold py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-ivory"
              >
                WhatsApp Us
                <span className="grid h-10 w-10 place-items-center rounded-full bg-charcoal text-ivory">
                  <ArrowRightIcon size={16} strokeWidth={1.4} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </span>
              </a>
              <a
                href={phone ?? "#contact"}
                className="inline-flex items-center rounded-full border border-ivory/30 px-6 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
              >
                Call Now
              </a>
            </div>

            <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {rows.map((row, i) => {
                const inner = (
                  <span className="flex h-full items-center gap-4 rounded-2xl bg-ivory/5 p-4 ring-1 ring-ivory/10 transition-colors duration-300 group-hover:bg-ivory group-hover:text-charcoal">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ivory/10 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
                      <row.icon size={18} strokeWidth={1.4} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50">{row.title}</span>
                      <span className="mt-0.5 block truncate font-display text-lg italic">{row.value}</span>
                    </span>
                    {row.href && (
                      <ArrowRightIcon size={15} strokeWidth={1.4} className="shrink-0 -rotate-45 opacity-40 transition-all group-hover:rotate-0 group-hover:opacity-100" />
                    )}
                  </span>
                );
                return (
                  <motion.li
                    key={row.title}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -70 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease }}
                    style={{ transformPerspective: 900, transformOrigin: "0% 50%" }}
                  >
                    <Tilt3D strength={8} glare={false} className="h-full">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.external ? "_blank" : undefined}
                          rel={row.external ? "noopener noreferrer" : undefined}
                          className="group block h-full"
                        >
                          {inner}
                        </a>
                      ) : (
                        <span className="group block h-full">{inner}</span>
                      )}
                    </Tilt3D>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: photo with address chip + spinning badge ── */}
          <div className="relative min-h-96 lg:col-span-5 lg:min-h-0">
            <Image
              src="https://picsum.photos/seed/mfp-contact/900/1200"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-charcoal via-transparent to-transparent lg:bg-linear-to-r lg:from-charcoal/80 lg:via-charcoal/20" />

            <div className="absolute right-5 top-5 flex max-w-[80%] items-center gap-2 rounded-full bg-ivory/90 px-4 py-2 text-xs font-medium text-charcoal backdrop-blur-sm">
              <PinIcon size={14} strokeWidth={1.5} className="shrink-0 text-wine" />
              <span className="truncate">{business.address.full}</span>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book your date on WhatsApp"
              className="group absolute bottom-6 left-6 grid h-32 w-32 place-items-center rounded-full bg-wine text-ivory ring-8 ring-charcoal/40 transition-colors hover:bg-gold hover:text-charcoal lg:bottom-10 lg:left-10"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <defs>
                  <path id="mfp-contact-badge" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                </defs>
                <text className="fill-current text-[9px] font-bold uppercase tracking-[0.28em]">
                  <textPath href="#mfp-contact-badge">Book your date • Book your date •</textPath>
                </text>
              </motion.svg>
              <ArrowRightIcon size={24} strokeWidth={1.3} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
