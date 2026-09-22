"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type CertStatus = "COMPLETED" | "IN_PROGRESS" | "QUEUED" | "BACKLOG";

interface Certification {
  name: string;
  shortName: string;
  status: CertStatus;
  progress?: number;
}

const certStatusStyles: Record<CertStatus, { dot: string; text: string; bar: string }> = {
  COMPLETED: {
    dot: "bg-secondary",
    text: "text-secondary",
    bar: "bg-secondary",
  },
  IN_PROGRESS: {
    dot: "bg-accent status-learning",
    text: "text-accent",
    bar: "bg-accent",
  },
  QUEUED: {
    dot: "bg-muted/50",
    text: "text-muted",
    bar: "bg-muted/30",
  },
  BACKLOG: {
    dot: "bg-muted/30",
    text: "text-muted/60",
    bar: "bg-muted/20",
  },
};

const certStatusLabels: Record<CertStatus, string> = {
  COMPLETED: "PASSED",
  IN_PROGRESS: "IN PROGRESS",
  QUEUED: "QUEUED",
  BACKLOG: "BACKLOG",
};

const certifications: Certification[] = [
  { name: "AWS Solutions Architect Associate", shortName: "AWS SAA", status: "IN_PROGRESS", progress: 65 },
  { name: "Terraform Associate", shortName: "TF Assoc", status: "QUEUED" },
  { name: "Certified Kubernetes Administrator", shortName: "CKA", status: "QUEUED" },
  { name: "AWS DevOps Professional", shortName: "AWS DevOps Pro", status: "BACKLOG" },
];

const completedCerts = [
  "Fortinet NSE1",
  "Fortinet NSE2",
  "AWS Cloud Practitioner Essentials",
];

export default function CertPipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="px-4 sm:px-8 lg:px-16 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="font-mono text-lg text-muted mb-10">
          <span className="text-secondary">#</span> CERTIFICATION_PIPELINE
        </h2>

        {/* Pipeline visualization */}
        <div className="bg-surface border border-border rounded-lg p-5 sm:p-8">
          <p className="font-mono text-xs text-muted mb-6">
            CERTIFICATION PIPELINE ═══════════════════════════════════════
          </p>

          {/* Pipeline nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => {
              const styles = certStatusStyles[cert.status];
              return (
                <motion.div
                  key={cert.shortName}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {i < certifications.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-px bg-border" />
                  )}

                  <div className="bg-bg border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                    {/* Status dot + label */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                      <span className={`font-mono text-[10px] uppercase ${styles.text}`}>
                        {certStatusLabels[cert.status]}
                      </span>
                    </div>

                    {/* Cert name */}
                    <h4 className="font-mono text-sm font-semibold text-text mb-1">
                      {cert.shortName}
                    </h4>
                    <p className="font-mono text-[10px] text-muted leading-tight">
                      {cert.name}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 bg-border/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${cert.progress || 0}%` } : {}}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                        className={`h-full rounded-full ${styles.bar}`}
                      />
                    </div>
                    {cert.progress && (
                      <p className={`font-mono text-[10px] mt-1 ${styles.text}`}>
                        {cert.progress}%
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Completed certs */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="font-mono text-xs text-muted mb-3">Completed:</p>
            <div className="flex flex-wrap gap-3">
              {completedCerts.map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-xs text-secondary flex items-center gap-1.5"
                >
                  <span className="text-secondary">✓</span> {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
