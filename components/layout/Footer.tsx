"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { business, telHref } from "@/data/business";
import { presetMessages, buildWaLink } from "@/lib/whatsapp";
import { FilmIcon, PhoneIcon, ChatIcon, InstagramIcon, PinIcon, ArrowRightIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const explore = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Work" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/wedding", label: "Wedding" },
  { href: "/birthday", label: "Birthday" },
  { href: "/corporate", label: "Corporate" },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-5 text-gold">{children}</p>;
}

export default function Footer() {
  const reduce = useReducedMotion();
  const phone = telHref();
  const waLink = buildWaLink(presetMessages.general);
  const wordmark = business.shortName.toUpperCase().split("");

  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="mt-24 overflow-hidden rounded-t-[2.5rem] bg-charcoal pb-28 pt-16 text-ivory lg:pb-8">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ── CTA row ── */}
        <div className="flex flex-col gap-8 border-b border-ivory/10 pb-12 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Ready when
            <br />
            <em className="bg-linear-to-r from-gold via-gold to-ivory bg-clip-text font-medium normal-case text-transparent">
              you are.
            </em>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 rounded-full bg-gold py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-ivory"
            >
              <ChatIcon size={16} strokeWidth={1.4} />
              WhatsApp Us
              <span className="grid h-10 w-10 place-items-center rounded-full bg-charcoal text-ivory">
                <ArrowRightIcon size={16} strokeWidth={1.4} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </span>
            </a>
            <a
              href={phone ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
            >
              <PhoneIcon size={15} strokeWidth={1.4} />
              Call
            </a>
          </div>
        </div>

        {/* ── Columns ── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <FilmIcon size={26} strokeWidth={1.2} className="text-gold" />
              <span className="font-display text-2xl italic leading-none">
                {business.shortName}
                <span className="mt-1 block font-sans text-[9px] font-medium not-italic uppercase tracking-[0.32em] text-ivory/45">
                  Production
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">
              {business.services} for weddings, birthdays and corporate events in {business.city}.
            </p>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${business.instagramHandle}`}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-ivory/5 py-1.5 pl-1.5 pr-4 text-sm text-ivory/80 ring-1 ring-ivory/10 transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-gold to-wine text-ivory">
                <InstagramIcon size={15} strokeWidth={1.4} />
              </span>
              {business.instagramHandle}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 md:col-start-6">
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="space-y-3 text-sm">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-ivory/70 hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <ColumnTitle>Services</ColumnTitle>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-ivory/70 hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <ColumnTitle>Visit</ColumnTitle>
            <p className="flex gap-3 text-sm leading-relaxed text-ivory/70">
              <PinIcon size={16} strokeWidth={1.4} className="mt-0.5 shrink-0 text-gold" />
              <span>
                {business.address.line1}
                <br />
                {business.address.line2}
              </span>
            </p>
            {business.mapsUrl && (
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold"
              >
                Get Directions
                <ArrowRightIcon size={13} strokeWidth={1.4} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Giant wordmark: letters flip up in 3D ── */}
      <div className="select-none px-3 sm:px-6" aria-hidden="true" style={{ perspective: 1000 }}>
        <p className="flex justify-between font-display text-[14vw] font-semibold leading-[0.8] tracking-tight">
          {wordmark.map((ch, i) => (
            <motion.span
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -95, y: "30%" }}
              whileInView={{ opacity: 1, rotateX: 0, y: "0%" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: i * 0.05, ease }}
              className={`inline-block origin-bottom bg-linear-to-b from-ivory/90 to-ivory/10 bg-clip-text text-transparent ${
                ch === " " ? "w-[3vw]" : ""
              }`}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col-reverse items-start gap-4 px-5 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={toTop}
          className="group inline-flex items-center gap-3 font-semibold uppercase tracking-[0.18em] text-ivory/60 transition-colors hover:text-gold"
        >
          Back to top
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 transition-colors group-hover:border-gold">
            <ArrowRightIcon size={14} strokeWidth={1.4} className="-rotate-90 transition-transform group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
    </footer>
  );
}
