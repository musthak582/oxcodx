import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetails } from "@/components/sections/service-details";
import { Process } from "@/components/sections/process";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Services — OxCodx",
  description:
    "Custom software, web, mobile, cloud, design and automation services from OxCodx.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Software services for ambitious businesses"
        description="From a first prototype to a platform used by thousands, we design, build and run the software your business depends on."
      />
      <ServiceDetails />
      <Process />
      <Cta />
    </main>
  );
}