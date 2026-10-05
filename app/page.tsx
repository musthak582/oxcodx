import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Process } from "@/components/sections/process";
import { DarkStats } from "@/components/sections/dark-stats";
import { TechPreview } from "@/components/sections/tech-preview";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <Process />
      <DarkStats />
      <TechPreview />
      <Cta />
    </main>
  );
}