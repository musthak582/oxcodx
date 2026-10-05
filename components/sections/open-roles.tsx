"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Reveal, EASE } from "@/components/motion/reveal";
import { ApplicationForm } from "@/components/careers/application-form";
import { roleTeams, roles, type Role, type RoleTeamFilter } from "@/data/roles";
import { cn } from "@/lib/utils";

export function OpenRoles() {
  const [team, setTeam] = useState<RoleTeamFilter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [applying, setApplying] = useState<Role | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [instance, setInstance] = useState(0);

  const filtered = useMemo(
    () => (team === "All" ? roles : roles.filter((r) => r.team === team)),
    [team]
  );

  const apply = (role: Role) => {
    setApplying(role);
    setInstance((n) => n + 1); // fresh form each time
    setModalOpen(true);
  };
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <section id="open-roles" className="scroll-mt-20 bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Open roles"
          title="Join the team"
          description="Pick a role to see the details, then apply with a link to your CV or portfolio."
        />

        {/* tabs */}
        <Reveal className="mt-12 flex justify-center">
          <div className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex gap-1 rounded-full border border-border bg-white p-1">
              {roleTeams.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTeam(t);
                    setOpenId(null);
                  }}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    team === t ? "text-white" : "text-muted hover:text-foreground"
                  )}
                >
                  {team === t && (
                    <motion.span
                      layoutId="role-tab-pill"
                      className="absolute inset-0 rounded-full bg-brand shadow-[0_4px_14px_-4px_rgba(37,99,235,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* list */}
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {filtered.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border py-12 text-center text-muted">
              No open roles here right now. Send us an open application below.
            </p>
          )}

          <AnimatePresence mode="popLayout">
            {filtered.map((role, i) => {
              const isOpen = openId === role.id;
              return (
                <motion.div
                  key={role.id}
                  layout="position"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                    isOpen
                      ? "border-brand/30 shadow-[0_16px_50px_-20px_rgba(37,99,235,0.25)]"
                      : "border-border hover:border-brand/20"
                  )}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : role.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{role.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                          {role.team}
                        </span>
                        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                        isOpen ? "border-brand bg-brand text-white" : "border-border text-muted"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-5 pb-6 pt-5 sm:px-6">
                          <p className="leading-relaxed text-muted">{role.summary}</p>

                          <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {[
                              { title: "What you'll do", items: role.responsibilities },
                              { title: "What we look for", items: role.requirements },
                            ].map((col) => (
                              <div key={col.title}>
                                <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground">
                                  {col.title}
                                </h4>
                                <ul className="mt-3 space-y-2.5">
                                  {col.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                                      </span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <Button onClick={() => apply(role)} arrow className="mt-7">
                            Apply for this role
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>

      {/* application modal */}
      <Modal open={modalOpen} onClose={closeModal} labelledBy="apply-title">
        {applying && (
          <>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
              Apply
            </p>
            <h2 id="apply-title" className="mt-3 text-2xl font-semibold tracking-tight">
              Apply for this role
            </h2>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span className="font-medium">{applying.title}</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Share a link to your CV or portfolio and a few words about yourself. We'll reply by email.
            </p>
            <div className="mt-6">
              <ApplicationForm
                key={`${applying.id}-${instance}`}
                role={applying.title}
                autoFocus
                onDone={closeModal}
              />
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}