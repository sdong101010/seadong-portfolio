import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { FadeUp, ScrollScrubHeadline } from "../components/anim";

const FEATURE_VIDEO = "/discovery.mp4";

type ProjectCard = {
  index: string;
  title: string;
  oneLiner: string;
  capabilities: string[];
  href: string;
  archHref?: string;
};

const PROJECTS: ProjectCard[] = [
  {
    index: "01",
    title: "Sea-cret Agent.",
    oneLiner:
      "Sits on your second monitor during customer calls — spots their questions and quietly answers them while you talk.",
    capabilities: [
      "Transcribes the meeting on your Mac — no audio leaves your laptop",
      "Claude flags real questions in real time (and ignores small talk)",
      "Researches the web and your Slack, drops answer cards as you talk",
    ],
    href: "https://github.com/sdong101010/sea-cret-agent",
    archHref: "https://sdong101010.github.io/sea-cret-agent/architecture.html",
  },
  {
    index: "02",
    title: "RFP Autopilot.",
    oneLiner:
      "Paste a Google Sheet. Chat with an agent. Get a source-cited draft, row by row.",
    capabilities: [
      "Watch it think live — assistant deltas, tool calls, citations stream in",
      "Every answer is staged for your approval before it lands in a cell",
      "Hosted on Heroku — no scratch orgs, no Slack setup, just paste a sheet",
    ],
    href: "https://rfp-agent-1125-971aa9be0486.herokuapp.com/",
    archHref: "https://rfp-agent-1125-971aa9be0486.herokuapp.com/architecture",
  },
  {
    index: "03",
    title: "Tailor.",
    oneLiner:
      "Describe a customer. Tailor builds them a working demo — and refuses to invent a single number it can't back up.",
    capabilities: [
      "Asks the right questions, drafts a story, waits for sign-off before building",
      "Builds against a live org",
      "Stands up the CRM and data pieces in parallel, not one at a time",
    ],
    href: "#contact",
  },
];

const SECONDARY: ProjectCard[] = [
  {
    index: "04",
    title: "Agentforce ↔ Teams.",
    oneLiner:
      "A Microsoft Teams chatbot wired to a Salesforce Agentforce agent. Login, state, streaming — all working, all yours to fork.",
    capabilities: [
      "Reference build using Salesforce's Agentforce REST API",
      "Handles login, conversation state, and message streaming",
      "Hosted on Heroku — any Salesforce employee can use it from the browser, no install",
    ],
    href: "https://agentforce-demo-teams-641f8eb191e5.herokuapp.com/how-it-works",
    archHref: "https://agentforce-demo-teams-641f8eb191e5.herokuapp.com/how-it-works",
  },
  {
    index: "05",
    title: "Tool Tender.",
    oneLiner:
      "A janitor for my Claude toolchain. Wakes up at 7:30 every morning and updates everything before I do.",
    capabilities: [
      "Updates the CLI, plugins, skills, and supporting tools — every piece on its own",
      "One thing breaking doesn't stop the rest from updating",
      "Ships as a skill so Claude itself knows when to run it",
    ],
    href: "https://github.com/sdong101010/claude-update-all",
  },
  {
    index: "06",
    title: "Daily Reckoning.",
    oneLiner:
      "Every weekday at 8 AM, Slack pings me with anything I forgot to log to Salesforce.",
    capabilities: [
      "Cross-checks my calendar, Slack DMs, and Salesforce activity for gaps",
      "Reply 'y' or 'y except 4,7' in the thread — it logs the rest for you",
      "Three modes: dry-run, semi-auto, fully hands-off",
    ],
    href: "https://github.com/sdong101010/se-daily-audit",
    archHref: "https://sdong101010.github.io/se-daily-audit/architecture.html",
  },
  {
    index: "07",
    title: "Org Roast.",
    oneLiner:
      "Audits your Salesforce org and roasts the findings as a rap diss track.",
    capabilities: [
      "Real audit — checks security, code quality, and config sprawl",
      "Gemini writes the rap; ElevenLabs reads it out loud",
      "Logs in with your Salesforce account, runs on your laptop",
    ],
    href: "https://sdong101010.github.io/org-roast/",
  },
];

function ProjectCardItem({ proj, i }: { proj: ProjectCard; i: number }) {
  return (
    <CardEnter
      index={i}
      tilt
      className="group relative rounded-2xl overflow-hidden bg-[#212121] p-5 md:p-6 flex flex-col border-2 border-paper/15 hover:border-red-soft transition-colors"
    >
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

      {(() => {
        const ctaHref = proj.archHref ?? proj.href;
        const ctaLabel = proj.archHref ? "View architecture" : "Learn more";
        return (
          <a
            href={ctaHref}
            rel="noopener"
            target={ctaHref.startsWith("http") ? "_blank" : undefined}
            className="mt-5 inline-flex items-center gap-2 group font-display tracking-[0.22em] text-red-soft text-[10px] md:text-xs uppercase hover:text-paper transition-colors"
          >
            {ctaLabel}
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2.5}
              style={{ transform: "rotate(-45deg)" }}
            />
          </a>
        );
      })()}
    </CardEnter>
  );
}

function CardEnter({
  children,
  index,
  className = "",
  tilt = false,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // 3D tilt-on-hover (skipped for non-tilt cards e.g. the video card)
  const mx = useMotionValue(0); // -0.5..0.5
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [8, -8]); // tilt right when cursor on right
  const rotateX = useTransform(sy, [-0.5, 0.5], [-8, 8]); // tilt up when cursor on top
  const sheen = useTransform(
    [sx, sy] as never,
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(229,57,53,0.18), transparent 60%)`,
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    if (!tilt) return;
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, scale: 0.96, opacity: 0, rotate: -1.5 }}
      animate={
        inView
          ? { y: 0, scale: 1, opacity: 1, rotate: 0 }
          : { y: 40, scale: 0.96, opacity: 0, rotate: -1.5 }
      }
      transition={{
        delay: index * 0.16,
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={
        tilt
          ? {
              perspective: 900,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      className={className}
    >
      {tilt ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: sheen, mixBlendMode: "screen" }}
          />
          <div className="relative z-10 flex flex-col h-full">{children}</div>
        </>
      ) : (
        children
      )}
    </motion.div>
  );
}

function DiscoveryVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = 0.6;
    const lock = () => {
      v.playbackRate = 0.6;
    };
    v.addEventListener("ratechange", lock);
    v.addEventListener("play", lock);
    return () => {
      v.removeEventListener("ratechange", lock);
      v.removeEventListener("play", lock);
    };
  }, []);
  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    >
      <source src={FEATURE_VIDEO} type="video/mp4" />
    </video>
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
          top: "4%",
          left: "-6%",
          width: "44%",
          height: "26px",
          transform: "skewY(-3deg) rotate(-2deg)",
          opacity: 0.6,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <FadeUp>
            <span className="inline-block font-display tracking-[0.32em] text-red-soft text-[10px] sm:text-xs md:text-sm uppercase mb-6">
              // Projects
            </span>
          </FadeUp>
          <ScrollScrubHeadline
            className="space-y-2 max-w-3xl"
            lines={[
              {
                text: "The tools I built to ship the technical win.",
                className:
                  "text-paper text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-normal leading-tight",
              },
              {
                text: "Built for pure capability.",
                className:
                  "text-cream/60 text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic leading-tight",
              },
            ]}
          />
        </div>

        {/* 4-column grid: video card + 3 project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 — video */}
          <CardEnter
            index={0}
            className="relative rounded-2xl overflow-hidden bg-[#212121] aspect-video lg:aspect-auto lg:h-full border-2 border-paper/20"
          >
            <DiscoveryVideo />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
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
            <ProjectCardItem key={proj.index} proj={proj} i={i + 1} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
            {SECONDARY.map((proj, i) => (
              <ProjectCardItem key={proj.index} proj={proj} i={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
