"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { EnquiryForm } from "./enquiry-form";
import { EASE } from "@/components/motion/reveal";
import type { Topic } from "@/lib/validations/enquiry";

type OpenOptions = {
  topic: Topic;
  subject?: string;
  title?: string;
  description?: string;
};

const EnquiryContext = createContext<{ open: (o: OpenOptions) => void } | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

const DEFAULT_TITLES: Record<Topic, string> = {
  course: "Enquire about this course",
  service: "Discuss this service",
  careers: "Ask about careers",
  general: "Send us a message",
};

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<OpenOptions | null>(null);
  const [instance, setInstance] = useState(0);

  const open = useCallback((o: OpenOptions) => {
    setInstance((n) => n + 1); // remounts the form fresh each time
    setOpts(o);
  }, []);
  const close = useCallback(() => setOpts(null), []);

  // ESC to close + lock page scroll while open
  useEffect(() => {
    if (!opts) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [opts, close]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {opts && (
          <motion.div
            key="enquiry-overlay"
            data-lenis-prevent
            className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={close} />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-title"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-white p-6 shadow-[0_40px_100px_-20px_rgba(10,10,10,0.35)] sm:rounded-3xl sm:p-8"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright to-transparent"
              />
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
                Enquiry
              </p>
              <h2 id="enquiry-title" className="mt-3 text-2xl font-semibold tracking-tight">
                {opts.title ?? DEFAULT_TITLES[opts.topic]}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {opts.description ??
                  "Leave your details and we'll get back to you by email within one business day."}
              </p>
              {opts.subject && (
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  <span className="text-muted">Regarding:</span>
                  <span className="font-medium">{opts.subject}</span>
                </span>
              )}

              <div className="mt-6">
                <EnquiryForm
                  key={instance}
                  topic={opts.topic}
                  subject={opts.subject}
                  lockTopic
                  autoFocus
                  onDone={close}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EnquiryContext.Provider>
  );
}