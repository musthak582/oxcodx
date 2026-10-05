"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

export function Faq({
  items,
  eyebrow = "FAQ",
  title = "Questions, answered",
  description,
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
            </Reveal>
            {description && (
              <Reveal delay={0.1}>
                <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1}>
            <div className="border-t border-border">
              {items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q} className="border-b border-border">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "text-base font-medium transition-colors duration-200 md:text-lg",
                          isOpen ? "text-foreground" : "text-foreground/80"
                        )}
                      >
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                          isOpen ? "border-brand bg-brand text-white" : "border-border text-muted"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}