"use client";

import { motion } from "framer-motion";
import { Zap, Lock, Layers, GitBranch } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const PRINCIPLES = [
  {
    icon: Zap,
    title: "Performance",
    description:
      "Fast pages and snappy interfaces. Speed is a feature your users feel immediately.",
    tags: ["Server rendering", "Edge caching", "Lean bundles"],
  },
  {
    icon: Lock,
    title: "Security",
    description:
      "Safe by default, from typed APIs to least-privilege access and audited dependencies.",
    tags: ["Typed APIs", "Least privilege", "Dependency audits"],
  },
  {
    icon: Layers,
    title: "Scalability",
    description:
      "Architecture that handles ten users or ten million without a rewrite.",
    tags: ["Stateless services", "Containers", "Horizontal scaling"],
  },
  {
    icon: GitBranch,
    title: "Maintainability",
    description:
      "Clean, tested, documented code that any engineer can pick up and extend.",
    tags: ["Strict TypeScript", "Automated tests", "CI/CD"],
  },
];

export function StackPrinciples() {
  return (
    <section className="relative overflow-hidden bg-dark py-24 md:py-32">
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[140px]"
        animate={{ scale: [1, 1.12], opacity: [0.7, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
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
          eyebrow="Why this stack"
          title="Four principles behind every choice"
          description="We don't adopt tools because they're trendy. Each one has to earn its place."
        />

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <StaggerItem key={p.title} className="h-full">
              <div className="relative h-full overflow-hidden rounded-2xl bg-white/10 p-px">
                {/* travelling light */}
                <div
                  aria-hidden
                  className="border-sweep absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0 72%, rgba(96,165,250,0.95) 88%, transparent 100%)",
                    animationDelay: `${-i * 1.75}s`,
                  }}
                />
                <div className="relative h-full rounded-[15px] bg-[#080d22] p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-bright">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {p.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}