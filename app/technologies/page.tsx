import type { Metadata } from "next";
import { TechHero } from "@/components/sections/tech-hero";
import { TechExplorer } from "@/components/sections/tech-explorer";
import { StackPrinciples } from "@/components/sections/stack-principles";
import { StackRecipes } from "@/components/sections/stack-recipes";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Technologies — OxCodx",
  description:
    "The modern, proven technologies OxCodx uses to build fast, secure and scalable software.",
};

export default function TechnologiesPage() {
  return (
    <main>
      <TechHero />
      <TechExplorer />
      <StackPrinciples />
      <StackRecipes />
      <Cta />
    </main>
  );
}