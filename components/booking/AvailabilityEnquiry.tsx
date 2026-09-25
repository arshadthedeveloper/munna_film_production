"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { availabilityMessage, buildWaLink } from "@/lib/whatsapp";
import { ArrowRightIcon } from "@/components/ui/Icon";

const eventOptions = ["Wedding", "Birthday", "Corporate"];

const fieldClasses =
  "w-full border-b border-charcoal/25 bg-transparent px-0 py-3 text-base text-charcoal placeholder:text-charcoal/35 focus-visible:border-gold-dark focus-visible:outline-none";

export default function AvailabilityEnquiry() {
  const [event, setEvent] = useState("Wedding");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const waLink = buildWaLink(availabilityMessage({ event, date, location }));

  return (
    <section className="border-t border-charcoal/10 py-24 sm:py-32" aria-label="Check availability">
      <Container className="max-w-xl">
        <SectionHeading eyebrow="Availability" title="Ask About Your Date" />
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="avail-event" className="eyebrow mb-2 block text-charcoal/50">
              Event
            </label>
            <select
              id="avail-event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className={fieldClasses}
            >
              {eventOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="avail-date" className="eyebrow mb-2 block text-charcoal/50">
              Date
            </label>
            <input
              id="avail-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={fieldClasses}
            />
          </div>

          <div>
            <label htmlFor="avail-location" className="eyebrow mb-2 block text-charcoal/50">
              Location
            </label>
            <input
              id="avail-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bhagalpur"
              className={fieldClasses}
            />
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-charcoal bg-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-transparent hover:text-charcoal"
          >
            Check Availability
            <ArrowRightIcon size={15} strokeWidth={1.4} />
          </a>
        </form>
      </Container>
    </section>
  );
}
