import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-4 text-3xl font-semibold tracking-tight md:text-5xl",
            dark && "text-white"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/60" : "text-muted")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}