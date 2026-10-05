"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, PlayCircle, Users, Video, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechLogo } from "@/components/ui/tech-logo";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Reveal, EASE } from "@/components/motion/reveal";
import { EnquiryButton } from "@/components/enquiry/enquiry-button";
import {
  courseFormats,
  courses,
  type Course,
  type CourseFormat,
  type CourseFormatFilter,
} from "@/data/courses";
import { getTech, techColor } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

const formatMeta: Record<CourseFormat, { icon: LucideIcon; gradient: string }> = {
  "Live online": { icon: Video, gradient: "from-brand-deep via-brand to-brand-bright" },
  Recorded: { icon: PlayCircle, gradient: "from-[#0a0f24] via-brand-deep to-brand" },
  "In-person": { icon: Users, gradient: "from-brand to-brand-bright" },
};

function CourseVisual({ course }: { course: Course }) {
  const meta = formatMeta[course.format];
  const Icon = meta.icon;
  const techs = course.techIds.slice(0, 3).map(getTech);

  return (
    <div
      className={cn(
        "relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br",
        meta.gradient
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, #000 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 90% at 50% 50%, #000 20%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-[50px]"
      />

      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
        <Icon className="h-3.5 w-3.5" />
        {course.format}
      </span>

      <div className="relative flex items-center gap-3 pt-6">
        {techs.map((tech, i) => (
          <div
            key={tech.id}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:-translate-y-1"
            style={{ color: techColor(tech), transitionDelay: `${i * 40}ms` }}
          >
            <TechLogo tech={tech} className="h-6 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CoursesExplorer() {
  const [active, setActive] = useState<CourseFormatFilter>("All");

  const filtered = useMemo(
    () => (active === "All" ? courses : courses.filter((c) => c.format === active)),
    [active]
  );

  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Catalogue"
          title="Find the right course for you"
          description="Filter by how you like to learn. Every enrolment starts with a quick enquiry so we can match you to the right group."
        />

        {/* tabs */}
        <Reveal className="mt-12 flex justify-center">
          <div className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex gap-1 rounded-full border border-border bg-white p-1">
              {courseFormats.map((format) => (
                <button
                  key={format}
                  onClick={() => setActive(format)}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active === format ? "text-white" : "text-muted hover:text-foreground"
                  )}
                >
                  {active === format && (
                    <motion.span
                      layoutId="course-tab-pill"
                      className="absolute inset-0 rounded-full bg-brand shadow-[0_4px_14px_-4px_rgba(37,99,235,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{format}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center font-mono text-xs text-muted">
          {filtered.length} {filtered.length === 1 ? "course" : "courses"}
        </p>

        {/* cards */}
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.03 }}
                className="h-full"
              >
                <SpotlightCard className="h-full">
                  <CourseVisual course={course} />
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {course.level}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">
                      {course.title}
                    </h3>
                    <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-muted">
                      {course.description}
                    </p>
                    <EnquiryButton
                      variant="secondary"
                      arrow
                      topic="course"
                      subject={`${course.title} (${course.format})`}
                      description="Leave your details and we'll email you the next start date, fees and how to enrol."
                      className="mt-5 w-full"
                    >
                      Enquire to enrol
                    </EnquiryButton>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}