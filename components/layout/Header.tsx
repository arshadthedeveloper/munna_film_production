"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { telHref } from "@/data/business";
import { presetMessages, buildWaLink } from "@/lib/whatsapp";
import { PhoneIcon, ChatIcon, MenuIcon, CloseIcon, FilmIcon } from "@/components/ui/Icon";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Work" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const phone = telHref();
  const waLink = buildWaLink(presetMessages.general);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-ivory/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="hairline mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 text-charcoal sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <FilmIcon size={26} strokeWidth={1.2} className="text-gold-dark" />
          <span className="font-display text-xl italic leading-none tracking-wide">
            Munna Flim
            <span className="block font-sans text-[9px] font-medium not-italic uppercase tracking-[0.32em] text-charcoal/50">
              Production
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`link-underline text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                pathname === item.href ? "text-gold-dark" : "text-charcoal/75 hover:text-charcoal"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={phone ?? "#contact"}
            className="hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-charcoal/80 transition-colors hover:text-gold-dark sm:inline-flex"
          >
            <PhoneIcon size={16} strokeWidth={1.3} />
            Call
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-charcoal/80 transition-colors hover:text-gold-dark sm:inline-flex"
          >
            <ChatIcon size={16} strokeWidth={1.3} />
            WhatsApp
          </a>

          <button
            className="flex h-9 w-9 items-center justify-center text-charcoal lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <CloseIcon size={22} strokeWidth={1.3} /> : <MenuIcon size={22} strokeWidth={1.3} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="hairline bg-ivory px-5 pb-8 pt-2 lg:hidden"
        >
          <ul className="flex flex-col divide-y divide-charcoal/10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl italic text-charcoal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
