import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

// PLACEHOLDER milestones. Replace with your real company history.
const MILESTONES = [
  {
    year: "2020",
    title: "The idea",
    description:
      "OxCodx started with a simple goal: build software the right way, with honesty and craft.",
  },
  {
    year: "2021",
    title: "First client projects",
    description:
      "We delivered our first custom platforms and learned what it takes to earn long-term trust.",
  },
  {
    year: "2023",
    title: "Growing the team",
    description:
      "Engineering, design and delivery teams came together under one roof and one process.",
  },
  {
    year: "2025",
    title: "Launching training",
    description:
      "We opened our courses to share what we know and grow the next generation of developers.",
  },
  {
    year: "Today",
    title: "Building what's next",
    description:
      "Helping ambitious businesses design, build and scale software that lasts.",
  },
];

export function AboutStory() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our story"
          title="From a small idea to a trusted partner"
          description="A few moments that shaped how we work."
        />

        <div className="mx-auto mt-16 max-w-3xl">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={0.05}>
              <div className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6.5rem_1fr]">
                <p className="pt-0.5 text-right font-mono text-sm font-medium text-brand">
                  {m.year}
                </p>
                <div
                  className={
                    i === MILESTONES.length - 1
                      ? "relative ml-5 border-l border-transparent pl-8 sm:ml-6"
                      : "relative ml-5 border-l border-border pb-12 pl-8 sm:ml-6"
                  }
                >
                  <span className="absolute -left-[6px] top-1.5 h-[11px] w-[11px] rounded-full bg-brand shadow-[0_0_12px_rgba(37,99,235,0.6)] ring-4 ring-surface" />
                  <h3 className="text-xl font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{m.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}