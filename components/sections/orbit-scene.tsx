"use client";

import { motion } from "framer-motion";
import { TechLogo } from "@/components/ui/tech-logo";
import { getTech, techColor } from "@/data/tech-stack";
import { EASE } from "@/components/motion/reveal";
import Image from "next/image";

const RINGS = [
  { radius: 120, duration: 45, reverse: false, ids: ["nextjs", "react", "typescript", "nodejs"] },
  { radius: 190, duration: 65, reverse: true, ids: ["postgresql", "mongodb", "tailwind", "python", "redis", "figma"] },
  { radius: 262, duration: 90, reverse: false, ids: ["docker", "kubernetes", "aws", "github-actions", "flutter", "react-native", "swift", "kotlin"] },
];

export function OrbitScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.6 }}
      className="orbit-scene relative mx-auto h-[330px] w-full sm:h-[450px] md:h-[600px]"
    >
      {/* fixed 600px stage, scaled down on smaller screens */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 origin-top scale-[0.55] sm:scale-75 md:scale-100">
        {/* glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]"
        />

        {/* rings */}
        {RINGS.map((ring, ri) => (
          <div
            key={ring.radius}
            className="orbit-ring absolute left-1/2 top-1/2 h-0 w-0"
            style={{
              animationDuration: `${ring.duration}s`,
              animationDirection: ring.reverse ? "reverse" : "normal",
            }}
          >
            {/* orbit track */}
            <div
              aria-hidden
              className="absolute rounded-full border border-dashed border-brand/20"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                left: -ring.radius,
                top: -ring.radius,
              }}
            />

            {ring.ids.map((id, i) => {
              const tech = getTech(id);
              const angle = (360 / ring.ids.length) * i + ri * 22;
              return (
                <div
                  key={id}
                  className="absolute left-0 top-0"
                  style={{ transform: `rotate(${angle}deg) translateY(-${ring.radius}px)` }}
                >
                  <div
                    className="orbit-counter"
                    style={
                      {
                        "--a": `${angle}deg`,
                        animationDuration: `${ring.duration}s`,
                        animationDirection: ring.reverse ? "reverse" : "normal",
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className="group absolute -left-7 -top-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white shadow-[0_8px_24px_-8px_rgba(10,10,10,0.15)] transition-transform duration-300 hover:scale-110"
                      style={{ "--c": techColor(tech) } as React.CSSProperties}
                    >
                      <TechLogo
                        tech={tech}
                        className="h-6 w-6 text-foreground/60 transition-colors duration-300 group-hover:text-[var(--c)]"
                      />
                      <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* centre mark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute -inset-0 rounded-3xl border border-brand/40"
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: i * 1.6 }}
            />
          ))}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl font-bold text-white shadow-[0_20px_50px_-10px_rgba(37,99,235,0.6)]">
            <Image src="/oxcodx-logo.png" alt="OxCodx Logo" width={28} height={28}/>
          </div>
        </div>
      </div>
    </motion.div>
  );
}