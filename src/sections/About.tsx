import { WordsPullUpMultiStyle, FadeUp } from "../components/anim";

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
          top: "3%",
          right: "-4%",
          width: "32%",
          height: "30px",
          transform: "skewY(-2deg) rotate(-2deg)",
          opacity: 0.85,
        }}
      />

      <div
        id="contact"
        className="relative bg-[#101010] mx-auto max-w-6xl rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-16 text-center border-2 border-paper"
        style={{ boxShadow: "10px 10px 0 var(--red)" }}
      >
        <FadeUp>
          <span className="font-display tracking-[0.32em] text-red-soft text-[10px] sm:text-xs md:text-sm uppercase">
            // Data · AI · Architecture · Reach out
          </span>
        </FadeUp>

        <div className="mt-6 md:mt-10">
          <WordsPullUpMultiStyle
            className="text-paper text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
            segments={[
              {
                text: "Engineer in the room with the salespeople. Salesperson in the room with the engineers.",
                className: "italic font-serif font-normal text-red-soft",
              },
            ]}
          />
        </div>

        <FadeUp delay={0.3} className="mt-10 md:mt-14 max-w-2xl mx-auto">
          <p className="text-cream/85 text-sm sm:text-base md:text-lg font-sans leading-relaxed text-left sm:text-center">
            Ten-plus years getting enterprise software actually deployed.
            Lead at Fast Enterprises — five production go-lives. Senior at
            C3.ai — built and shipped predictive models at scale. Now at
            Salesforce — won the technical eval on Fortune 100 deals,
            delivered the demos that ranked Salesforce #1 of 10+ vendors in
            Forrester Wave, built AI tools my team uses to win their deals.
          </p>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-12 md:mt-16">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-display tracking-[0.22em] text-[10px] md:text-xs uppercase text-cream/80">
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
        </FadeUp>
      </div>

      <FadeUp delay={0.6} className="mt-12 md:mt-16 text-center">
        <p className="font-mono text-[10px] tracking-widest uppercase text-cream/45">
          © Sea Dong, 2026 · No agents were harmed in the making of this site.
        </p>
      </FadeUp>
    </section>
  );
}
