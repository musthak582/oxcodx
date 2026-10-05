"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { TechLogo } from "@/components/ui/tech-logo";
import { getTech } from "@/data/tech-stack";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ---------- timeline ---------- */
const T = 12; // seconds per full build cycle (raise it to slow everything down)

const loop = (times: number[]): Transition => ({
  duration: T,
  times,
  ease: "easeInOut",
  repeat: Infinity,
});

/* ---------- geometry (px, in the isometric plane) ---------- */
const SIZE = 220;
const HALF = SIZE / 2;
const RADIUS = 32;
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

// Code layers: they float apart, drop onto the base one by one, then merge.
const PLATES = [
  { label: ".JSON", float: 100, landed: 6, descend: [0.2, 0.32], alpha: 0.6 },
  { label: ".TS", float: 170, landed: 12, descend: [0.28, 0.4], alpha: 0.5 },
  { label: ".TSX", float: 240, landed: 18, descend: [0.36, 0.48], alpha: 0.38 },
];

const CHIP = 56;
const DIST = 200;
const CHIPS = [
  { id: "nodejs", axis: "x", sign: -1 },
  { id: "postgresql", axis: "y", sign: 1 },
  { id: "docker", axis: "x", sign: 1 },
  { id: "redis", axis: "y", sign: -1 },
] as const;

const STEPS = [
  { text: "Assembling layers", times: [0, 0.47, 0.5, 0.97, 1], opacity: [1, 1, 0, 0, 1], ok: false },
  { text: "Building", times: [0, 0.5, 0.53, 0.77, 0.8, 1], opacity: [0, 0, 1, 1, 0, 0], ok: false },
  { text: "Deployed", times: [0, 0.82, 0.86, 0.96, 0.99, 1], opacity: [0, 0, 1, 1, 0, 0], ok: true },
];

/* ---------- pieces ---------- */
function Plate({ plate }: { plate: (typeof PLATES)[number] }) {
  const { float: f, landed, descend, alpha, label } = plate;
  return (
    <motion.div
      initial={{ z: f, opacity: 0 }}
      animate={{
        z: [f, f + 8, f, f, landed, landed, 0, f, f],
        opacity: [1, 1, 0, 0, 1],
      }}
      transition={{
        z: loop([0, 0.08, 0.16, descend[0], descend[1], 0.72, 0.8, 0.92, 1]),
        opacity: loop([0, 0.72, 0.8, 0.92, 1]),
      }}
      style={{
        position: "absolute",
        left: -HALF,
        top: -HALF,
        width: SIZE,
        height: SIZE,
        borderRadius: RADIUS,
        border: `1px solid rgba(96,165,250,${alpha + 0.2})`,
        background: `linear-gradient(135deg, rgba(59,130,246,${alpha * 0.28}), rgba(59,130,246,0.02))`,
        boxShadow: `0 0 40px rgba(59,130,246,${alpha * 0.5}), inset 0 0 40px rgba(59,130,246,${alpha * 0.25})`,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 22,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.3em",
          color: "rgba(191,219,254,0.85)",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function Ripple({ at }: { at: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: [0, 0.9, 0, 0], scale: [1, 1, 1.45, 1.45] }}
      transition={loop([0, at, at + 0.09, 1])}
      style={{
        position: "absolute",
        left: -HALF,
        top: -HALF,
        width: SIZE,
        height: SIZE,
        borderRadius: RADIUS,
        border: "2px solid rgba(147,197,253,0.8)",
        transform: "translateZ(3px)",
      }}
    />
  );
}

function Base({ reduce }: { reduce: boolean | null }) {
  const plate: React.CSSProperties = {
    position: "absolute",
    left: -HALF,
    top: -HALF,
    width: SIZE,
    height: SIZE,
    borderRadius: RADIUS,
  };

  return (
    <>
      {/* slab thickness */}
      {[-12, -8, -4].map((z, i) => (
        <div
          key={z}
          style={{
            ...plate,
            transform: `translateZ(${z}px)`,
            background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
            boxShadow: i === 0 ? "0 0 50px rgba(59,130,246,0.7)" : undefined,
          }}
        />
      ))}

      {/* top face */}
      <div
        style={{
          ...plate,
          background: "linear-gradient(135deg,#0d1530,#070b1c)",
          border: "1px solid rgba(96,165,250,0.7)",
          boxShadow: "0 0 30px rgba(59,130,246,0.35)",
        }}
      >
        {/* build glow */}
        <motion.div
          initial={{ opacity: 0.25 }}
          animate={
            reduce
              ? { opacity: 0.8 }
              : { opacity: [0.25, 0.4, 0.55, 0.8, 0.8, 1, 0.9, 0.25] }
          }
          transition={reduce ? { duration: 0 } : loop([0, 0.32, 0.4, 0.48, 0.72, 0.84, 0.95, 1])}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: RADIUS,
            background:
              "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.55), transparent 70%)",
          }}
        />
        {/* logo mark */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 56,
            height: 56,
            marginLeft: -28,
            marginTop: -28,
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 0 30px rgba(59,130,246,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          <Image src="/oxcodx-logo.png" alt="OxCodx Logo" width={28} height={28} />
        </div>
      </div>
    </>
  );
}

function Satellites() {
  const len = DIST - CHIP / 2 - HALF; // 62px connector
  return (
    <>
      {CHIPS.map(({ id, axis, sign }) => {
        const tech = getTech(id);
        const x = axis === "x" ? sign * DIST : 0;
        const y = axis === "y" ? sign * DIST : 0;
        const start = sign < 0 ? -(DIST - CHIP / 2) : HALF;

        return (
          <div key={id}>
            {/* connector with a travelling pulse */}
            <div
              style={{
                position: "absolute",
                overflow: "hidden",
                background: "rgba(147,197,253,0.25)",
                ...(axis === "x"
                  ? { left: start, top: -1, width: len, height: 2 }
                  : { left: -1, top: start, width: 2, height: len }),
              }}
            >
              <span
                className={axis === "x" ? "pulse-x" : "pulse-y"}
                style={{
                  position: "absolute",
                  inset: 0,
                  animationDirection: sign === 1 ? "reverse" : "normal",
                }}
              />
            </div>

            {/* chip */}
            <div
              style={{
                position: "absolute",
                left: x - CHIP / 2,
                top: y - CHIP / 2,
                width: CHIP,
                height: CHIP,
                borderRadius: 14,
                background: "#0b1020",
                border: "1px solid rgba(96,165,250,0.6)",
                boxShadow: "0 0 24px rgba(59,130,246,0.35)",
                transform: "translateZ(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#bfdbfe",
              }}
            >
              <TechLogo tech={tech} className="h-6 w-6" />
            </div>
          </div>
        );
      })}
    </>
  );
}

function Product({ reduce }: { reduce: boolean | null }) {
  const bars = [40, 65, 50, 80, 100];

  return (
    <motion.div
      className="absolute left-0 top-0 -translate-x-1/2 -translate-y-full"
      initial={{ opacity: 0, y: 16, scale: 0.7 }}
      animate={
        reduce
          ? { opacity: 1, y: -86, scale: 1 }
          : {
            opacity: [0, 0, 1, 1, 0, 0],
            y: [16, 16, -86, -86, -104, 16],
            scale: [0.7, 0.7, 1, 1, 1, 0.7],
          }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
            opacity: loop([0, 0.78, 0.86, 0.95, 0.99, 1]),
            y: loop([0, 0.78, 0.88, 0.95, 0.99, 1]),
            scale: loop([0, 0.78, 0.88, 0.95, 0.99, 1]),
          }
      }
      style={{ transformOrigin: "50% 100%" }}
    >
      {/* light beam from the base */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-44 w-28 -translate-x-1/2 bg-gradient-to-t from-brand/70 to-transparent blur-lg"
      />

      {/* the finished app */}
      <div className="relative w-[168px] rounded-xl bg-white p-3 shadow-[0_20px_60px_-10px_rgba(59,130,246,0.8)]">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          <span className="ml-1.5 rounded-full bg-surface px-2 py-0.5 font-mono text-[8px] text-muted">
            oxcodx.app
          </span>
        </div>
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-brand-deep to-brand-bright"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          <span className="block h-1.5 w-4/5 rounded bg-border" />
          <span className="block h-1.5 w-3/5 rounded bg-border" />
        </div>
        <span className="absolute -bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-medium text-white shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Deployed
        </span>
      </div>
    </motion.div>
  );
}

function StatusPill({ reduce }: { reduce: boolean | null }) {
  const steps = reduce ? [STEPS[2]] : STEPS;
  return (
    <div className="absolute bottom-4 left-1/2 grid -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-[11px] text-white/70 backdrop-blur">
      {steps.map((s) => (
        <motion.span
          key={s.text}
          initial={{ opacity: s.opacity[0] }}
          animate={reduce ? { opacity: 1 } : { opacity: s.opacity }}
          transition={reduce ? { duration: 0 } : loop(s.times)}
          className="col-start-1 row-start-1 inline-flex items-center gap-2 whitespace-nowrap"
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              s.ok ? "bg-emerald-400" : "animate-pulse bg-brand-bright"
            )}
          />
          {s.text}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- scene ---------- */
export function BuildScene() {
  const reduce = useReducedMotion();

  return (
    <div
      role="img"
      aria-label="Animation: code layers from our tech stack assemble into a finished, deployed application"
      className="relative mx-auto h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#050816] shadow-[0_30px_80px_-20px_rgba(37,99,235,0.45)] sm:h-[460px] md:h-[540px]"
    >
      {/* ambient glow + top highlight */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 70%, rgba(37,99,235,0.28), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright/60 to-transparent"
      />

      {/* fixed-size stage, scaled down on smaller screens */}
      <div className="absolute left-1/2 top-[64%] h-0 w-0 scale-[0.6] sm:scale-[0.8] md:scale-100">
        {/* isometric 3D plane */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            transform: "rotateX(60deg) rotateZ(45deg)",
          }}
        >
          {/* ground grid */}
          <div
            style={{
              position: "absolute",
              left: -280,
              top: -280,
              width: 560,
              height: 560,
              transform: "translateZ(-40px)",
              backgroundImage:
                "linear-gradient(to right, rgba(147,197,253,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(147,197,253,0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(circle at 50% 50%, #000 25%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 25%, transparent 70%)",
            }}
          />

          <Satellites />
          <Base reduce={reduce} />

          {!reduce && (
            <>
              <Ripple at={0.32} />
              <Ripple at={0.4} />
              <Ripple at={0.48} />
              {PLATES.map((p) => (
                <Plate key={p.label} plate={p} />
              ))}
            </>
          )}
        </div>

        <Product reduce={reduce} />
      </div>

      <StatusPill reduce={reduce} />
    </div>
  );
}