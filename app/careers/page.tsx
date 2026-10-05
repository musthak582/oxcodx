import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CareersPerks } from "@/components/sections/careers-perks";
import { OpenRoles } from "@/components/sections/open-roles";
import { HiringProcess } from "@/components/sections/hiring-process";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Careers — OxCodx",
  description:
    "Join OxCodx. See open roles in engineering, design, operations and growth, and apply with a link to your CV or portfolio.",
};

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        title="Build software that matters, with people who care"
        description="We're a growing team that values craft, curiosity and honest communication. Come and do your best work with us."
      />
      <CareersPerks />
      <OpenRoles />
      <HiringProcess />
      <Cta
        title="Don't see your role?"
        description="We're always happy to hear from talented people. Send an open application and tell us how you'd like to contribute."
        primaryLabel="Send an open application"
        primaryHref="/contact?topic=careers"
        secondaryLabel="Learn about OxCodx"
        secondaryHref="/about"
      />
    </main>
  );
}