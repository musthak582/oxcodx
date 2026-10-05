"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/container";

const TEXT =
  "We are a team of engineers, designers and problem solvers who believe great software should feel effortless for the people who use it and dependable for the people who run it.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function AboutMission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = TEXT.split(" ");

  return (
    <section className="bg-white py-24 md:py-36">
      <Container>
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
          Our mission
        </p>
        <div ref={ref} className="mx-auto mt-8 max-w-4xl text-center">
          <p className="text-3xl font-semibold leading-[1.25] tracking-tight md:text-5xl">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}