import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { AboutMission } from "@/components/sections/about-mission";
import { AboutStory } from "@/components/sections/about-story";
import { AboutValues } from "@/components/sections/about-values";
import { OrgChart } from "@/components/sections/org-chart";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About — OxCodx",
  description:
    "Meet the team structure, mission and values behind OxCodx, a software development and services company.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="The team behind your next product"
        description="OxCodx is a software company built on craft, clarity and long-term partnerships."
      />
      <AboutMission />
      <AboutStory />
      <AboutValues />
      <OrgChart />
      <TrustStrip />
      <Cta />
    </main>
  );
}