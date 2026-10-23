import type { Metadata } from "next";
import Link from "next/link";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import { SectionLabel } from "@/components/ui";
import { CHAT_LIMITS } from "@/lib/chat/config";

export const metadata: Metadata = {
  title: "Privacy Policy — Marco Ruslie",
  description: "How this portfolio site and its ask_marco chat handle your data.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "October 23, 2026";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Overview",
    body: (
      <p>
        This is the personal portfolio of Marco Ruslie. It has no accounts, no sign-ups, no
        advertising, and no analytics or tracking scripts. It does not set cookies. This page
        explains the small amount of data that is processed when you visit or use the chat.
      </p>
    ),
  },
  {
    title: "Browsing the site",
    body: (
      <p>
        The site is hosted on Vercel. Like any web host, Vercel processes basic request
        information (such as your IP address, browser user agent, and the pages requested) to
        deliver the site and keep it secure. Fonts are served from this site itself, so no
        request is made to Google or other font providers.
      </p>
    ),
  },
  {
    title: "The ask_marco chat",
    body: (
      <>
        <p>If you use the chat widget, the following happens:</p>
        <ul>
          <li>
            The messages in your conversation are sent to OpenAI to generate a reply. They are
            not stored by this site after the reply is sent.
          </li>
          <li>
            Your IP address is used as a key for rate limiting (up to{" "}
            {CHAT_LIMITS.rateLimitPerHour} messages per hour) through Upstash Redis. These
            counters expire on their own and are not linked to anything else about you.
          </li>
          <li>
            The conversation lives only in your browser tab and disappears when you close or
            reload the page.
          </li>
        </ul>
        <p>
          OpenAI processes API data under its own policies, which state that API data is not used
          to train its models by default and may be retained for a limited period for abuse
          monitoring. Please don&apos;t share sensitive personal information in the chat.
        </p>
      </>
    ),
  },
  {
    title: "Third-party services",
    body: (
      <ul>
        <li>
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel
          </a>{" "}
          — hosting
        </li>
        <li>
          <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">
            OpenAI
          </a>{" "}
          — chat replies
        </li>
        <li>
          <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noopener noreferrer">
            Upstash
          </a>{" "}
          — chat rate limiting
        </li>
      </ul>
    ),
  },
  {
    title: "Contacting me",
    body: (
      <p>
        If you email me or reach out through GitHub or LinkedIn, I&apos;ll use your details only
        to reply. For any question about this policy, or to ask about data relating to you,
        email <a href="mailto:albertus0191@gmail.com">albertus0191@gmail.com</a>.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        If the site changes how it handles data, this page will be updated and the date below
        will change.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Cursor />
      <Background />
      <main className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 pt-24 pb-20">
        <Link
          href="/"
          className="inline-block mb-12 font-tech text-[0.75rem] text-muted tracking-widest hover:text-accent transition-colors"
        >
          ← Back to MR.dev
        </Link>

        <SectionLabel>Legal</SectionLabel>
        <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="font-tech text-[0.75rem] text-muted tracking-widest mb-14">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold text-slate-100 mb-4">{s.title}</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-accent [&_a:hover]:underline">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
