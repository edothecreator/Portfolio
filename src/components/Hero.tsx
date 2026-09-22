"use client";

import { motion } from "framer-motion";
import GeneratedAvatar from "./GeneratedAvatar";

const architectureDiagram = `┌──────────────┐        ┌─────────────────┐
│   Route 53   │───────▶│   CloudFront    │
└──────────────┘        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │   ALB (HTTPS)   │
                        └──┬──────────┬───┘
                           │          │
                    ┌──────▼──┐  ┌────▼───────┐
                    │ EC2 AZ1 │  │  EC2 AZ2   │
                    └──────┬──┘  └────┬───────┘
                           │          │
                    ┌──────▼──────────▼───────┐
                    │     RDS Multi-AZ        │
                    └─────────────────────────┘`;

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 relative overflow-hidden"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* Top section: Avatar + Name */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-2">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="relative shrink-0"
          >
            {/* 
              Replace GeneratedAvatar with an <Image> tag pointing to your real photo:
              <Image src="/pfp.jpg" alt="Edo" width={120} height={120} className="rounded-full" />
            */}
            <GeneratedAvatar className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32" />
            {/* Scanline overlay effect */}
            <div className="absolute inset-0 rounded-full pointer-events-none opacity-20"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)'
              }}
            />
          </motion.div>

          {/* Name + subtitle */}
          <div>
            <h1 className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold text-text">
              Mohamed{" "}
              <span className="text-primary">&quot;Edo&quot;</span>{" "}
              ELKHANFAF
            </h1>
            {/* Subtitle with blinking cursor */}
            <p className="font-mono text-xl sm:text-2xl text-muted mt-3 flex items-center gap-1">
              <span className="text-secondary">$</span> Cloud & DevOps Engineer
              <span className="inline-block w-2.5 h-5 bg-primary cursor-blink" />
            </p>
          </div>
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-10 lg:mt-14"
        >
          <p className="font-mono text-xs text-muted mb-3">
            <span className="text-secondary">#</span> aws_architecture.tf — production 3-tier VPC
          </p>
          <div className="relative bg-surface border border-border rounded-lg p-4 sm:p-6 overflow-x-auto">
            <pre className="font-mono text-[10px] sm:text-xs text-primary/80 leading-relaxed whitespace-pre">
              {architectureDiagram}
            </pre>
            {/* Pulsing status dots */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary status-active" />
              <span className="font-mono text-[10px] text-secondary">HEALTHY</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group font-mono text-sm border border-primary/50 text-primary px-5 py-2.5 rounded hover:bg-primary/10 transition-all duration-300 hover:border-primary"
          >
            <span className="text-muted group-hover:text-primary">$</span>{" "}
            ./view_projects.sh
          </a>
          <a
            href="/resume.pdf"
            download
            className="group font-mono text-sm border border-secondary/50 text-secondary px-5 py-2.5 rounded hover:bg-secondary/10 transition-all duration-300 hover:border-secondary"
          >
            <span className="text-muted group-hover:text-secondary">$</span>{" "}
            cat resume.pdf
          </a>
          <a
            href="#contact"
            className="group font-mono text-sm border border-accent/50 text-accent px-5 py-2.5 rounded hover:bg-accent/10 transition-all duration-300 hover:border-accent"
          >
            <span className="text-muted group-hover:text-accent">$</span>{" "}
            ssh contact@edo.dev
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
