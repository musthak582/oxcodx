"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { applicationSchema, type ApplicationInput } from "@/lib/validations/application";
import { Field, inputBase } from "@/components/enquiry/enquiry-form";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function ApplicationForm({
  role,
  autoFocus = false,
  onDone,
}: {
  role: string;
  autoFocus?: boolean;
  onDone?: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState({ name: "", email: "" });

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role,
      portfolioUrl: "",
      profileUrl: "",
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    if (autoFocus) setFocus("name");
  }, [autoFocus, setFocus]);

  async function onSubmit(values: ApplicationInput) {
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/apply", {
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
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">Thanks, {sentTo.name}.</h3>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Your application for <span className="font-medium text-foreground">{role}</span> is in.
          We'll be in touch at{" "}
          <span className="font-medium text-foreground">{sentTo.email}</span>.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-surface"
        >
          Done
        </button>
      </motion.div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <input type="hidden" {...register("role")} />

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
            placeholder="jane@email.com"
            {...register("email")}
            className={cn(inputBase, errors.email ? "border-red-400" : "border-border")}
          />
        </Field>
      </div>

      <Field label="Phone" optional error={errors.phone?.message}>
        <input
          type="tel"
          autoComplete="tel"
          placeholder="+94 77 123 4567"
          {...register("phone")}
          className={cn(inputBase, errors.phone ? "border-red-400" : "border-border")}
        />
      </Field>

      <Field label="Link to your CV or portfolio" error={errors.portfolioUrl?.message}>
        <input
          type="text"
          inputMode="url"
          placeholder="https://drive.google.com/..."
          {...register("portfolioUrl")}
          className={cn(inputBase, errors.portfolioUrl ? "border-red-400" : "border-border")}
        />
        <span className="mt-1.5 block text-xs text-muted">
          Google Drive, Dropbox, GitHub or a personal site. Make sure anyone with the link can view it.
        </span>
      </Field>

      <Field label="LinkedIn or GitHub" optional error={errors.profileUrl?.message}>
        <input
          type="text"
          inputMode="url"
          placeholder="https://linkedin.com/in/..."
          {...register("profileUrl")}
          className={cn(inputBase, errors.profileUrl ? "border-red-400" : "border-border")}
        />
      </Field>

      <Field label="Tell us about yourself" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="A few lines about your experience and why this role interests you..."
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
          <span className="relative">Submit application</span>
        )}
      </button>
    </form>
  );
}