"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EnquiryButton } from "@/components/enquiry/enquiry-button";
import { Reveal, EASE } from "@/components/motion/reveal";
import { services, type Service } from "@/data/services";
import { serviceDetails } from "@/data/service-details";
import { cn } from "@/lib/utils";

function ServiceVisual({ service }: { service: Service }) {
    return (
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white to-surface">
            <div className="bg-grid absolute inset-0 opacity-70" />
            <div
                aria-hidden
                className="absolute h-64 w-64 rounded-full bg-brand/20 blur-[80px]"
            />

            {/* rings */}
            {[220, 320].map((size, i) => (
                <motion.div
                    key={size}
                    aria-hidden
                    className="absolute rounded-full border border-brand/15"
                    style={{ width: size, height: size }}
                    animate={{ scale: [1, 1.05], opacity: [0.6, 1] }}
                    transition={{
                        duration: 4 + i * 1.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* center icon */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-white shadow-[0_20px_50px_-12px_rgba(37,99,235,0.35)]">
                <service.icon className="h-10 w-10 text-brand" strokeWidth={1.5} />
            </div>

            {/* floating chip */}
            <motion.div
                className="absolute bottom-8 right-8 rounded-full border border-border bg-white/90 px-4 py-2 font-mono text-xs text-muted shadow-sm backdrop-blur"
                animate={{ y: [0, -6] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                {service.title}
            </motion.div>
        </div>
    );
}

export function ServiceDetails() {
    return (
        <>
            {services.map((service, i) => {
                const detail = serviceDetails[service.title];
                if (!detail) return null;
                const flip = i % 2 === 1;

                return (
                    <section
                        key={service.title}
                        id={detail.id}
                        className={cn(
                            "scroll-mt-20 py-20 md:py-28",
                            i % 2 === 0 ? "bg-white" : "bg-surface"
                        )}
                    >
                        <Container>
                            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                                <div className={cn(flip && "lg:order-2")}>
                                    <Reveal>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-brand">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                    </Reveal>
                                    <Reveal delay={0.05}>
                                        <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                                            {service.title}
                                        </h2>
                                    </Reveal>
                                    <Reveal delay={0.1}>
                                        <p className="mt-4 text-lg leading-relaxed text-muted">
                                            {service.description}
                                        </p>
                                    </Reveal>

                                    <ul className="mt-8 space-y-4">
                                        {detail.features.map((feature, fi) => (
                                            <motion.li
                                                key={feature}
                                                initial={{ opacity: 0, x: flip ? 12 : -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-60px" }}
                                                transition={{ duration: 0.5, ease: EASE, delay: 0.15 + fi * 0.07 }}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                                                    <Check className="h-3 w-3" strokeWidth={3} />
                                                </span>
                                                <span className="text-foreground/80">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <Reveal delay={0.4}>
                                        <p className="mt-8 border-l-2 border-brand pl-4 text-sm font-medium text-foreground">
                                            {detail.outcome}
                                        </p>
                                    </Reveal>
                                    <Reveal delay={0.45} className="mt-8">
                                        <EnquiryButton
                                            variant="secondary"
                                            arrow
                                            topic="service"
                                            subject={service.title}
                                        >
                                            Discuss this service
                                        </EnquiryButton>
                                    </Reveal>
                                </div>

                                <Reveal className={cn(flip && "lg:order-1")} y={28}>
                                    <ServiceVisual service={service} />
                                </Reveal>
                            </div>
                        </Container>
                    </section>
                );
            })}
        </>
    );
}