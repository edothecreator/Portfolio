"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, type Variants } from "framer-motion";

const bootLines = [
  { text: "[  OK  ] Starting portfolio service...", delay: 0 },
  { text: "[  OK  ] Loading user: edo@cloudstack", delay: 400 },
  { text: "[  OK  ] Mounting AWS credentials... done", delay: 800 },
  { text: "[  OK  ] Initializing Terraform state...", delay: 1200 },
  { text: "[  OK  ] Pulling Docker images... ✓", delay: 1600 },
  { text: "[  OK  ] All systems operational.", delay: 2000 },
  { text: "", delay: 2400 },
  { text: "> whoami", delay: 2600 },
  {
    text: 'Mohamed ELKHANFAF — Cloud & DevOps Engineer',
    delay: 2900,
    highlight: true,
  },
  { text: "", delay: 3100 },
  { text: "> cat /etc/skills", delay: 3300 },
  { text: "AWS · Terraform · Docker · K8s · CI/CD · Linux", delay: 3600 },
  { text: "", delay: 3800 },
  { text: "> uptime", delay: 4000 },
  { text: "4 years of engineering. ∞ curiosity.", delay: 4300 },
  { text: "", delay: 4500 },
  { text: "> ./launch_portfolio.sh", delay: 4700 },
];

// Compress the original ~5s timeline to ~2.5s (last line ≈ 2.1s)
const TIME_SCALE = 0.45;
const COMPLETE_AT = 2500;
const SKIP_VISIBLE_AT = 400;

// `custom` comes from the parent AnimatePresence: true = skipped boot, remove instantly
const overlayVariants: Variants = {
  exit: (instant: boolean) =>
    instant
      ? { opacity: 0, transition: { duration: 0 } }
      : { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

export default function BootSequence({
  onComplete,
}: {
  /** `instant` = boot was skipped (repeat visit / reduced motion); parent passes it
   *  back via AnimatePresence `custom` so the overlay exits without animation. */
  onComplete: (instant: boolean) => void;
}) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showSkip, setShowSkip] = useState(false);
  const doneRef = useRef(false);

  // Runs once: remember the boot for this tab session, then reveal the page
  const finish = useCallback(
    (instant = false) => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        sessionStorage.setItem("booted", "1");
      } catch {
        // storage unavailable (private mode etc.) — boot will just replay
      }
      onComplete(instant);
    },
    [onComplete]
  );

  useEffect(() => {
    // Browser-only checks live here to keep SSR and first client render identical
    let skip = false;
    try {
      skip = sessionStorage.getItem("booted") === "1";
    } catch {
      // ignore
    }
    if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish(true);
      return;
    }

    const skipNow = () => finish();

    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, index) => {
      timers.push(
        setTimeout(() => setVisibleLines(index + 1), Math.round(line.delay * TIME_SCALE))
      );
    });

    timers.push(setTimeout(() => setShowSkip(true), SKIP_VISIBLE_AT));
    timers.push(setTimeout(skipNow, COMPLETE_AT));

    window.addEventListener("keydown", skipNow);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skipNow);
    };
  }, [finish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-bg flex items-center justify-center p-4"
      variants={overlayVariants}
      exit="exit"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d1117] border-b border-border">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-muted text-xs font-mono">
              edo@cloudstack:~
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[360px] sm:min-h-[400px]">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`break-words ${
                  line.highlight
                    ? "text-primary font-semibold"
                    : line.text.startsWith(">")
                    ? "text-secondary"
                    : line.text.startsWith("[  OK  ]")
                    ? "text-text"
                    : "text-muted"
                } ${line.text === "" ? "h-3" : ""}`}
              >
                {line.text.startsWith("[  OK  ]") && (
                  <span className="text-secondary">[  OK  ]</span>
                )}
                {line.text.startsWith("[  OK  ]")
                  ? line.text.slice(8)
                  : line.text}
              </div>
            ))}
            {visibleLines > 0 && visibleLines < bootLines.length && (
              <span className="inline-block w-2 h-4 bg-secondary cursor-blink" />
            )}
          </div>
        </div>

        {/* Skip button (any key also skips) */}
        {showSkip && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => finish()}
            className="mt-4 text-muted text-xs font-mono hover:text-primary transition-colors block mx-auto"
          >
            [press any key to skip...]
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
