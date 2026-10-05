"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { EASE } from "@/components/motion/reveal";

// PLACEHOLDER steps. Edit to match your real hiring process.
const STEPS = [
  { title: "Apply", description: "Send your CV or portfolio link and a short note about yourself." },
  { title: "Intro chat", description: "A relaxed conversation to get to know you and answer your questions." },
  { title: "Skills conversation", description: "A practical discussion or small task related to the role." },
  { title: "Offer & onboarding", description: "If it's a fit, we make an offer and plan your first weeks together." },
];

export function HiringProcess() {
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
          eyebrow="Hiring process"
          title="Simple, respectful and clear"
          description="You'll always know where you stand and what comes next."
        />

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
            className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-brand-bright/10 via-brand-bright to-brand-bright/10 lg:block"
          />

          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative flex flex-col lg:items-center lg:text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-brand-bright/40 bg-dark font-mono text-sm font-semibold text-brand-bright shadow-[0_0_24px_rgba(59,130,246,0.35)]">
                    {i + 1}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}