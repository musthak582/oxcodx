"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { EASE } from "@/components/motion/reveal";
import { getCourse, learningPaths } from "@/data/courses";

export function LearningPaths() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Learning paths"
          title="A clear route from beginner to job-ready"
          description="Not sure where to start? Follow a path, or pick the courses you need."
        />

        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-3">
          {learningPaths.map((path) => {
            const steps = path.courseIds.map(getCourse);
            return (
              <StaggerItem key={path.id} className="h-full">
                <div className="h-full rounded-3xl border border-border bg-surface p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-brand">
                    <path.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{path.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {path.description}
                  </p>

                  <ol className="relative mt-8 space-y-6">
                    <span
                      aria-hidden
                      className="absolute bottom-3 left-[11px] top-3 w-px bg-border"
                    />
                    <motion.span
                      aria-hidden
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.2, ease: EASE }}
                      style={{ transformOrigin: "top" }}
                      className="absolute bottom-3 left-[11px] top-3 w-px bg-gradient-to-b from-brand to-brand-bright/40"
                    />

                    {steps.map((course, i) => (
                      <motion.li
                        key={course.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.18 }}
                        className="relative pl-10"
                      >
                        <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-brand/30 bg-white font-mono text-[10px] font-semibold text-brand">
                          {i + 1}
                        </span>
                        <p className="text-sm font-semibold">{course.title}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {course.format} · {course.duration}
                        </p>
                      </motion.li>
                    ))}

                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.2 + steps.length * 0.18 }}
                      className="relative pl-10"
                    >
                      <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white shadow-[0_0_16px_rgba(37,99,235,0.6)]">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-brand">
                        Outcome
                      </p>
                      <p className="mt-0.5 text-sm font-semibold">{path.outcome}</p>
                    </motion.li>
                  </ol>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}