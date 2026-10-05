import { Mail, Clock, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { EnquiryForm } from "@/components/enquiry/enquiry-form";
import { siteConfig } from "@/config/site";
import type { Topic } from "@/lib/validations/enquiry";

const STEPS = [
  { title: "We read your message", description: "Someone on the team reviews every enquiry personally." },
  { title: "We reply by email", description: "You'll hear from us within one business day." },
  { title: "We plan the next step", description: "A call, a quote, or the right course. Whatever fits." },
];

export function ContactSection({ topic = "general" }: { topic?: Topic }) {
  const details = [
    {
      icon: Mail,
      label: "Email us",
      value: (
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-medium text-foreground transition-colors hover:text-brand"
        >
          {siteConfig.email}
        </a>
      ),
    },
    {
      icon: Clock,
      label: "Response time",
      value: <span className="font-medium text-foreground">Within one business day</span>,
    },
    {
      icon: MessageSquare,
      label: "Courses, services or careers",
      value: <span className="font-medium text-foreground">Pick a topic in the form</span>,
    },
  ];

  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          {/* left */}
          <div>
            <Reveal>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
                Get in touch
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Tell us what you're building
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                A new product, a course, a question, or just an idea. Send us a few lines and
                we'll take it from there.
              </p>
            </Reveal>

            <StaggerGroup className="mt-10 space-y-4">
              {details.map((d) => (
                <StaggerItem key={d.label}>
                  <SpotlightCard className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-brand transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/5">
                        <d.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted">{d.label}</p>
                        <p className="mt-0.5 truncate text-sm">{d.value}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* what happens next */}
            <Reveal className="mt-12">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
                What happens next
              </p>
              <ol className="relative mt-6 space-y-6">
                <span
                  aria-hidden
                  className="absolute bottom-3 left-[11px] top-3 w-px bg-border"
                />
                {STEPS.map((step, i) => (
                  <li key={step.title} className="relative pl-10">
                    <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-brand/30 bg-white font-mono text-[10px] font-semibold text-brand">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* right: form */}
          <Reveal y={28}>
            <div className="relative isolate">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand/10 blur-2xl"
              />
              <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_30px_80px_-30px_rgba(10,10,10,0.2)] sm:p-10">
                <h3 className="text-2xl font-semibold tracking-tight">Send us a message</h3>
                <p className="mt-2 text-sm text-muted">
                  Fill in the form and your message goes straight to our inbox.
                </p>
                <div className="mt-8">
                  <EnquiryForm topic={topic} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}