import { z } from "zod";

export const normalizeUrl = (v: string) =>
  /^https?:\/\//i.test(v) ? v : `https://${v}`;

const isValidUrl = (v: string) => {
  try {
    const u = new URL(normalizeUrl(v));
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
};

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
  role: z.string().trim().min(2).max(120),
  portfolioUrl: z
    .string()
    .trim()
    .min(1, "Please add a link to your CV or portfolio")
    .max(300, "That link is too long")
    .refine(isValidUrl, "Please enter a valid link, e.g. https://drive.google.com/..."),
  profileUrl: z
    .string()
    .trim()
    .max(300, "That link is too long")
    .refine((v) => v === "" || isValidUrl(v), "Please enter a valid link")
    .optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters")
    .max(2000, "Message is too long (2000 characters max)"),
  // honeypot
  website: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;