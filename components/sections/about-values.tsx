import { ShieldCheck, Eye, Users, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SpotlightCard } from "@/components/motion/spotlight-card";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Quality first",
    description: "We ship clean, tested and secure code, because shortcuts always come back.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    description: "Clear scope, honest timelines and regular demos. You always know where things stand.",
  },
  {
    icon: Users,
    title: "Client ownership",
    description: "Your product, your code, your roadmap. We act like part of your team.",
  },
  {
    icon: BookOpen,
    title: "Always learning",
    description: "Technology moves fast. We invest in learning so your product never falls behind.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our values"
          title="The principles behind every project"
          description="How we work matters as much as what we build."
        />

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <StaggerItem key={v.title} className="h-full">
              <SpotlightCard className="h-full p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-brand transition-all duration-300 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand/5">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}