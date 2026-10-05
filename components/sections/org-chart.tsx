"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, EASE } from "@/components/motion/reveal";
import { org, type OrgNode } from "@/data/org";
import { cn } from "@/lib/utils";

/* ---------- connector line (draws itself, with a travelling pulse) ---------- */
function Line({
  orientation,
  delay = 0,
  origin,
  active = false,
  className,
}: {
  orientation: "v" | "h";
  delay?: number;
  origin?: string;
  active?: boolean;
  className?: string;
}) {
  const vertical = orientation === "v";
  const hidden = vertical ? { scaleY: 0 } : { scaleX: 0 };
  const shown = vertical ? { scaleY: 1 } : { scaleX: 1 };

  return (
    <motion.div
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      style={{ transformOrigin: origin ?? (vertical ? "top" : "left") }}
      className={cn("absolute overflow-hidden", vertical ? "w-px" : "h-px", className)}
    >
      <span className="absolute inset-0 bg-border" />
      <span
        className={cn(
          "absolute inset-0 bg-brand transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
      />
      <span className={cn("absolute inset-0", vertical ? "pulse-y" : "pulse-x")} />
    </motion.div>
  );
}

/* ---------- node card ---------- */
type Level = "root" | "dept" | "team";

function NodeCard({
  node,
  level,
  active = false,
  hovered = false,
  delay = 0,
  onHover,
}: {
  node: OrgNode;
  level: Level;
  active?: boolean;
  hovered?: boolean;
  delay?: number;
  onHover?: (id: string) => void;
}) {
  const Icon = node.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      <div
        onMouseEnter={() => onHover?.(node.id)}
        className={cn(
          "flex items-start gap-3 rounded-2xl border transition-all duration-300",
          level === "team" ? "p-3.5" : "p-5",
          level === "root"
            ? "border-dark bg-dark text-white shadow-[0_20px_50px_-12px_rgba(37,99,235,0.45)]"
            : "border-border bg-white",
          active && level !== "root" && "border-brand/50 shadow-[0_8px_30px_rgba(37,99,235,0.16)]",
          hovered && "-translate-y-0.5"
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
            level === "team" ? "h-9 w-9" : "h-11 w-11",
            level === "root"
              ? "bg-white/10 text-white"
              : active
              ? "bg-brand text-white"
              : "bg-brand/5 text-brand"
          )}
        >
          <Icon className={level === "team" ? "h-4 w-4" : "h-5 w-5"} />
        </div>
        <div className="min-w-0">
          <h3 className={cn("font-semibold tracking-tight", level === "team" ? "text-sm" : "text-base")}>
            {node.title}
          </h3>
          <p
            className={cn(
              "mt-0.5 leading-snug",
              level === "team" ? "text-xs" : "text-sm",
              level === "root" ? "text-white/60" : "text-muted"
            )}
          >
            {node.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- helpers ---------- */
function buildParentMap(node: OrgNode, parent: string | null = null, map: Record<string, string | null> = {}) {
  map[node.id] = parent;
  node.children?.forEach((child) => buildParentMap(child, node.id, map));
  return map;
}

// Horizontal bus segments from each department's column centre towards the
// middle of the chart (assumes 4 departments, each 25% wide).
const BUS_SEGMENTS = [
  { left: 12.5, width: 37.5 },
  { left: 37.5, width: 12.5 },
  { left: 50, width: 12.5 },
  { left: 50, width: 37.5 },
];

/* ---------- desktop tree ---------- */
function DesktopTree() {
  const [hovered, setHovered] = useState<string | null>(null);
  const parents = useMemo(() => buildParentMap(org), []);

  const activeIds = useMemo(() => {
    const set = new Set<string>();
    let current: string | null = hovered;
    while (current) {
      set.add(current);
      current = parents[current] ?? null;
    }
    return set;
  }, [hovered, parents]);

  const departments = org.children ?? [];

  return (
    <div className="hidden lg:block" onMouseLeave={() => setHovered(null)}>
      {/* root */}
      <div className="mx-auto w-80">
        <NodeCard
          node={org}
          level="root"
          hovered={hovered === org.id}
          onHover={setHovered}
        />
      </div>

      {/* root -> bus */}
      <div className="relative mx-auto h-10 w-px">
        <Line orientation="v" delay={0.3} active={hovered !== null} className="left-0 top-0 h-full" />
      </div>

      {/* bus + departments */}
      <div className="relative">
        <Line orientation="h" origin="center" delay={0.5} className="left-[12.5%] right-[12.5%] top-0" />
        {departments.map((dept, i) => (
          <div
            key={dept.id}
            aria-hidden
            className="absolute top-0 h-px bg-brand transition-opacity duration-300"
            style={{
              left: `${BUS_SEGMENTS[i]?.left}%`,
              width: `${BUS_SEGMENTS[i]?.width}%`,
              opacity: activeIds.has(dept.id) ? 1 : 0,
            }}
          />
        ))}

        <div className="grid grid-cols-4">
          {departments.map((dept, di) => {
            const teams = dept.children ?? [];
            const hoveredTeamIdx = teams.findIndex((t) => t.id === hovered);

            return (
              <div key={dept.id} className="relative px-3 pt-8">
                <Line
                  orientation="v"
                  delay={0.7 + di * 0.08}
                  active={activeIds.has(dept.id)}
                  className="left-1/2 top-0 h-8"
                />
                <NodeCard
                  node={dept}
                  level="dept"
                  active={activeIds.has(dept.id)}
                  hovered={hovered === dept.id}
                  delay={0.8 + di * 0.08}
                  onHover={setHovered}
                />

                <div className="mt-3 space-y-3 pl-8">
                  {teams.map((team, ti) => (
                    <div key={team.id} className="relative">
                      <Line
                        orientation="v"
                        delay={0.9 + di * 0.08 + ti * 0.05}
                        active={hoveredTeamIdx >= ti}
                        className="-left-4 -top-3 h-[calc(50%+0.75rem)]"
                      />
                      <Line
                        orientation="h"
                        delay={1 + di * 0.08 + ti * 0.05}
                        active={activeIds.has(team.id)}
                        className="-left-4 top-1/2 w-4"
                      />
                      <NodeCard
                        node={team}
                        level="team"
                        active={activeIds.has(team.id)}
                        hovered={hovered === team.id}
                        delay={1.05 + di * 0.08 + ti * 0.05}
                        onHover={setHovered}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- mobile stacked tree ---------- */
function MobileTree() {
  const departments = org.children ?? [];

  return (
    <div className="lg:hidden">
      <Reveal>
        <NodeCard node={org} level="root" />
      </Reveal>

      <div className="ml-5 mt-3 space-y-8 border-l border-border pb-1 pl-6 pt-8">
        {departments.map((dept) => (
          <Reveal key={dept.id}>
            <div className="relative">
              <span className="absolute -left-6 top-9 h-px w-6 bg-border" />
              <NodeCard node={dept} level="dept" />
              <div className="ml-5 mt-3 space-y-3 border-l border-border pl-6">
                {dept.children?.map((team) => (
                  <div key={team.id} className="relative">
                    <span className="absolute -left-6 top-1/2 h-px w-6 bg-border" />
                    <NodeCard node={team} level="team" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------- section ---------- */
export function OrgChart() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Our structure"
          title="One team, built to deliver"
          description="Every project is backed by specialists across engineering, design, operations and growth. Hover a team to see how it connects."
        />
        <div className="mt-16">
          <DesktopTree />
          <MobileTree />
        </div>
      </Container>
    </section>
  );
}