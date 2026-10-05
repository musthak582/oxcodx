import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ContactSection } from "@/components/sections/contact-section";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { topics, type Topic } from "@/lib/validations/enquiry";

export const metadata: Metadata = {
    title: "Contact — OxCodx",
    description:
        "Get in touch with OxCodx about software projects, courses or careers. We reply within one business day.",
};

// PLACEHOLDER answers. Edit to match how you really work.
const FAQS: FaqItem[] = [
    {
        q: "What should I include in my message?",
        a: "A short description of what you need, any deadlines, and the best way to reach you. The more context you give, the more useful our first reply will be.",
    },
    {
        q: "Do you work with small businesses and startups?",
        a: "Yes. We work with businesses of all sizes. Tell us about your project and we'll suggest a sensible place to start.",
    },
    {
        q: "How much does a project cost?",
        a: "It depends on the scope. After your enquiry we'll ask a few questions and come back with a clear estimate.",
    },
    {
        q: "Can I ask about a course or a job here too?",
        a: "Yes. Choose Course or Careers in the topic menu and we'll see it in the email subject line.",
    },
];

export default async function ContactPage({
    searchParams,
}: {
    searchParams: Promise<{ topic?: string }>;
}) {
    const { topic } = await searchParams;
    const initialTopic: Topic = topics.includes(topic as Topic) ? (topic as Topic) : "general";

    return (
        <main>
            <PageHero
                eyebrow="Contact us"
                title="Let's talk about your next project"
                description="Questions, ideas or a full brief. Send us a message and we'll reply by email within one business day."
            />
            <ContactSection topic={initialTopic} />
            <Faq
                items={FAQS}
                eyebrow="FAQ"
                title="Before you write"
                description="A few quick answers to the questions we hear most."
            />
        </main>
    );
}