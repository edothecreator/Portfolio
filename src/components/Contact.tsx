"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const channels = [
  {
    logo: "/gmail.svg",
    label: "Email",
    value: "mohamedelkhanfaf0@gmail.com",
    href: "mailto:mohamedelkhanfaf0@gmail.com",
    bg: "rgba(234,67,53,0.10)",
    glow: "rgba(234,67,53,0.65)",
    border: "hover:border-[#ea4335]/40",
    text: "hover:text-[#ea4335]",
  },
  {
    logo: "/linkedin.jpg",
    label: "LinkedIn",
    value: "mohamed-el-khanfaf",
    href: "https://linkedin.com/in/mohamed-el-khanfaf",
    bg: "rgba(10,102,194,0.12)",
    glow: "rgba(10,102,194,0.7)",
    border: "hover:border-[#0a66c2]/40",
    text: "hover:text-[#0a66c2]",
  },
  {
    logo: "/github.webp",
    label: "GitHub",
    value: "edothecreator",
    href: "https://github.com/edothecreator",
    bg: "rgba(240,246,252,0.07)",
    glow: "rgba(240,246,252,0.5)",
    border: "hover:border-white/20",
    text: "hover:text-white",
  },
  {
    logo: "/resume.svg",
    label: "Resume",
    value: "./download_resume.sh",
    href: "/resume.pdf",
    download: true,
    bg: "rgba(0,212,255,0.10)",
    glow: "rgba(0,212,255,0.65)",
    border: "hover:border-primary/40",
    text: "hover:text-primary",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="px-4 sm:px-8 lg:px-16 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-mono text-lg text-muted mb-10">
          <span className="text-secondary">#</span> ESTABLISH_CONNECTION
        </h2>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* SSH header */}
          <div className="px-5 sm:px-8 py-5 border-b border-border">
            <p className="font-mono text-sm text-muted">
              <span className="text-secondary">$</span> ssh edo@cloudstack.dev -p 443
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4"
            >
              <div className="inline-block border border-secondary/30 rounded px-4 py-2 bg-secondary/5">
                <p className="font-mono text-sm text-secondary">
                  Connection established. ✓
                </p>
              </div>
            </motion.div>
          </div>

          {/* Channels */}
          <div className="px-5 sm:px-8 py-6">
            <p className="font-mono text-xs text-muted mb-5">Available channels:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channels.map((channel, i) => (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={!channel.download ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  download={channel.download ? true : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.1,
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative flex items-center gap-4 p-4 rounded-lg border border-border
                              ${channel.border} transition-all duration-300 overflow-hidden`}
                >
                  {/* Card background glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 80% at 10% 50%, ${channel.bg} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Shimmer sweep on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
                      animation: "shimmer-sweep 2s ease-in-out infinite",
                    }}
                  />

                  {/* Logo tile */}
                  <div
                    className="relative w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-110"
                    style={{ background: channel.bg }}
                  >
                    {/* Radial glow */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 50% 40%, ${channel.glow} 0%, transparent 70%)`,
                        opacity: 0.5,
                      }}
                    />
                    <motion.div
                      animate={{ rotate: [0, 0, 0] }}
                      whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                      className="relative z-10"
                    >
                      <Image
                        src={channel.logo}
                        alt={channel.label}
                        width={22}
                        height={22}
                        className="w-5 h-5 object-contain drop-shadow-sm"
                      />
                    </motion.div>
                  </div>

                  {/* Text */}
                  <div className="relative z-10 min-w-0">
                    <p className={`font-mono text-[10px] text-muted uppercase tracking-widest transition-colors duration-200 ${channel.text}`}>
                      {channel.label}
                    </p>
                    <p className={`font-mono text-sm text-text truncate transition-colors duration-200 ${channel.text}`}>
                      {channel.value}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <motion.span
                    className="relative z-10 ml-auto font-mono text-muted/30 text-xs shrink-0"
                    initial={{ x: 0, opacity: 0.3 }}
                    whileHover={{ x: 3, opacity: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* Status */}
            <div className="mt-8 pt-5 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-secondary status-active" />
                <span className="font-mono text-sm text-secondary">
                  OPEN TO OPPORTUNITIES
                </span>
              </motion.div>
              <p className="font-mono text-xs text-muted">
                Preferred response time: &lt; 24h
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="font-mono text-xs text-muted">
            Built by Edo. Deployed to the cloud. Documented in Terraform.
          </p>
          <p className="font-mono text-[10px] text-muted/50 mt-2">
            $ terraform apply -auto-approve
          </p>
        </div>
      </motion.div>
    </section>
  );
}
