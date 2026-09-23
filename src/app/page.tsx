"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import Hero from "@/components/Hero";
import SkillsMatrix from "@/components/SkillsMatrix";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";

export default function Home() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <main className="relative">
      {/* Boot sequence overlay */}
      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
            <span className="font-mono text-sm text-primary font-semibold">
              edo<span className="text-muted">@</span>cloudstack
            </span>
            <div className="hidden sm:flex items-center gap-6">
              {[
                { label: "skills", href: "#skills" },
                { label: "projects", href: "#projects" },
                { label: "about", href: "#about" },
                { label: "contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs text-muted hover:text-primary transition-colors"
                >
                  ./{link.label}
                </a>
              ))}
            </div>
            {/* Mobile menu */}
            <div className="sm:hidden">
              <a
                href="#contact"
                className="font-mono text-xs text-primary border border-primary/30 px-3 py-1 rounded hover:bg-primary/10 transition-colors"
              >
                connect
              </a>
            </div>
          </div>
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
