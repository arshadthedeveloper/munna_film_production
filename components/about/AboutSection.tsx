"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import { business } from "@/data/business";
import { CameraIcon, FilmIcon, PinIcon, InstagramIcon, ArrowRightIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const facts = [
  { icon: CameraIcon, label: "Photography" },
  { icon: FilmIcon, label: "Videography" },
  { icon: PinIcon, label: `${business.city}, ${business.state}` },
];

export default function AboutSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Each collage layer drifts at its own speed — the deeper, the slower.
  const backY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);
  const midY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const frontY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [110, -110]);
  const wordX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-18%"]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-24 sm:py-32" aria-label="About">
      {/* Oversized outline wordmark sliding behind the content */}
      <motion.p
        aria-hidden="true"
        style={{ x: wordX, WebkitTextStroke: "1px rgba(23,18,12,0.12)" }}
        className="pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[9rem] font-semibold uppercase leading-none text-transparent sm:text-[14rem]"
      >
        {business.shortName} · {business.shortName}
      </motion.p>

      <Container className="relative grid grid-cols-1 items-center gap-20 lg:grid-cols-12 lg:gap-12">
        {/* ── Collage ── */}
        <div className="lg:col-span-6">
          <Tilt3D strength={6} glare={false} className="mx-auto h-128 w-full max-w-md sm:h-144">
            <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
              {/* Back: tall arch */}
              <motion.div
                style={{ y: backY, z: -60 }}
                className="absolute left-0 top-0 h-[82%] w-[68%] overflow-hidden rounded-t-full bg-wine"
              >
                <Image
                  src="https://picsum.photos/seed/mfp-about/900/1100"
                  alt={`${business.name} at work`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 70vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Middle: landscape print */}
              <motion.div
                style={{ y: midY, z: 40 }}
                className="absolute bottom-6 right-0 h-[38%] w-[58%] overflow-hidden rounded-3xl border-[6px] border-ivory shadow-[0_30px_60px_-25px_rgba(23,18,12,0.55)]"
              >
                <Image
                  src="https://picsum.photos/seed/mfp-about-2/700/500"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 60vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Front: small square + badge */}
              <motion.div
                style={{ y: frontY, z: 110 }}
                className="absolute right-6 top-10 h-[26%] w-[34%] overflow-hidden rounded-2xl border-[6px] border-ivory shadow-[0_30px_60px_-25px_rgba(23,18,12,0.55)]"
              >
                <Image
                  src="https://picsum.photos/seed/mfp-about-3/500/500"
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </motion.div>

              <div
                className="absolute bottom-[42%] left-[52%] grid h-24 w-24 place-items-center rounded-full bg-charcoal text-center text-ivory ring-[6px] ring-ivory"
                style={{ transform: "translateZ(150px)" }}
              >
                <span>
                  <span className="block font-display text-2xl italic leading-none text-gold">Photo</span>
                  <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em]">+ Film</span>
                </span>
              </div>
            </div>
          </Tilt3D>
        </div>

        {/* ── Story ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-6"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
            About
          </p>
          <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-6xl">
            Made in
            <br />
            <em className="bg-linear-to-r from-gold-dark via-gold to-wine bg-clip-text font-medium normal-case text-transparent">
              {business.city}.
            </em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/65">
            {business.name} is photography and videography, made in {business.city}.
            Wedding, birthday or corporate event — we capture the moments that
            matter, and hand them back to you the way you actually lived them.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {facts.map((f, i) => (
              <motion.li
                key={f.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -60 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease }}
                style={{ transformPerspective: 800, transformOrigin: "0% 50%" }}
                className="group flex items-center gap-3 rounded-2xl bg-ivory-dark/60 p-4 ring-1 ring-charcoal/10 transition-colors hover:bg-charcoal hover:text-ivory sm:flex-col sm:items-start sm:p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ivory text-gold-dark transition-colors group-hover:bg-gold group-hover:text-charcoal">
                  <f.icon size={18} strokeWidth={1.4} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">{f.label}</span>
              </motion.li>
            ))}
          </ul>

          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-charcoal py-2 pl-2 pr-6 text-ivory transition-colors hover:bg-wine"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-gold to-wine">
              <InstagramIcon size={18} strokeWidth={1.4} />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/55">Follow our work</span>
              <span className="block text-sm font-medium">{business.instagramHandle}</span>
            </span>
            <ArrowRightIcon size={16} strokeWidth={1.4} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
