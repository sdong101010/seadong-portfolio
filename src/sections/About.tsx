import {
  WordsPullUpMultiStyle,
  ScrollRevealParagraph,
  FadeUp,
} from "../components/anim";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-ink py-24 md:py-36 px-5 md:px-12"
    >
      {/* Decorative slash band — quiet, single, off-axis */}
      <div
        className="absolute slash"
        style={{
          top: "8%",
          right: "-4%",
          width: "32%",
          height: "30px",
          transform: "skewY(-2deg) rotate(-2deg)",
          opacity: 0.85,
        }}
      />

      <div
        className="relative bg-[#101010] mx-auto max-w-6xl rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-16 text-center border-2 border-paper"
        style={{ boxShadow: "10px 10px 0 var(--red)" }}
      >
        <FadeUp>
          <span className="font-display tracking-[0.32em] text-red-soft text-[10px] sm:text-xs md:text-sm uppercase">
            // Forward-deployed
          </span>
        </FadeUp>

        <div className="mt-6 md:mt-10">
          <WordsPullUpMultiStyle
            className="text-paper text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
            segments={[
              {
                text: "I am Sea Dong,",
                className: "font-sans font-normal text-paper",
              },
              {
                text: "a self-taught architect.",
                className: "italic font-serif font-normal text-red-soft",
              },
              {
                text: "I have skills in discovery, demos, and shipping the boring middle.",
                className: "font-sans font-normal text-paper",
              },
            ]}
          />
        </div>

        <div className="mt-10 md:mt-14 max-w-2xl mx-auto">
          <ScrollRevealParagraph
            className="text-cream text-sm sm:text-base md:text-lg font-sans leading-relaxed"
            text="Over the last seven-ish years I've worked at Fast Enterprises on government data systems, at C3.ai on enterprise AI before the wave, and now at Salesforce as a Principal Solutions Engineer covering Data Cloud, Agentforce, and the connective tissue between them. The shape of the work has stayed the same: listen carefully, draw the architecture, demo against the real data, ship the boring middle that makes the rest possible."
          />
        </div>

        <FadeUp delay={0.4} className="mt-12 md:mt-16">
          <div className="inline-flex flex-wrap items-center gap-x-6 gap-y-3 font-display tracking-[0.22em] text-xs md:text-sm uppercase text-cream/80">
            <span>UMich</span>
            <span className="text-red-soft">↦</span>
            <span>Fast Enterprises</span>
            <span className="text-red-soft">↦</span>
            <span>C3.ai</span>
            <span className="text-red-soft">↦</span>
            <span className="text-paper">Salesforce</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
