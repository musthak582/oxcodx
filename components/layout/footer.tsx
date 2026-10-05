import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-bright/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-64 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]"
      />

      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.description} We design, build and scale software for
              ambitious businesses.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm text-brand-bright transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>

          {siteConfig.footer.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-medium text-white">{group.title}</h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} OxCodx. All rights reserved.</p>
          <p className="font-mono text-xs">Built with Next.js</p>
        </div>
      </Container>
    </footer>
  );
}