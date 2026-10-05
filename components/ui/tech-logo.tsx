import type { Tech } from "@/data/tech-stack";

export function TechLogo({ tech, className }: { tech: Tech; className?: string }) {
  if (tech.icon) {
    return (
      <svg
        role="img"
        aria-label={tech.name}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d={tech.icon.path} />
      </svg>
    );
  }
  const Fallback = tech.fallback!;
  return <Fallback aria-label={tech.name} className={className} />;
}