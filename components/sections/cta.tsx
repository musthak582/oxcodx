"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

type Props = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function Cta({
  title = "Ready to build something great?",
  description = "Tell us about your idea. We'll get back within one business day with clear next steps.",
  primaryLabel = "Start your project",
  primaryHref = "/contact",
  secondaryLabel = "Browse courses",
  secondaryHref = "/courses",
}: Props) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-deep via-brand to-brand-bright px-6 py-20 text-center shadow-[0_30px_80px_-20px_rgba(37,99,235,0.5)] md:px-16 md:py-24">
            <motion.div
              aria-hidden
              className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-[90px]"
              animate={{ x: [0, 120], y: [0, 40] }}
              transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-brand-deep/60 blur-[90px]"
              animate={{ x: [0, -100], y: [0, -30] }}
              transition={{ duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, #000 20%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 80% at 50% 50%, #000 20%, transparent 100%)",
              }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">{description}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <Button href={primaryHref} variant="light" arrow className="h-12 px-8">
                    {primaryLabel}
                  </Button>
                </Magnetic>
                <Button
                  href={secondaryHref}
                  variant="secondary"
                  className="h-12 border-white/30 bg-white/10 px-8 text-white hover:border-white/50 hover:bg-white/20"
                >
                  {secondaryLabel}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}