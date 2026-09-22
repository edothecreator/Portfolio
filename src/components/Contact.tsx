"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const channels = [
  {
    icon: "📧",
    label: "Email",
    value: "mohamedelkhanfaf0@gmail.com",
    href: "mailto:mohamedelkhanfaf0@gmail.com",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "mohamed-el-khanfaf",
    href: "https://linkedin.com/in/mohamed-el-khanfaf",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "edothecreator",
    href: "https://github.com/edothecreator",
  },
  {
    icon: "📄",
    label: "Resume",
    value: "./download_resume.sh",
    href: "/resume.pdf",
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

        <div className="bg-surface border border-border rounded-lg overflow-hidden">
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
            <p className="font-mono text-xs text-muted mb-5">
              Available channels:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channels.map((channel, i) => (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={channel.label !== "Resume" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  download={channel.label === "Resume" ? true : undefined}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="text-xl">{channel.icon}</span>
                  <div>
                    <p className="font-mono text-xs text-muted group-hover:text-primary transition-colors">
                      {channel.label}
                    </p>
                    <p className="font-mono text-sm text-text group-hover:text-primary transition-colors">
                      {channel.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Status */}
            <div className="mt-8 pt-5 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary status-active" />
                <span className="font-mono text-sm text-secondary">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
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
