"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * Wraps children in a subtle, premium 3D tilt that follows the pointer.
 * Pairs a real perspective transform (rotateX/rotateY) with a soft spring
 * so the effect feels tactile rather than gimmicky. Only mouse pointers
 * drive the tilt (touch scrolling never jolts the card), and it stays flat
 * under prefers-reduced-motion.
 */
export default function Tilt3D({
  children,
  className = "",
  strength = 10,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.4 });

  const rotateX = useTransform(springY, [0, 1], [strength, -strength]);
  const rotateY = useTransform(springX, [0, 1], [-strength, strength]);
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(244,237,224,0.16), transparent 55%)`
  );

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduce || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div className={`perspective ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
