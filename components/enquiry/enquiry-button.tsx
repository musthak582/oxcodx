"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "./enquiry-provider";
import type { Topic } from "@/lib/validations/enquiry";

type Props = Omit<ComponentProps<typeof Button>, "href" | "onClick"> & {
  topic: Topic;
  subject?: string;
  title?: string;
  description?: string;
};

export function EnquiryButton({ topic, subject, title, description, ...buttonProps }: Props) {
  const { open } = useEnquiry();
  return (
    <Button
      {...buttonProps}
      onClick={() => open({ topic, subject, title, description })}
    />
  );
}