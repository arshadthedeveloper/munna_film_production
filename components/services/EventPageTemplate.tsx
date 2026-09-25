"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getService, ServiceId } from "@/data/services";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PackagesSection from "@/components/packages/PackagesSection";
import FAQAccordion from "@/components/faq/FAQAccordion";
import ContactSection from "@/components/contact/ContactSection";
import { serviceEnquiryMessage, buildWaLink } from "@/lib/whatsapp";

export default function EventPageTemplate({ id }: { id: ServiceId }) {
  const service = getService(id);
  const waLink = buildWaLink(serviceEnquiryMessage(service.title));

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src={`https://picsum.photos/seed/mfp-${id}-page-hero/1800/1000`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        </div>
        <Container className="relative flex min-h-[55vh] flex-col justify-end py-20 text-ivory sm:min-h-[60vh]">
          <p className="eyebrow mb-4 text-gold">{service.number}</p>
          <h1 className="font-display text-5xl italic leading-[1.02] sm:text-7xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/75">
            {service.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <LinkButton href={waLink} variant="secondary" size="lg" external>
              WhatsApp
            </LinkButton>
            <LinkButton href="#packages" variant="outline-light" size="lg">
              View Packages
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <p className="eyebrow mb-6 text-charcoal/45">What&rsquo;s Included</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {service.includes.map((item) => (
              <span key={item} className="font-display text-lg italic text-charcoal">
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <PackagesSection event={id} />

      <section className="py-20 sm:py-24" aria-label={`${id} gallery`}>
        <Container>
          <p className="eyebrow mb-8 text-charcoal/45">Our Work</p>
          <GalleryGrid initialCategory={id} />
        </Container>
      </section>

      <FAQAccordion />
      <ContactSection />
    </>
  );
}
