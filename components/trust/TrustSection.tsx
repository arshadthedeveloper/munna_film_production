"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Tilt3D from "@/components/ui/Tilt3D";
import { business } from "@/data/business";
import { FilmIcon, PhoneIcon, CameraIcon, PinIcon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  { icon: FilmIcon, title: "Clear Packages", desc: "Packages and services explained upfront." },
  { icon: PhoneIcon, title: "Direct Contact", desc: "Reach us directly by call or WhatsApp." },
  { icon: CameraIcon, title: "Photo + Video", desc: "Choose the service that fits your need." },
  { icon: PinIcon, title: "Local Service", desc: `Events in ${business.city} and nearby areas.` },
];

export default function TrustSection() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden bg-charcoal py-24 text-ivory sm:py-32" aria-label="Why trust us">
      <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        {/* ── Left: heading + arch portrait with orbiting badge ── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="flex items-center gap-2 text-sm font-medium text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Why Us
              </p>
              <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Why families
                <br />
                <em className="bg-linear-to-r from-gold via-gold to-ivory bg-clip-text font-medium normal-case text-transparent">
                  trust us.
                </em>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">
                No hidden costs, no middlemen — just a local crew you can call
                directly, before and after your day.
              </p>
            </motion.div>

            <div className="relative mt-12 w-fit">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -35, y: 30 }}
                whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, delay: 0.1, ease }}
                style={{ transformPerspective: 1000 }}
                className="relative h-80 w-60 overflow-hidden rounded-t-full bg-wine sm:h-96 sm:w-72"
              >
                <Image
                  src="https://picsum.photos/seed/mfp-trust-arch/600/800"
                  alt={`${business.name} crew at an event`}
                  fill
                  sizes="288px"
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute -right-12 bottom-10 grid h-28 w-28 place-items-center rounded-full border-4 border-charcoal bg-gold text-charcoal">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                >
                  <defs>
                    <path id="mfp-trust-badge" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
                  </defs>
                  <text className="fill-current text-[9px] font-bold uppercase tracking-[0.26em]">
                    <textPath href="#mfp-trust-badge">{`${business.city} • Photo & Film • `}</textPath>
                  </text>
                </motion.svg>
                <CameraIcon size={22} strokeWidth={1.4} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: numbered reason cards ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:self-center">
          {items.map((c, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={c.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -50, y: 40 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.1, ease }}
                style={{ transformPerspective: 1200, transformOrigin: "50% 0%" }}
                className={i % 2 === 1 ? "sm:translate-y-12" : ""}
              >
                <Tilt3D strength={6} glare={false} className="h-full">
                  <article
                    className={`group relative flex h-full min-h-72 flex-col overflow-hidden rounded-4xl p-7 transition-colors duration-500 ${
                      featured ? "bg-wine" : "bg-charcoal-light ring-1 ring-ivory/10 hover:ring-gold/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-ivory/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
                        <c.icon size={22} strokeWidth={1.3} />
                      </span>
                      <span className="font-display text-5xl font-semibold text-ivory/10 transition-colors duration-500 group-hover:text-gold/40">
                        0{i + 1}
                      </span>
                    </div>

                    <div className="mt-auto pt-12">
                      <h3 className="font-display text-3xl font-semibold uppercase tracking-tight">{c.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ivory/60">{c.desc}</p>
                      <span className="mt-6 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                    </div>
                  </article>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
