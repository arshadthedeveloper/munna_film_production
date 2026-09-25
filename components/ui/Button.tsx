import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-charcoal text-ivory border border-charcoal hover:bg-transparent hover:text-charcoal",
  secondary:
    "bg-gold text-charcoal border border-gold hover:bg-transparent hover:text-gold",
  outline:
    "border border-charcoal/40 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  "outline-light":
    "border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
  ghost: "text-charcoal hover:text-gold-dark",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  size?: "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  size = "md",
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  variant = "primary",
  className = "",
  size = "md",
  href,
  external,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = buttonClasses(variant, size, className);
  if (
    external ||
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  ) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

function buttonClasses(variant: Variant, size: "md" | "lg", className: string) {
  const sizeClasses =
    size === "lg" ? "px-8 py-4 text-sm" : "px-6 py-3 text-xs";
  return `inline-flex items-center justify-center gap-2.5 font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold ${sizeClasses} ${variantClasses[variant]} ${className}`;
}
