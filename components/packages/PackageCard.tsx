"use client";

import { useState } from "react";
import Image from "next/image";
import { PricingPackage } from "@/data/packages";
import { packageEnquiryMessage, buildWaLink } from "@/lib/whatsapp";
import Tilt3D from "@/components/ui/Tilt3D";
import { ArrowRightIcon, ShareIcon, CheckIcon } from "@/components/ui/Icon";

/**
 * Tall rounded package card with an arch photo on top.
 * Three looks: default (ivory), highlighted (charcoal, "Most Chosen"),
 * and custom (wine) — so the recommended choice reads at a glance.
 */
export default function PackageCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  const [shared, setShared] = useState(false);
  const waLink = buildWaLink(packageEnquiryMessage(pkg.name));
  const tone = pkg.highlighted ? "dark" : pkg.tier === "custom" ? "wine" : "light";

  const handleShare = async () => {
    const text = `${pkg.name} — ${pkg.priceLabel}\n${pkg.features.join(", ")}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: pkg.name, text });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // ignore
    }
  };

  const surface = {
    light: "bg-ivory-dark/60 text-charcoal ring-1 ring-charcoal/10",
    dark: "bg-charcoal text-ivory ring-1 ring-gold/60",
    wine: "bg-wine text-ivory",
  }[tone];
  const muted = tone === "light" ? "text-charcoal/60" : "text-ivory/65";
  const rule = tone === "light" ? "border-charcoal/10" : "border-ivory/15";

  return (
    <Tilt3D strength={5} glare={false} className="h-full">
      <article
        className={`relative flex h-full flex-col rounded-4xl p-5 ${surface}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {pkg.highlighted && (
          <span
            className="absolute right-5 top-5 z-10 rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal"
            style={{ transform: "translateZ(40px)" }}
          >
            Most Chosen
          </span>
        )}

        <div className="relative h-44 overflow-hidden rounded-t-full" style={{ transform: "translateZ(20px)" }}>
          <Image
            src={`https://picsum.photos/seed/mfp-pkg-${pkg.id}/500/400`}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col px-2 pt-6">
          <p className="font-display text-lg italic text-gold">0{index + 1}</p>
          <h3 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight">{pkg.name}</h3>
          <p className={`mt-3 border-b pb-5 font-display text-2xl italic ${rule} ${tone === "light" ? "text-gold-dark" : "text-gold"}`}>
            {pkg.priceLabel}
          </p>

          <ul className="mt-5 flex-1 space-y-3">
            {pkg.features.map((f) => (
              <li key={f} className={`flex items-start gap-2.5 text-sm ${muted}`}>
                <CheckIcon size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-1 items-center justify-between rounded-full px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                tone === "light"
                  ? "bg-charcoal text-ivory hover:bg-gold hover:text-charcoal"
                  : "bg-ivory text-charcoal hover:bg-gold"
              }`}
            >
              Enquire
              <ArrowRightIcon
                size={16}
                strokeWidth={1.4}
                className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
              />
            </a>
            <button
              onClick={handleShare}
              aria-label={shared ? "Copied to clipboard" : `Share ${pkg.name}`}
              title={shared ? "Copied" : "Share"}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors ${
                tone === "light"
                  ? "border-charcoal/20 text-charcoal/60 hover:border-charcoal hover:text-charcoal"
                  : "border-ivory/30 text-ivory/70 hover:border-ivory hover:text-ivory"
              }`}
            >
              {shared ? <CheckIcon size={15} strokeWidth={1.6} /> : <ShareIcon size={15} strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </article>
    </Tilt3D>
  );
}
