import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { WordsPullUpMultiStyle, FadeUp } from "../components/anim";

const FEATURE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";

type ProjectCard = {
  index: string;
  title: string;
  oneLiner: string;
  capabilities: string[];
  href: string;
};

const PROJECTS: ProjectCard[] = [
  {
    index: "01",
    title: "Org Roast.",
    oneLiner: "Audits your Salesforce org. Returns the findings as a rap diss.",
    capabilities: [
      "Real audit across metadata, Apex, security, automation, limits",
      "Gemini turns findings into a roast",
      "ElevenLabs reads it aloud — for the silence of Modify All Data",
      "Salesforce OAuth, runs on your localhost",
    ],
    href: "https://github.com/sdong101010/org-roast",
  },
  {
    index: "02",
    title: "Sea-cret Agent.",
    oneLiner:
      "Local meeting copilot. Hears the question, finds the answer, drops it in your sidebar.",
    capabilities: [
      "On-device transcription via Apple SpeechAnalyzer (macOS 26)",
      "Claude detects customer questions in real-time",
      "Web + Slack research → answer card on your second monitor",
      "Nothing leaves the laptop except the fetches it decides to do",
    ],
    href: "https://github.com/sdong101010/sea-cret-agent",
  },
  {
    index: "03",
    title: "Agentforce ↔ Teams.",
    oneLiner:
      "A Microsoft Teams bot that talks to a Salesforce Agentforce agent. End-to-end.",
    capabilities: [
      "Reference impl over /einstein/ai-agent/v1/* REST API",
      "OAuth client-credentials via External Client App",
      "Deployable SFDX bundle (agent + ECA + planner snapshots)",
      "Hand-it-to-a-teammate zip with node_modules pre-bundled",
    ],
    href: "#contact",
  },
];

const SECONDARY = [
  {
    title: "data360-demo-builder",
    blurb:
      "AE describes the customer. Skill builds the Data 360 demo. The honesty gate refuses to bake numbers it can't defend.",
  },
  {
    title: "rfp-loop",
    blurb:
      "Submit RFP in Slack. Get a drafted sheet back. Pure laptop infrastructure.",
  },
  {
    title: "claude-update-all",
    blurb:
      "Daily cron that updates Claude Code, plugins, skills, Homebrew, sf CLI, uv. One job.",
  },
  {
    title: "se-daily-audit",
    blurb:
      "8 AM Slack thread. Reconciles your week. Replies become Salesforce writes.",
  },
];

function CardEnter({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="projects"
      className="relative min-h-screen bg-ink py-24 md:py-32 px-5 md:px-12 overflow-hidden"
    >
      {/* Subtle bg-noise overlay */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      {/* Decorative slash bands */}
      <div
        className="absolute slash"
        style={{
          top: "12%",
          left: "-6%",
          width: "44%",
          height: "26px",
          transform: "skewY(-3deg) rotate(-2deg)",
          opacity: 0.6,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <FadeUp>
            <span className="inline-block font-display tracking-[0.32em] text-red-soft text-[10px] sm:text-xs md:text-sm uppercase mb-6">
              // Capability cards
            </span>
          </FadeUp>
          <div className="space-y-2">
            <WordsPullUpMultiStyle
              className="text-paper text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-normal max-w-3xl !justify-start"
              segments={[
                {
                  text: "Studio-grade workflows for shipping things that hold up under real data.",
                  className: "text-paper",
                },
              ]}
            />
            <WordsPullUpMultiStyle
              className="text-cream/60 text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic max-w-3xl !justify-start"
              delay={0.3}
              segments={[
                {
                  text: "Built for pure capability. Powered by AI*.",
                  className: "",
                },
              ]}
            />
          </div>
        </div>

        {/* 4-column grid: video card + 3 project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 — video */}
          <CardEnter
            index={0}
            className="relative rounded-2xl overflow-hidden bg-[#212121] aspect-video lg:aspect-auto lg:h-full border-2 border-paper/20"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={FEATURE_VIDEO} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <span className="block font-display tracking-[0.28em] text-red-soft text-[10px] uppercase mb-2">
                // Discovery
              </span>
              <h3
                className="font-serif italic text-2xl md:text-3xl text-paper leading-tight"
                style={{ color: "#E1E0CC" }}
              >
                Your creative canvas.
              </h3>
              <p className="mt-2 text-cream/70 text-xs md:text-sm font-sans leading-snug">
                A real demo, drawn against your data, before the slide deck
                loads.
              </p>
            </div>
          </CardEnter>

          {/* Cards 2-4 — project cards */}
          {PROJECTS.map((proj, i) => (
            <CardEnter
              key={proj.index}
              index={i + 1}
              className="relative rounded-2xl overflow-hidden bg-[#212121] p-5 md:p-6 flex flex-col border-2 border-paper/15 hover:border-red-soft transition-colors"
            >
              {/* Number chip */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="inline-block font-display tracking-[0.18em] text-ink text-[10px] uppercase bg-red px-2 py-0.5 font-bold"
                  style={{ transform: "skewX(-12deg)" }}
                >
                  <span
                    className="inline-block"
                    style={{ transform: "skewX(12deg)" }}
                  >
                    {proj.index}
                  </span>
                </span>
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-red flex items-center justify-center"
                  style={{
                    clipPath:
                      "polygon(0 28%, 30% 0, 70% 0, 100% 28%, 88% 70%, 50% 100%, 12% 70%)",
                  }}
                  aria-hidden
                >
                  <span className="font-display text-paper text-lg">●</span>
                </div>
              </div>

              <h3 className="font-serif italic text-2xl md:text-3xl text-paper leading-tight mb-2">
                {proj.title}
              </h3>
              <p className="text-cream/70 text-xs md:text-sm font-sans leading-snug mb-5">
                {proj.oneLiner}
              </p>

              <ul className="space-y-2 flex-1">
                {proj.capabilities.map((cap, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-cream/85 text-xs md:text-sm font-sans"
                  >
                    <Check
                      className="w-4 h-4 text-red-soft mt-0.5 flex-shrink-0"
                      strokeWidth={2.5}
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>

              <a
                href={proj.href}
                rel="noopener"
                target={proj.href.startsWith("http") ? "_blank" : undefined}
                className="mt-5 inline-flex items-center gap-2 group font-display tracking-[0.22em] text-red-soft text-[10px] md:text-xs uppercase hover:text-paper transition-colors"
              >
                Learn more
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  style={{ transform: "rotate(-45deg)" }}
                />
              </a>
            </CardEnter>
          ))}
        </div>

        {/* Secondary row — more in the lab */}
        <div className="mt-16 md:mt-20">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display tracking-[0.32em] text-cream/60 text-[10px] sm:text-xs md:text-sm uppercase">
                // More in the lab
              </span>
              <div className="h-px flex-1 bg-paper/20" />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {SECONDARY.map((item, i) => (
              <CardEnter
                key={item.title}
                index={i}
                className="relative bg-[#161616] border-2 border-paper/15 rounded-xl p-4 md:p-5 hover:border-red-soft transition-colors"
              >
                <h4 className="font-mono text-paper text-sm md:text-base font-bold tracking-wider mb-2">
                  {item.title}
                </h4>
                <p className="text-cream/65 text-xs md:text-sm font-sans leading-snug">
                  {item.blurb}
                </p>
              </CardEnter>
            ))}
          </div>
        </div>

        {/* Footer / contact */}
        <FadeUp delay={0.2} className="mt-24 md:mt-32 text-center">
          <div id="contact" />
          <span className="block font-display tracking-[0.32em] text-red-soft text-[10px] sm:text-xs md:text-sm uppercase mb-4">
            // Reach out
          </span>
          <p className="font-serif italic text-paper text-2xl sm:text-3xl md:text-4xl max-w-2xl mx-auto leading-tight">
            Need careful discovery, considered architecture, or a demo that
            holds up under real data?
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 font-display tracking-[0.22em] text-xs md:text-sm uppercase text-cream/80">
            <li>
              <a
                href="mailto:sea.dong@salesforce.com"
                className="border-b border-paper/30 hover:text-red-soft hover:border-red-soft transition-colors pb-0.5"
              >
                sea.dong@salesforce.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/seadong"
                rel="noopener"
                target="_blank"
                className="border-b border-paper/30 hover:text-red-soft hover:border-red-soft transition-colors pb-0.5"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sdong101010"
                rel="noopener"
                target="_blank"
                className="border-b border-paper/30 hover:text-red-soft hover:border-red-soft transition-colors pb-0.5"
              >
                GitHub
              </a>
            </li>
          </ul>
          <p className="mt-12 font-mono text-[10px] tracking-widest uppercase text-cream/45">
            © Sea Dong, 2026 · No coasters were harmed.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
