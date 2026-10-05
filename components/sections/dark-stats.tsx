"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { CountUp } from "@/components/motion/count-up";

const STATS = [
  { value: 99, suffix: ".9%", label: "Average uptime", note: "On systems we host and monitor" },
  { value: 10, suffix: "+", label: "Industries served", note: "From startups to enterprise" },
  { value: 24, suffix: "/7", label: "Support coverage", note: "Real engineers, fast response" },
  { value: 100, suffix: "%", label: "Code ownership", note: "Everything we build is yours" },
];

export function DarkStats() {
  return (
    <section className="relative overflow-hidden bg-dark py-24 md:py-32">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[140px]"
        animate={{ scale: [1, 1.12], opacity: [0.7, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      {/* subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Why OxCodx"
          title="Built on reliability, delivered with care"
          description="The details that matter when software runs your business."
        />

        <StaggerGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="bg-dark/80 p-8 backdrop-blur">
              <div className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-semibold tracking-tight text-transparent">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-sm font-medium text-white">{s.label}</p>
              <p className="mt-1 text-sm text-white/50">{s.note}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}