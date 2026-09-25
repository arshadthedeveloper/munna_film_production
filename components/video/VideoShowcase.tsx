"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import { videoItems } from "@/data/videos";
import { business } from "@/data/business";
import { ArrowRightIcon, PlayIcon, PauseIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const marqueeWords: [string, string][] = [
  ["Your Day,", "Told In Light"],
  ["Wedding", "Films"],
  ["Candid", "Moments"],
  ["Cinematic", "Stories"],
  ["Made In", business.city],
];

/* Real event photos for the mosaic band (placeholders until the studio's own work goes in). */
const mosaic = {
  archLeft: "https://picsum.photos/seed/mfp-films-arch-1/500/600",
  archRight: "https://picsum.photos/seed/mfp-films-arch-2/500/600",
  blockLeft: "https://picsum.photos/seed/mfp-films-block-1/600/500",
  blockRight: "https://picsum.photos/seed/mfp-films-block-2/600/500",
};

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" fill="currentColor" />
    </svg>
  );
}

/** Endless ribbon of words. Content is doubled so a -50% shift loops seamlessly. */
function Marquee({ reverse = false }: { reverse?: boolean }) {
  const reduce = useReducedMotion();
  const row = (copy: number) =>
    marqueeWords.map(([plain, italic], i) => (
      <span key={`${copy}-${i}`} className="flex shrink-0 items-center gap-8 pr-8">
        <span className="whitespace-nowrap font-display text-2xl font-semibold text-charcoal sm:text-3xl">
          {plain} <em className="font-medium text-gold-dark">{italic}</em>
        </span>
        <Sparkle className="h-5 w-5 text-wine" />
      </span>
    ));

  return (
    <div className="overflow-hidden border-y border-charcoal/10 py-5" aria-hidden="true">
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {row(0)}
        {row(1)}
      </motion.div>
    </div>
  );
}

/**
 * Photo tile that swings into place in 3D as it scrolls into view.
 * `shape` gives either an arch (rounded top) or a plain block.
 */
function MosaicTile({
  src,
  alt,
  shape,
  delay,
  className = "",
}: {
  src: string;
  alt: string;
  shape: "arch" | "block";
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: shape === "arch" ? -60 : 60 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay, ease }}
        style={{ transformOrigin: shape === "arch" ? "50% 100%" : "50% 0%" }}
        className={`group relative h-full w-full overflow-hidden bg-wine ${shape === "arch" ? "rounded-t-full" : ""}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 20vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
    </div>
  );
}

export default function VideoShowcase() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const film = videoItems[active];

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
    setPlaying(!playing);
  }

  function select(i: number) {
    videoRef.current?.pause();
    setPlaying(false);
    setActive(i);
  }

  return (
    <section id="films" className="bg-ivory" aria-label="Films">
      <Marquee />

      {/* ── Feature row ── */}
      <Container className="grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-7"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
            In Motion
          </p>
          <h2 className="mt-5 max-w-xl font-display text-5xl font-semibold leading-[1.02] text-charcoal sm:text-6xl">
            Films that feel like{" "}
            <em className="bg-linear-to-r from-gold-dark via-gold to-wine bg-clip-text font-medium text-transparent">
              the day itself.
            </em>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-charcoal/60">
            Highlight reels and full event films — shot, edited and colour-graded
            by the same crew that photographs your day.
          </p>

          <ul className="mt-8 max-w-md" role="tablist" aria-label="Choose a film">
            {videoItems.map((v, i) => (
              <li key={v.id}>
                <button
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-5 border-t border-charcoal/10 py-4 text-left transition-colors ${
                    i === active ? "text-charcoal" : "text-charcoal/45 hover:text-charcoal"
                  }`}
                >
                  <span className="font-display text-lg italic text-gold-dark">0{i + 1}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">{v.label}</span>
                  {i === active && (
                    <motion.span layoutId="film-active" className="ml-auto h-px w-10 bg-gold-dark" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-4 bg-charcoal px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-gold hover:text-charcoal"
            >
              View All Work
              <ArrowRightIcon size={16} strokeWidth={1.4} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="flex items-center gap-2 text-sm text-gold-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
              Wedding · Birthday · Corporate
              <span className="text-charcoal/30">|</span>
              {business.city}
            </p>
          </div>
        </motion.div>

        {/* Pinched-waist film frame with orbiting play badge */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -30, x: 40 }}
          whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
          style={{ transformPerspective: 1400 }}
          className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none lg:pl-10"
        >
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <clipPath id="mfp-film-frame" clipPathUnits="objectBoundingBox">
                <path d="M0.16,0 H0.84 Q1,0 1,0.13 V0.36 Q1,0.44 0.93,0.46 Q0.9,0.5 0.93,0.54 Q1,0.56 1,0.64 V0.87 Q1,1 0.84,1 H0.16 Q0,1 0,0.87 V0.64 Q0,0.56 0.07,0.54 Q0.1,0.5 0.07,0.46 Q0,0.44 0,0.36 V0.13 Q0,0 0.16,0 Z" />
              </clipPath>
            </defs>
          </svg>

          <Tilt3D strength={6} glare={false} className="aspect-4/5 w-full">
            <div className="relative h-full w-full bg-charcoal" style={{ clipPath: "url(#mfp-film-frame)" }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={film.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0"
                >
                  {!playing && (
                    <Image src={film.poster} alt={film.label} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                  )}
                </motion.div>
              </AnimatePresence>
              <video
                ref={videoRef}
                key={film.src + film.id}
                src={film.src}
                muted
                playsInline
                loop
                className={`absolute inset-0 h-full w-full object-cover ${playing ? "block" : "hidden"}`}
              />
              <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-ivory/85">
                {film.label}
              </p>
            </div>

            <button
              onClick={toggle}
              aria-label={playing ? `Pause ${film.label}` : `Play ${film.label}`}
              className="group absolute left-0 top-1/2 grid h-24 w-24 place-items-center rounded-full border-4 border-ivory bg-charcoal text-ivory transition-colors hover:bg-wine sm:h-28 sm:w-28"
              style={{ transform: "translate(-50%, -50%) translateZ(60px)" }}
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <defs>
                  <path id="mfp-film-badge" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
                </defs>
                <text className="fill-current text-[9px] font-semibold uppercase tracking-[0.28em]">
                  <textPath href="#mfp-film-badge">Watch the film • Watch the film •</textPath>
                </text>
              </motion.svg>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-ivory/60">
                {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
              </span>
            </button>
          </Tilt3D>
        </motion.div>
      </Container>

      {/* ── Mosaic band ── */}
      <div className="bg-charcoal">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-5 lg:grid-rows-[15rem_12rem]">
          <div className="hidden lg:block" />
          <MosaicTile
            src={mosaic.archLeft}
            alt="Wedding couple portrait"
            shape="arch"
            delay={0.05}
            className="h-56 p-3 pb-0 lg:h-auto lg:p-0"
          />
          <div className="order-first col-span-2 flex flex-col items-center justify-between gap-8 px-6 py-14 text-center text-ivory lg:order-none lg:col-span-1 lg:row-span-2 lg:py-10">
            <motion.span
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              style={{ transformPerspective: 600 }}
              className="font-display text-5xl text-gold"
            >
              01
            </motion.span>
            <div>
              <p className="font-display text-3xl font-semibold leading-snug">
                No stiff poses.
                <br />
                <em className="font-medium text-gold">Just real moments.</em>
              </p>
              <Link
                href="/packages"
                className="group mt-8 inline-flex items-center gap-3 border border-ivory/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-ivory hover:text-charcoal"
              >
                Explore Packages
                <ArrowRightIcon size={15} strokeWidth={1.4} className="rotate-90 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>
          </div>
          <MosaicTile
            src={mosaic.archRight}
            alt="Birthday celebration moment"
            shape="arch"
            delay={0.15}
            className="h-56 p-3 pb-0 lg:h-auto lg:p-0"
          />
          <div className="hidden lg:block" />

          <MosaicTile
            src={mosaic.blockLeft}
            alt="Guests at a corporate event"
            shape="block"
            delay={0.2}
            className="h-44 px-3 pb-3 lg:h-auto lg:p-0"
          />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <MosaicTile
            src={mosaic.blockRight}
            alt="Candid wedding detail"
            shape="block"
            delay={0.3}
            className="h-44 px-3 pb-3 lg:h-auto lg:p-0"
          />
        </div>
      </div>

      <Marquee reverse />
    </section>
  );
}
