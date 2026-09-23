"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    bootLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    // Show skip button after 1s
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    timers.push(skipTimer);

    // Complete after last line
    const completeTimer = setTimeout(onComplete, 5200);
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-bg flex items-center justify-center p-4"
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
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

          {/* Skip button */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onComplete}
              className="mt-4 text-muted text-xs font-mono hover:text-primary transition-colors block mx-auto"
            >
              [press any key to skip...]
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
