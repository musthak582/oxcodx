import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { technologies } from "@/data/technologies";

export function TechPreview() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Technologies"
          title="Modern tools, proven in production"
          description="We pick the right stack for the job, not the trendiest one."
        />

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {technologies.map((group) => (
            <div key={group.category}>
              <Reveal>
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {group.category}
                </h3>
              </Reveal>
              <StaggerGroup className="mt-4 grid grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <StaggerItem key={item}>
                    <div className="group flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_6px_20px_rgba(37,99,235,0.08)]">
                      <span className="h-2 w-2 rounded-full bg-border transition-all duration-300 group-hover:bg-brand group-hover:shadow-[0_0_10px_rgba(37,99,235,0.7)]" />
                      <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                        {item}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Button href="/technologies" variant="secondary" arrow>
            Explore our stack
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}