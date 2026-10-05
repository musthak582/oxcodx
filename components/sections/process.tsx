"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    title: "Discover",
    description:
      "We learn your business, goals and users, then turn them into a clear scope and roadmap.",
  },
  {
    title: "Design",
    description:
      "Wireframes and polished UI designs you can review and approve before any code is written.",
  },
  {
    title: "Build",
    description:
      "Agile sprints with regular demos, clean code and automated testing from day one.",
  },
  {
    title: "Launch & Grow",
    description:
      "We deploy, monitor and keep improving your product as your business grows.",
  },
];

function Step({
  index,
  step,
  progress,
}: {
  index: number;
  step: (typeof STEPS)[number];
  progress: MotionValue<number>;
}) {
  const start = index / STEPS.length;
  const active = useTransform(progress, [start - 0.02, start + 0.08], [0, 1]);
  const dotScale = useTransform(active, [0, 1], [0.6, 1]);
  const dotOpacity = useTransform(active, [0, 1], [0, 1]);
  const textOpacity = useTransform(active, [0, 1], [0.35, 1]);

  return (
    <motion.div style={{ opacity: textOpacity }} className="relative pl-14 md:pl-20">
      {/* dot */}
      <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white md:h-10 md:w-10">
        <motion.span
          style={{ scale: dotScale, opacity: dotOpacity }}
          className="absolute inset-0 rounded-full bg-brand shadow-[0_0_24px_rgba(37,99,235,0.55)]"
        />
        <span className="relative font-mono text-xs font-semibold text-foreground mix-blend-normal">
          <motion.span
            style={{ color: useTransform(active, [0, 1], ["#0a0a0a", "#ffffff"]) }}
          >
            {index + 1}
          </motion.span>
        </span>
      </div>

      <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-2 max-w-lg leading-relaxed text-muted">{step.description}</p>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A simple process that delivers"
          description="Transparent, collaborative and built around shipping real results."
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-2xl">
          {/* track */}
          <div className="absolute bottom-2 left-[17px] top-2 w-px bg-border md:left-5" />
          {/* progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[17px] top-2 w-px origin-top bg-gradient-to-b from-brand-bright to-brand md:left-5"
          />

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <Step key={step.title} index={i} step={step} progress={progress} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}