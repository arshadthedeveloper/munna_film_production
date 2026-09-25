import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
}) {
  const textColor = light ? "text-ivory" : "text-charcoal";
  const subColor = light ? "text-ivory/65" : "text-charcoal/60";
  return (
    <div className={`mb-12 sm:mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${light ? "text-gold" : "text-gold-dark"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-4xl italic leading-[1.05] sm:text-5xl lg:text-6xl ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${subColor} ${
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
