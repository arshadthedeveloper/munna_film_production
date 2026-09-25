"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Container from "@/components/ui/Container";
import { ArrowRightIcon, PinIcon, PhoneIcon } from "@/components/ui/Icon";
import { business, telHref } from "@/data/business";
import { galleryItems } from "@/data/gallery";
import { presetMessages, buildWaLink } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

const ringItems = galleryItems.slice(0, 10);
const STEP = 360 / ringItems.length;

/**
 * Signature hero: a cylinder of real photos turning slowly in 3D.
 * It auto-rotates, follows the pointer horizontally, slows while hovered,
 * and tips toward the viewer as the page scrolls.
 */
function PhotoRing() {
  const reduce = useReducedMotion();
  const angle = useMotionValue(0);
  const pointer = useMotionValue(0);
  const pointerSpring = useSpring(pointer, { stiffness: 50, damping: 20 });
  const speed = useRef(1);
  const rotateY = useTransform([angle, pointerSpring], ([a, p]: number[]) => a + p);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    angle.set(angle.get() - delta * 0.006 * speed.current);
  });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
  }

  return (
    <div
      className="relative h-64 [--r:215px] sm:h-96 sm:[--r:330px] lg:h-120 lg:[--r:400px]"
      style={{ perspective: 1400 }}
      onPointerMove={onMove}
      onPointerEnter={() => (speed.current = 0.25)}
      onPointerLeave={() => {
        speed.current = 1;
        pointer.set(0);
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-0 w-0"
        style={{ rotateX: -8, rotateY, transformStyle: "preserve-3d" }}
      >
        {ringItems.map((item, i) => (
          <Link
            key={item.id}
            href="/gallery"
            aria-label={`View gallery — ${item.alt.replace(/\s*\(placeholder\)/i, "")}`}
            className="group absolute -left-17 -top-23 block h-46 w-34 overflow-hidden rounded-2xl ring-1 ring-ivory/15 sm:-left-25 sm:-top-33 sm:h-66 sm:w-50 lg:-left-29 lg:-top-39 lg:h-78 lg:w-58"
            style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--r))` }}
          >
            <Image
              src={item.src}
              alt=""
              fill
              priority={i < 4}
              sizes="(min-width: 1024px) 232px, (min-width: 640px) 200px, 136px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-linear-to-t from-charcoal/60 to-transparent" />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const phone = telHref();
  const waLink = buildWaLink(presetMessages.general);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ringTilt = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 18]);
  const ringY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "25%"]);

  const words = [
    { text: "Your", accent: false },
    { text: "day.", accent: false },
    { text: "Told", accent: true },
    { text: "in", accent: true },
    { text: "light.", accent: true },
  ];

  return (
    <section ref={ref} aria-label="Hero" className="px-3 pt-2 sm:px-5">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-charcoal text-ivory">
        {/* Warm light leak + vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 62%, rgba(180,138,78,0.28), transparent 70%), radial-gradient(40% 40% at 85% 10%, rgba(92,36,48,0.45), transparent 70%)",
          }}
        />

        <Container className="relative pt-14 text-center sm:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mx-auto flex w-fit items-center gap-2 rounded-full bg-ivory/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-ivory/70 ring-1 ring-ivory/10"
          >
            <PinIcon size={13} strokeWidth={1.4} className="text-gold" />
            Photography &amp; Film · {business.city}
          </motion.p>

          <h1
            className="mx-auto mt-8 max-w-5xl font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight sm:text-8xl lg:text-9xl"
            style={{ perspective: 900 }}
          >
            <span className="sr-only">{business.tagline}</span>
            {[words.slice(0, 2), words.slice(2)].map((line, li) => (
              <span key={li} aria-hidden="true" className="flex flex-wrap justify-center gap-x-[0.25em]">
                {line.map((w, wi) => (
                  <motion.span
                    key={w.text}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -90, y: 30 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.15 + (li * 2 + wi) * 0.09, ease }}
                    className={`inline-block origin-bottom ${
                      w.accent
                        ? "bg-linear-to-r from-gold via-gold to-ivory bg-clip-text font-medium normal-case italic text-transparent"
                        : ""
                    }`}
                  >
                    {w.text}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </Container>

        {/* 3D photo ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease }}
          style={{ rotateX: ringTilt, y: ringY, transformPerspective: 1400 }}
          className="relative -mt-2 sm:mt-2"
        >
          <PhotoRing />
        </motion.div>

        {/* Bottom bar */}
        <Container className="relative grid grid-cols-1 items-center gap-6 border-t border-ivory/10 py-8 text-center md:grid-cols-3 md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mx-auto max-w-xs text-sm leading-relaxed text-ivory/60 md:mx-0"
          >
            Wedding, birthday &amp; corporate photography and films — the
            moments that matter, the way you lived them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="flex flex-wrap justify-center gap-3"
          >
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
              className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-ivory hover:bg-ivory hover:text-charcoal"
            >
              <PhoneIcon size={15} strokeWidth={1.4} />
              Call
            </a>
          </motion.div>

          <motion.a
            href="#services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="group hidden items-center justify-end gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:text-gold md:flex"
          >
            Scroll to explore
            <span className="relative grid h-11 w-7 justify-center rounded-full border border-ivory/30 pt-2">
              <motion.span
                animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-1 rounded-full bg-gold"
              />
            </span>
          </motion.a>
        </Container>
      </div>
    </section>
  );
}
