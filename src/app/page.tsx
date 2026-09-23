"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import Hero from "@/components/Hero";
import SkillsMatrix from "@/components/SkillsMatrix";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";

const navLinks = [
  { label: "skills",    href: "#skills"    },
  { label: "projects",  href: "#projects"  },
  { label: "about",     href: "#about"     },
  { label: "contact",   href: "#contact"   },
];

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <main className="relative">
      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* ── Navigation ── */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
            <span className="font-mono text-sm text-primary font-semibold">
              edo<span className="text-muted">@</span>cloudstack
            </span>

            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs text-muted hover:text-primary transition-colors"
                >
                  ./{link.label}
                </a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block w-5 h-0.5 bg-primary rounded-full origin-center"
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-primary rounded-full"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-primary rounded-full origin-center"
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="sm:hidden overflow-hidden border-t border-border/40 bg-bg/95 backdrop-blur-md"
              >
                <div className="flex flex-col px-4 py-3 gap-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setMenuOpen(false)}
                      className="font-mono text-sm text-muted hover:text-primary transition-colors py-2 border-b border-border/20 last:border-0"
                    >
                      <span className="text-secondary text-xs mr-1">./</span>{link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <Hero />
        <SkillsMatrix />
        <Projects />
        <Terminal />
        <Contact />
      </motion.div>
    </main>
  );
}
