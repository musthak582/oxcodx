import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CoursesExplorer } from "@/components/sections/courses-explorer";
import { LearningPaths } from "@/components/sections/learning-paths";
import { CourseBenefits } from "@/components/sections/course-benefits";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
    title: "Courses — OxCodx",
    description:
        "Practical software courses from OxCodx in live online, recorded and in-person formats.",
};

// PLACEHOLDER answers. Edit to match your real policies.
const FAQS: FaqItem[] = [
    {
        q: "Do I need any experience?",
        a: "Not for our beginner courses. Every course lists its level, and if you're unsure where to start, send us an enquiry and we'll recommend a path.",
    },
    {
        q: "How do live online, recorded and in-person courses differ?",
        a: "Live online courses run in scheduled sessions where you can talk to the instructor. Recorded courses let you learn on your own schedule. In-person courses meet face to face in a classroom setting.",
    },
    {
        q: "How do I enrol?",
        a: "Click Enquire on any course and send us your details. We reply by email with the next start date, fees and the next steps. There's no payment on the website.",
    },
    {
        q: "Can my team train with you?",
        a: "Yes. We can shape a course around your team's stack and goals. Tell us what you need through the enquiry form.",
    },
    {
        q: "How long until I hear back?",
        a: "We reply to every enquiry by email within one business day.",
    },
];

export default function CoursesPage() {
    return (
        <main>
            <PageHero
                eyebrow="Courses"
                title="Learn software by building real things"
                description="Practical courses in live online, recorded and in-person formats, built around real projects and taught with industry practice in mind."
            />
            <CoursesExplorer />
            <LearningPaths />
            <CourseBenefits />
            <Faq
                items={FAQS}
                eyebrow="FAQ"
                title="Questions, answered"
                description="Everything you might want to know before you enrol."
            />
            <Cta
                title="Ready to start learning?"
                description="Tell us what you want to learn. We'll email you the next start dates and help you pick the right path."
                primaryLabel="Talk to us"
                primaryHref="/contact"
                secondaryLabel="View our services"
                secondaryHref="/services"
            />
        </main>
    );
}