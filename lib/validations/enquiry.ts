import { z } from "zod";

export const topics = ["general", "course", "service", "careers"] as const;
export type Topic = (typeof topics)[number];

export const topicLabels: Record<Topic, string> = {
  general: "General enquiry",
  course: "Course enquiry",
  service: "Service enquiry",
  careers: "Careers enquiry",
};

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
  topic: z.enum(topics),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(2000, "Message is too long (2000 characters max)"),
  // honeypot: real people never fill this in
  website: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;