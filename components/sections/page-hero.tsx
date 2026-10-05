"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { EASE } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const words = title.split(" ");

  return (
    <section className="relative overflow-hidden border-b border-border pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="bg-grid absolute inset-0" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-brand/15 blur-[110px]"
        animate={{ x: [-30, 30], y: [0, 16] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand"
          >
            {eyebrow}
          </motion.p>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.05 }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + words.length * 0.05 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {description}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}