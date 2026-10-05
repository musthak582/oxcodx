"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

const DIGITS = ["4", "0", "4"];

export function NotFoundContent() {
  const pathname = usePathname();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div className="bg-grid absolute inset-0" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        animate={{ x: [-40, 40], y: [0, 24] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <Container className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand"
        >
          Error 404
        </motion.p>

        {/* big 404 */}
        <div aria-hidden className="mt-4 flex justify-center gap-1 md:gap-3">
          {DIGITS.map((digit, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 36, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.12 }}
              className="inline-block"
            >
              <motion.span
                animate={i === 1 ? { y: [0, -14] } : undefined}
                transition={
                  i === 1
                    ? { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }
                    : undefined
                }
                className={
                  i === 1
                    ? "inline-block bg-gradient-to-br from-brand-bright to-brand-deep bg-clip-text text-[7rem] font-semibold leading-none tracking-tighter text-transparent sm:text-[10rem] md:text-[13rem]"
                    : "inline-block bg-gradient-to-b from-foreground to-foreground/20 bg-clip-text text-[7rem] font-semibold leading-none tracking-tighter text-transparent sm:text-[10rem] md:text-[13rem]"
                }
              >
                {digit}
              </motion.span>
            </motion.span>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl"
        >
          This page took a wrong turn
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
          className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted"
        >
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </motion.div>

        {/* what was requested */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mt-10 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 font-mono text-xs text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
          <span className="truncate">GET {pathname} → 404 Not Found</span>
        </motion.div>

        {/* quick links */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1 }}
          aria-label="Quick links"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:text-foreground hover:shadow-[0_6px_20px_rgba(37,99,235,0.08)]"
            >
              {item.label}
            </Link>
          ))}
        </motion.nav>
      </Container>
    </section>
  );
}