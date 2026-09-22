"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type StatusType = "ACTIVE" | "LEARNING" | "PLANNED" | "AWARE";

interface Skill {
  name: string;
  status: StatusType;
  details?: string;
  level?: number;
}

interface Panel {
  title: string;
  icon: string;
  skills: Skill[];
}

const statusColors: Record<StatusType, string> = {
  ACTIVE: "text-secondary",
  LEARNING: "text-accent",
  PLANNED: "text-muted",
  AWARE: "text-muted/60",
};

const statusDotColors: Record<StatusType, string> = {
  ACTIVE: "bg-secondary status-active",
  LEARNING: "bg-accent status-learning",
  PLANNED: "bg-muted/50",
  AWARE: "bg-muted/30",
};

const panels: Panel[] = [
  {
    title: "Cloud Platforms",
    icon: "☁️",
    skills: [
      {
        name: "AWS",
        status: "ACTIVE",
        level: 90,
        details: "EC2, VPC, IAM, S3, RDS, Lambda, CloudFront, Route 53, EKS, ECR, CloudWatch, Secrets Manager",
      },
      {
        name: "GCP",
        status: "PLANNED",
        level: 15,
        details: "Compute Engine, Cloud Run — exploring",
      },
    ],
  },
  {
    title: "IaC & Automation",
    icon: "⚙️",
    skills: [
      {
        name: "Terraform",
        status: "ACTIVE",
        details: "HCL · modules · remote state · workspaces",
      },
      {
        name: "Ansible",
        status: "LEARNING",
        details: "playbooks · roles · inventory",
      },
      {
        name: "CloudFormation",
        status: "AWARE",
        details: "stacks · nested templates",
      },
    ],
  },
  {
    title: "Containers & Orchestration",
    icon: "🐳",
    skills: [
      {
        name: "Docker",
        status: "ACTIVE",
        details: "Dockerfile · Compose · multi-stage builds",
      },
      {
        name: "Kubernetes",
        status: "ACTIVE",
        details: "Deployments · Services · Ingress · HPA",
      },
      {
        name: "Helm",
        status: "LEARNING",
        details: "Charts · values override · templating",
      },
      {
        name: "ArgoCD",
        status: "PLANNED",
        details: "GitOps · sync policies",
      },
    ],
  },
  {
    title: "CI/CD & Observability",
    icon: "🔄",
    skills: [
      {
        name: "GitHub Actions",
        status: "ACTIVE",
        details: "Workflows · matrix builds · secrets",
      },
      {
        name: "GitLab CI/CD",
        status: "ACTIVE",
        details: "Pipelines · stages · artifacts",
      },
      {
        name: "Jenkins",
        status: "AWARE",
        details: "Declarative pipelines",
      },
      {
        name: "Prometheus + Grafana",
        status: "LEARNING",
        details: "Metrics · dashboards · alerting",
      },
    ],
  },
];

function SkillBar({ level }: { level: number }) {
  const filled = Math.round((level / 100) * 14);
  const empty = 14 - filled;
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="font-mono text-xs text-primary">
        {"█".repeat(filled)}
        {"░".repeat(empty)}
      </span>
      <span className="font-mono text-xs text-muted">{level}%</span>
    </div>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${statusDotColors[status]}`} />
      <span className={`font-mono text-[10px] uppercase ${statusColors[status]}`}>
        {status}
      </span>
    </span>
  );
}

export default function SkillsMatrix() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="px-4 sm:px-8 lg:px-16 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section title */}
        <h2 className="font-mono text-lg text-muted mb-10">
          <span className="text-secondary">#</span> SKILLS_MATRIX
        </h2>

        {/* Panels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {panels.map((panel, panelIndex) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: panelIndex * 0.15, duration: 0.5 }}
              className="bg-surface border border-border rounded-lg p-5 hover:border-primary/40 transition-all duration-300 glow-cyan-hover"
            >
              {/* Panel header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                <span className="text-lg">{panel.icon}</span>
                <h3 className="font-mono text-sm font-semibold text-text">
                  {panel.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-3">
                {panel.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-text">
                        <span className="text-primary">▶</span> {skill.name}
                      </span>
                      <StatusBadge status={skill.status} />
                    </div>
                    {skill.level && (
                      <SkillBar level={skill.level} />
                    )}
                    {skill.details && (
                      <p className="font-mono text-[11px] text-muted mt-1 pl-4">
                        {skill.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
