import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WordsPullUp, FadeUp } from "../components/anim";

const NAV_ITEMS = ["Projects", "About", "Contact"];

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

export default function Hero() {
  return (
    <section className="h-screen w-full p-3 md:p-5 relative">
      <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-[2rem] border-[3px] border-paper">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.6] mix-blend-overlay pointer-events-none" />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 pointer-events-none" />

        {/* P5 red diagonal slash bands */}
        <div
          className="absolute slash slash-shadow"
          style={{
            top: "26%",
            left: "-8%",
            width: "62%",
            height: "78px",
            transform: "skewY(-4deg) rotate(-3deg)",
          }}
        />
        <div
          className="absolute slash"
          style={{
            top: "62%",
            right: "-10%",
            width: "48%",
            height: "44px",
            transform: "skewY(-3deg) rotate(-2deg)",
            background: "var(--red-deep)",
          }}
        />

        {/* Navbar — black pill hanging from top edge */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-ink rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 md:py-3 border-x-2 border-b-2 border-paper">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 font-display tracking-[0.18em] text-[10px] sm:text-xs md:text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="uppercase transition-colors"
                    style={{ color: "rgba(241, 234, 217, 0.78)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--red-soft)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "rgba(241, 234, 217, 0.78)")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Top-left mark */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-20 flex items-center gap-3"
        >
          <span
            className="block w-8 h-8 md:w-10 md:h-10 bg-red"
            style={{
              clipPath:
                "polygon(0 28%, 30% 0, 70% 0, 100% 28%, 88% 70%, 50% 100%, 12% 70%)",
              boxShadow: "3px 3px 0 var(--ink), 3px 3px 0 5px var(--paper)",
              transform: "rotate(-6deg)",
            }}
            aria-hidden
          />
          <span className="font-display tracking-[0.22em] text-paper text-xs md:text-sm uppercase">
            sea.dong
          </span>
        </motion.div>

        {/* Top-right tagline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-6 right-6 md:top-8 md:right-10 z-20 hidden sm:block"
        >
          <span className="font-display tracking-[0.18em] text-cream text-[10px] md:text-xs uppercase">
            Data · AI · Architecture{" "}
            <i
              className="not-italic inline-block px-2 py-0.5 ml-1 bg-red text-ink font-bold"
              style={{ transform: "skewX(-12deg)" }}
            >
              <em
                className="not-italic inline-block"
                style={{ transform: "skewX(12deg)" }}
              >
                v2026.6
              </em>
            </i>
          </span>
        </motion.div>

        {/* Hero content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-12 pb-10 md:pb-14">
          <div className="grid grid-cols-12 gap-4 md:gap-8 items-end">
            {/* Wordmark — left 8 cols */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-display font-medium leading-[0.85] tracking-[-0.04em] text-paper relative"
                style={{ fontSize: "clamp(72px, 22vw, 320px)" }}
              >
                <WordsPullUp text="sea.dong" />
              </h1>
              <FadeUp
                delay={0.55}
                className="mt-3 md:mt-5 font-display tracking-[0.22em] text-cream text-xs md:text-sm uppercase"
              >
                Principal Data &amp; AI Architect at Salesforce.
              </FadeUp>
            </div>

            {/* Right column — body + CTA */}
            <div className="col-span-12 lg:col-span-4 lg:pb-8">
              <FadeUp
                delay={0.65}
                className="text-paper/80 text-sm md:text-base font-sans leading-snug max-w-md"
              >
                I architect enterprise data and agentic experiences, and
                build the tools my team uses to win.
              </FadeUp>

              <FadeUp delay={0.85} className="mt-6">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="group inline-flex items-center gap-2 hover:gap-3 transition-all bg-paper text-ink font-display tracking-[0.2em] text-sm md:text-base uppercase pl-5 pr-1.5 py-1.5 rounded-full"
                  style={{ boxShadow: "4px 4px 0 var(--red)" }}
                >
                  Learn more
                  <span className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-ink rounded-full transition-transform group-hover:scale-110">
                    <ArrowRight
                      className="w-4 h-4 md:w-5 md:h-5 text-paper"
                      strokeWidth={2.5}
                    />
                  </span>
                </a>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* Bottom-left scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-4 left-5 md:left-12 z-10 font-mono text-[10px] md:text-xs text-cream/70 uppercase tracking-widest hidden md:block"
        >
          ↓ Scroll
        </motion.div>
      </div>
    </section>
  );
}
