"use client";

import { MotionConfig } from "framer-motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { EnquiryProvider } from "@/components/enquiry/enquiry-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <EnquiryProvider>{children}</EnquiryProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}