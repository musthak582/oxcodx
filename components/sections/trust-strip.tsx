import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { CountUp } from "@/components/motion/count-up";

const STATS = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 30, suffix: "+", label: "Happy clients" },
  { value: 99, suffix: "%", label: "Client satisfaction" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white">
      <Container>
        <StaggerGroup className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="px-4 py-10 text-center md:py-12">
              <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}