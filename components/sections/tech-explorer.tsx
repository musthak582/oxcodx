"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechLogo } from "@/components/ui/tech-logo";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Reveal, EASE } from "@/components/motion/reveal";
import { categories, techStack, techColor, type Category } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

export function TechExplorer() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? techStack : techStack.filter((t) => t.category === active)),
    [active]
  );

  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our toolbox"
          title="Explore the technologies we use"
          description="Filter by category to see what powers each part of a product."
        />

        {/* tabs */}
        <Reveal className="mt-12 flex justify-center">
          <div className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex gap-1 rounded-full border border-border bg-white p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active === cat ? "text-white" : "text-muted hover:text-foreground"
                  )}
                >
                  {active === cat && (
                    <motion.span
                      layoutId="tech-tab-pill"
                      className="absolute inset-0 rounded-full bg-brand shadow-[0_4px_14px_-4px_rgba(37,99,235,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center font-mono text-xs text-muted">
          {filtered.length} {filtered.length === 1 ? "technology" : "technologies"}
        </p>

        {/* cards */}
        <motion.div
          layout
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.025 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div style={{ "--c": techColor(tech) } as React.CSSProperties}>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
                        <TechLogo
                          tech={tech}
                          className="h-6 w-6 text-foreground/50 transition-colors duration-300 group-hover:text-[var(--c)]"
                        />
                      </div>
                      <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {tech.category}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{tech.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{tech.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}