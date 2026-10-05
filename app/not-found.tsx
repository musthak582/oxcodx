import type { Metadata } from "next";
import { NotFoundContent } from "@/components/sections/not-found-content";

export const metadata: Metadata = {
  title: "Page not found — OxCodx",
};

export default function NotFound() {
  return (
    <main>
      <NotFoundContent />
    </main>
  );
}