"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { TechLogo } from "@/components/ui/tech-logo";
import { EASE } from "@/components/motion/reveal";
import { getTech, techColor } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

type Recipe = {
  id: string;
  title: string;
  description: string;
  idealFor: string[];
  layers: { label: string; techId: string }[];
};

const RECIPES: Recipe[] = [
  {
    id: "web",
    title: "Web platform",
    description:
      "Server-rendered React up front, typed APIs behind it, relational data you can trust, and a cache that keeps everything instant.",
    idealFor: ["SaaS platforms", "Marketplaces", "Customer portals"],
    layers: [
      { label: "Interface", techId: "nextjs" },
      { label: "API", techId: "nodejs" },
      { label: "Data", techId: "postgresql" },
      { label: "Cache", techId: "redis" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile app",
    description:
      "One cross-platform codebase for iOS and Android, a lean API, flexible storage and automated releases on every merge.",
    idealFor: ["Consumer apps", "Field-service tools", "Internal team apps"],
    layers: [
      { label: "App", techId: "flutter" },
      { label: "API", techId: "nodejs" },
      { label: "Data", techId: "mongodb" },
      { label: "Delivery", techId: "github-actions" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud-native system",
    description:
      "Containerised services orchestrated for resilience, running on cloud infrastructure that scales with demand.",
    idealFor: ["High-traffic systems", "Data platforms", "Enterprise migrations"],
    layers: [
      { label: "Services", techId: "python" },
      { label: "Container", techId: "docker" },
      { label: "Orchestration", techId: "kubernetes" },
      { label: "Cloud", techId: "aws" },
    ],
  },
];

/* ---------- connected logo flow ---------- */
function StackFlow({ layers, active }: { layers: Recipe["layers"]; active: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start">
      {layers.map((layer, i) => {
        const tech = getTech(layer.techId);
        return (
          <Fragment key={layer.techId}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.14 }}
              className="group flex items-center gap-4 sm:w-20 sm:shrink-0 sm:flex-col sm:gap-0 sm:text-center"
              style={{ "--c": techColor(tech) } as React.CSSProperties}
            >
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-white transition-all duration-500 group-hover:scale-110",
                  active
                    ? "border-brand/30 shadow-[0_10px_30px_-8px_rgba(37,99,235,0.35)]"
                    : "border-border shadow-sm"
                )}
              >
                <TechLogo
                  tech={tech}
                  className={cn(
                    "h-6 w-6 transition-colors duration-500 group-hover:text-[var(--c)]",
                    active ? "text-[var(--c)]" : "text-foreground/50"
                  )}
                />
              </div>

              {/* text: beside the logo on mobile, below it from sm up */}
              <div className="flex min-w-0 flex-col sm:contents">
                <span className="text-sm font-medium sm:mt-3 sm:text-xs">{tech.name}</span>
                <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted sm:text-[9px]">
                  {layer.label}
                </span>
              </div>
            </motion.div>

            {i < layers.length - 1 && (
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.14 + 0.12 }}
                style={{ transformOrigin: "left top" }}
                className="relative my-1.5 ml-[27px] h-6 w-px overflow-hidden sm:my-0 sm:ml-0 sm:mt-7 sm:h-px sm:w-auto sm:min-w-4 sm:flex-1"
              >
                <span className="absolute inset-0 bg-border" />
                <span
                  className={cn(
                    "absolute inset-0 bg-brand transition-opacity duration-500",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="pulse-x absolute inset-0 hidden sm:block" />
              </motion.div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

/* ---------- one recipe card ---------- */
function RecipeCard({
  recipe,
  index,
  active,
  onActive,
}: {
  recipe: Recipe;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-center rounded-3xl border bg-white p-5 transition-all duration-500 sm:p-8 lg:min-h-[360px]",
        active
          ? "border-brand/30 shadow-[0_20px_60px_-20px_rgba(37,99,235,0.25)]"
          : "border-border lg:opacity-60"
      )}
    >
      {/* title + description: mobile only (desktop uses the sticky panel) */}
      <div className="mb-8 lg:hidden">
        <span className="font-mono text-xs text-brand">0{index + 1}</span>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{recipe.title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{recipe.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.idealFor.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <StackFlow layers={recipe.layers} active={active} />
    </div>
  );
}

/* ---------- section ---------- */
export function StackRecipes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = RECIPES[activeIndex];

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          {/* left: sticky panel */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
              Stack recipes
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              How the pieces fit together
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Great products are systems, not single tools. Here are the combinations we
              reach for most.
            </p>

            {/* swapping detail: desktop only */}
            <div className="mt-10 hidden border-t border-border pt-8 lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="font-mono text-xs text-brand">
                    0{activeIndex + 1} / 0{RECIPES.length}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    {current.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{current.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {current.idealFor.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* progress bars */}
              <div className="mt-8 flex gap-2">
                {RECIPES.map((r, i) => (
                  <span
                    key={r.id}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === activeIndex ? "w-10 bg-brand" : "w-4 bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right: scrolling recipe cards */}
          <div className="min-w-0 space-y-8 lg:space-y-10">
            {RECIPES.map((recipe, i) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={i}
                active={i === activeIndex}
                onActive={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}