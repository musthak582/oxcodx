import { Layers, GraduationCap, Users, Code2, TrendingUp, Handshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SpotlightCard } from "@/components/motion/spotlight-card";

// PLACEHOLDER copy. Edit so it matches your real culture and benefits.
const PERKS = [
  {
    icon: Layers,
    title: "Real ownership",
    description: "Take responsibility for features end to end, not just a list of tickets.",
  },
  {
    icon: GraduationCap,
    title: "Always learning",
    description: "Space to learn new tools and skills. We even run our own courses.",
  },
  {
    icon: Users,
    title: "Work with mentors",
    description: "Learn from experienced engineers and designers who share what they know.",
  },
  {
    icon: Code2,
    title: "Modern tools",
    description: "Next.js, TypeScript and cloud-native tooling, with no legacy mess for its own sake.",
  },
  {
    icon: TrendingUp,
    title: "Room to grow",
    description: "Clear expectations and honest feedback to help you move up.",
  },
  {
    icon: Handshake,
    title: "Respectful culture",
    description: "Direct, kind communication. Good ideas win, whoever they come from.",
  },
];

export function CareersPerks() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Life at OxCodx"
          title="A place to do your best work"
          description="We're building a team that cares about craft, learns fast and looks out for each other."
        />

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <SpotlightCard className="h-full p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-brand transition-all duration-300 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand/5">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}