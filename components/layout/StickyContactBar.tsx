"use client";

import { telHref } from "@/data/business";
import { presetMessages, buildWaLink } from "@/lib/whatsapp";
import { PhoneIcon, ChatIcon } from "@/components/ui/Icon";

export default function StickyContactBar() {
  const phone = telHref();
  const waLink = buildWaLink(presetMessages.general);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex bg-charcoal text-ivory lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a
        href={phone ?? "#contact"}
        className="flex flex-1 items-center justify-center gap-2 border-r border-ivory/15 py-4 text-xs font-semibold uppercase tracking-[0.16em] active:bg-charcoal-light"
      >
        <PhoneIcon size={16} strokeWidth={1.3} />
        Call
      </a>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold active:bg-charcoal-light"
      >
        <ChatIcon size={16} strokeWidth={1.3} />
        WhatsApp
      </a>
    </div>
  );
}
