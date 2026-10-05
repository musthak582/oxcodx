"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Award, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SweepCard } from "@/components/ui/sweep-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

// PLACEHOLDER copy. Edit to match what you really provide.
const BENEFITS = [
  {
    icon: Users,
    title: "Real mentorship",
    description: "Learn from people who build software for a living, with feedback on your actual code.",
  },
  {
    icon: Rocket,
    title: "Project-based",
    description: "Every course ends with something you've built and can show to employers or clients.",
  },
  {
    icon: Award,
    title: "Proof of completion",
    description: "A certificate when you finish a course, so your effort is easy to show.",
  },
  {
    icon: Compass,
    title: "Career guidance",
    description: "Portfolio tips and interview preparation to help you take the next step.",
  },
];

export function CourseBenefits() {
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
          eyebrow="What you get"
          title="Learning built around real results"
          description="More than lectures: practice, feedback and a clear next step."
        />

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <StaggerItem key={b.title} className="h-full">
              <SweepCard index={i}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-bright">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{b.description}</p>
              </SweepCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}