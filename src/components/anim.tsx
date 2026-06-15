import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ---------- WordsPullUp ---------- */

type WordsPullUpProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  showAsterisk?: boolean;
  asteriskClassName?: string;
};

export function WordsPullUp({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  showAsterisk = false,
  asteriskClassName = "",
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={{ overflow: "visible" }}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span
            key={`${word}-${i}`}
            className="relative inline-block overflow-visible mr-[0.18em] last:mr-0"
          >
            <motion.span
              className="inline-block"
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{
                delay: delay + i * stagger,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {showAsterisk && isLast && (
                <span
                  className={`absolute top-[0.1em] -right-[0.35em] text-[0.31em] ${asteriskClassName}`}
                  aria-hidden="true"
                >
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/* ---------- WordsPullUpMultiStyle ---------- */

export type Segment = { text: string; className?: string };

type MultiProps = {
  segments: Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
};

export function WordsPullUpMultiStyle({
  segments,
  className = "",
  delay = 0,
  stagger = 0.08,
}: MultiProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  // flatten to (word, segmentClass) tuples preserving order
  const flat: { word: string; cls?: string }[] = [];
  segments.forEach((seg) => {
    seg.text
      .split(" ")
      .filter(Boolean)
      .forEach((word) => flat.push({ word, cls: seg.className }));
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {flat.map(({ word, cls }, i) => (
        <span
          key={`${word}-${i}`}
          className="relative inline-block overflow-visible mr-[0.22em]"
        >
          <motion.span
            className={`inline-block ${cls ?? ""}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ---------- AnimatedLetter (scroll-linked opacity) ---------- */

function AnimatedLetter({
  ch,
  progress,
  charProgress,
}: {
  ch: string;
  progress: MotionValue<number>;
  charProgress: number;
}) {
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1],
  );
  return (
    <motion.span style={{ opacity }} className="inline">
      {ch === " " ? " " : ch}
    </motion.span>
  );
}

type ScrollRevealProps = {
  text: string;
  className?: string;
};

export function ScrollRevealParagraph({
  text,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const total = text.length;

  return (
    <p ref={ref} className={className}>
      {text.split("").map((ch, i) => (
        <AnimatedLetter
          key={i}
          ch={ch}
          progress={scrollYProgress}
          charProgress={i / total}
        />
      ))}
    </p>
  );
}

/* ---------- Generic FadeUp ---------- */

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 20,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ y, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
