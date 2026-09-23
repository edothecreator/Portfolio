"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ─── Floating particles emitted around the badge ─────────────────── */
const PARTICLES = [
  { size: 3,  x: "10%",  y: "20%", dur: "3.2s", delay: "0s"    },
  { size: 2,  x: "80%",  y: "15%", dur: "4.1s", delay: "0.7s"  },
  { size: 4,  x: "90%",  y: "60%", dur: "3.7s", delay: "1.2s"  },
  { size: 2,  x: "15%",  y: "75%", dur: "4.5s", delay: "0.3s"  },
  { size: 3,  x: "55%",  y: "85%", dur: "3.0s", delay: "1.8s"  },
  { size: 2,  x: "5%",   y: "50%", dur: "4.8s", delay: "2.1s"  },
  { size: 3,  x: "70%",  y: "30%", dur: "3.4s", delay: "0.9s"  },
  { size: 2,  x: "40%",  y: "5%",  dur: "5.0s", delay: "1.5s"  },
];

/* ─── Rotating dashed orbit ring (pure CSS + Framer) ──────────────── */
function OrbitRing({
  radius,
  dashArray,
  color,
  opacity = 0.3,
  reverse = false,
  duration = 12,
}: {
  radius: number;
  dashArray: string;
  color: string;
  opacity?: number;
  reverse?: boolean;
  duration?: number;
}) {
  const size = radius * 2 + 8;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray={dashArray}
        strokeOpacity={opacity}
      />
      {/* Small glowing node travelling the ring */}
      <circle
        cx={size / 2}
        cy={size / 2 - radius}
        r="3"
        fill={color}
        opacity={opacity * 2.5}
        filter="url(#node-blur)"
      />
    </motion.svg>
  );
}

/* ─── Corner scan-line that sweeps the badge vertically ──────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-20"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.6) 50%, transparent 100%)",
      }}
      initial={{ top: "0%", opacity: 0 }}
      animate={{ top: ["0%", "100%"], opacity: [0, 0.7, 0.3, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
    />
  );
}

/* ─── Main exported Hero ─────────────────────────────────────────── */
export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-20 relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Global SVG filter for node glow */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="node-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="badge-halo" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* ══════════════════════════════════════════════════
            BLOCK 1 — Avatar + Name
        ══════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="relative shrink-0"
          >
            <Image
              src="/pfp.jpg"
              alt="Mohamed ELKHANFAF"
              width={128}
              height={128}
              priority
              className="rounded-full w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover"
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-20"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)",
              }}
            />
          </motion.div>

          <div className="min-w-0">
            <h1 className="font-mono text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text leading-tight break-words">
              Mohamed{" "}
              <span className="text-primary">ELKHANFAF</span>
            </h1>
            <p className="font-mono text-sm sm:text-xl md:text-2xl text-muted mt-2 sm:mt-3 flex items-center gap-1 flex-wrap">
              <span className="text-secondary">$</span> Cloud &amp; DevOps Engineer
              <span className="inline-block w-2.5 h-4 sm:h-5 bg-primary cursor-blink" />
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            BLOCK 2 — AWS SAA Achievement Card
        ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 lg:mt-14"
        >
          <p className="font-mono text-xs text-muted mb-3">
            <span className="text-secondary">#</span> latest_achievement.json — aws certification
          </p>

          {/* ── Card shell ── */}
          <div className="relative bg-surface border border-border rounded-xl overflow-hidden
                          hover:border-primary/50 transition-colors duration-500 glow-cyan-hover">

            {/* Animated gradient border shimmer */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none z-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, transparent 50%, rgba(59,95,192,0.05) 100%)",
              }}
              animate={prefersReduced ? {} : {
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Top accent bar */}
            <motion.div
              className="h-0.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00d4ff 30%, #3B5FC0 60%, transparent)",
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            />

            <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-12">

              {/* ── Badge column ── */}
              <div
                className="relative shrink-0 flex items-center justify-center"
                style={{ width: 240, height: 240 }}
              >
                {/* Deep ambient radial glow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: 320,
                    height: 320,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle, rgba(0,212,255,0.22) 0%, rgba(59,95,192,0.14) 40%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />

                {/* Orbit rings */}
                <OrbitRing radius={124} dashArray="6 10"  color="#00d4ff" opacity={0.28} duration={14} />
                <OrbitRing radius={138} dashArray="2 14"  color="#3B5FC0" opacity={0.2}  reverse duration={22} />
                <OrbitRing radius={112} dashArray="10 6"  color="#7fff6e" opacity={0.18} duration={9} />

                {/* Particles */}
                {!prefersReduced && PARTICLES.map((p, i) => (
                  <div
                    key={i}
                    className="particle absolute rounded-full pointer-events-none"
                    style={{
                      width: p.size,
                      height: p.size,
                      left: p.x,
                      top: p.y,
                      background: i % 2 === 0 ? "#00d4ff" : "#7fff6e",
                      "--dur": p.dur,
                      "--delay": p.delay,
                    } as React.CSSProperties}
                  />
                ))}

                {/* Badge image wrapper — float + glow + shimmer */}
                <motion.div
                  className="badge-float badge-glow badge-shimmer relative z-10 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: 1.0,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={prefersReduced ? {} : {
                    scale: 1.06,
                    rotate: 2,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src="/aws-saa-badge.png"
                    alt="AWS Certified Solutions Architect – Associate"
                    width={200}
                    height={200}
                    priority
                    className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] drop-shadow-2xl select-none"
                  />
                  {/* Scan line over badge */}
                  <ScanLine />
                </motion.div>
              </div>

              {/* ── Info column ── */}
              <div className="flex flex-col gap-4 text-center sm:text-left flex-1">

                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="font-mono text-[10px] text-muted uppercase tracking-[0.2em]"
                >
                  <span className="text-secondary">✓</span>&nbsp; Verified Certification
                </motion.p>

                {/* Cert headline — letters stagger in */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.75 } },
                  }}
                >
                  {[
                    { text: "AWS Certified",        cls: "text-lg sm:text-xl text-muted font-normal" },
                    { text: "Solutions Architect",  cls: "text-2xl sm:text-3xl text-text font-bold" },
                    { text: "Associate",            cls: "text-xl sm:text-2xl text-primary font-bold" },
                  ].map((line) => (
                    <motion.p
                      key={line.text}
                      className={`font-mono leading-tight ${line.cls}`}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                      }}
                    >
                      {line.text}
                    </motion.p>
                  ))}
                </motion.div>

                {/* Metadata pills */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="flex flex-wrap gap-2 justify-center sm:justify-start"
                >
                  {[
                    { label: "Issuer",  value: "Amazon Web Services" },
                    { label: "Level",   value: "Associate"           },
                    { label: "Exam",    value: "SAA-C03"             },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="font-mono text-[10px] px-2.5 py-1 bg-border/40 text-muted rounded border border-border/60"
                    >
                      <span className="text-muted/50">{item.label}:</span>{" "}
                      <span className="text-text">{item.value}</span>
                    </span>
                  ))}
                </motion.div>

                {/* Credly CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.5 }}
                >
                  <motion.a
                    href="https://www.credly.com/org/amazon-web-services/badge/aws-certified-solutions-architect-associate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-glow inline-flex items-center gap-2 font-mono text-sm font-semibold
                               border border-primary text-primary px-5 py-2.5 rounded
                               hover:bg-primary hover:text-bg transition-colors duration-300"
                    whileHover={prefersReduced ? {} : { scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.span
                      animate={prefersReduced ? {} : { rotate: [0, 20, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    >
                      ✓
                    </motion.span>
                    Verify via Credly
                  </motion.a>
                </motion.div>

                {/* Status */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.35, duration: 0.5 }}
                  className="flex items-center gap-2 justify-center sm:justify-start"
                >
                  <span className="w-2 h-2 rounded-full bg-secondary status-active" />
                  <span className="font-mono text-[11px] text-secondary tracking-wider">
                    ACTIVE &amp; VERIFIED
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Corner label */}
            <div className="absolute top-4 right-4 pointer-events-none">
              <span className="font-mono text-[10px] text-muted/40">aws_saa-c03</span>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            BLOCK 3 — CTA Buttons (original, untouched)
        ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            className="group font-mono text-xs sm:text-sm border border-primary/50 text-primary px-4 sm:px-5 py-2.5 rounded
                       hover:bg-primary/10 transition-all duration-300 hover:border-primary text-center"
          >
            <span className="text-muted group-hover:text-primary">$</span>{" "}
            ./view_projects.sh
          </a>
          <a
            href="/resume.pdf"
            download
            className="group font-mono text-xs sm:text-sm border border-secondary/50 text-secondary px-4 sm:px-5 py-2.5 rounded
                       hover:bg-secondary/10 transition-all duration-300 hover:border-secondary text-center"
          >
            <span className="text-muted group-hover:text-secondary">$</span>{" "}
            cat resume.pdf
          </a>
          <a
            href="#contact"
            className="group font-mono text-xs sm:text-sm border border-accent/50 text-accent px-4 sm:px-5 py-2.5 rounded
                       hover:bg-accent/10 transition-all duration-300 hover:border-accent text-center"
          >
            <span className="text-muted group-hover:text-accent">$</span>{" "}
            ssh contact@edo.dev
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
