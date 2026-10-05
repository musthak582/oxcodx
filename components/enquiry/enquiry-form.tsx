"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  enquirySchema,
  topics,
  topicLabels,
  type EnquiryInput,
  type Topic,
} from "@/lib/validations/enquiry";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/10";

export function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function EnquiryForm({
  topic = "general",
  subject = "",
  lockTopic = false,
  autoFocus = false,
  onDone,
}: {
  topic?: Topic;
  subject?: string;
  lockTopic?: boolean;
  autoFocus?: boolean;
  onDone?: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState({ name: "", email: "" });

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", phone: "", topic, subject, message: "", website: "" },
  });

  useEffect(() => {
    if (autoFocus) setFocus("name");
  }, [autoFocus, setFocus]);

  async function onSubmit(values: EnquiryInput) {
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message ?? "Something went wrong. Please try again.");
      setSentTo({ name: values.name.split(" ")[0], email: values.email });
      setStatus("success");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  /* ---------- success ---------- */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="py-8 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-brand"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">
          Thanks, {sentTo.name}.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Your message is on its way. We'll reply to{" "}
          <span className="font-medium text-foreground">{sentTo.email}</span> within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => {
            if (onDone) {
              onDone();
            } else {
              reset();
              setStatus("idle");
            }
          }}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-surface"
        >
          {onDone ? "Done" : "Send another message"}
        </button>
      </motion.div>
    );
  }

  /* ---------- form ---------- */
  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <input type="hidden" {...register("subject")} />
      {lockTopic && <input type="hidden" {...register("topic")} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            {...register("name")}
            className={cn(inputBase, errors.name ? "border-red-400" : "border-border")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            {...register("email")}
            className={cn(inputBase, errors.email ? "border-red-400" : "border-border")}
          />
        </Field>
      </div>

      <div className={cn("grid gap-5", !lockTopic && "sm:grid-cols-2")}>
        <Field label="Phone" optional error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+94 77 123 4567"
            {...register("phone")}
            className={cn(inputBase, errors.phone ? "border-red-400" : "border-border")}
          />
        </Field>
        {!lockTopic && (
          <Field label="Topic">
            <div className="relative">
              <select
                {...register("topic")}
                className={cn(inputBase, "appearance-none border-border pr-10")}
              >
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {topicLabels[t]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </Field>
        )}
      </div>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="Tell us a little about what you need..."
          {...register("message")}
          className={cn(inputBase, "resize-none", errors.message ? "border-red-400" : "border-border")}
        />
      </Field>

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {status === "error" && serverError && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {serverError}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-6 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_20px_-6px_rgba(37,99,235,0.5)] transition-all duration-300 hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
        />
        {loading ? (
          <>
            <Loader2 className="relative h-4 w-4 animate-spin" />
            <span className="relative">Sending...</span>
          </>
        ) : (
          <span className="relative">Send message</span>
        )}
      </button>

      <p className="text-center text-xs text-muted">
        We reply within one business day. Your details are only used to answer you.
      </p>
    </form>
  );
}