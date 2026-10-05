import Link from "next/link";
import { serviceDetails } from "@/data/service-details";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/data/services";

export function ServicesPreview() {
    return (
        <section className="bg-surface py-24 md:py-32">
            <Container>
                <SectionHeading
                    eyebrow="Services"
                    title="Everything you need to build and grow"
                    description="From first idea to production at scale, we cover the full software lifecycle."
                />

                <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <StaggerItem key={service.title} className="h-full">
                            <Link
                                href={`/services#${serviceDetails[service.title]?.id ?? ""}`}
                                className="block h-full"
                            >
                                <SpotlightCard className="h-full p-8">
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-brand transition-all duration-300 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand/5">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="mt-2 leading-relaxed text-muted">
                                        {service.description}
                                    </p>
                                </SpotlightCard>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerGroup>

                <Reveal className="mt-12 text-center">
                    <Button href="/services" variant="secondary" arrow>
                        View all services
                    </Button>
                </Reveal>
            </Container>
        </section>
    );
}