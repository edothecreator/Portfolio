"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type StatusType = "ACTIVE" | "LEARNING";

interface Skill {
  name: string;
  status: StatusType;
  details: string;
}

interface Panel {
  title: string;
  icon: string;
  logo?: { src: string; alt: string };
  skills: Skill[];
}

const statusColors: Record<StatusType, string> = {
  ACTIVE:   "text-secondary",
  LEARNING: "text-accent",
};

const statusDotColors: Record<StatusType, string> = {
  ACTIVE:   "bg-secondary status-active",
  LEARNING: "bg-accent status-learning",
};

const panels: Panel[] = [
  {
    title: "Cloud Platforms",
    icon: "☁️",
    logo: { src: "/aws.jpg", alt: "AWS" },
    skills: [
      {
        name: "AWS",
        status: "ACTIVE",
        details: "EC2 · S3 · RDS · Lambda · CloudFront · IAM · DynamoDB · VPC · CloudWatch",
      },
    ],
  },
  {
    title: "IaC & Automation",
    icon: "⚙️",
    logo: { src: "/terraform.png", alt: "Terraform" },
    skills: [
      {
        name: "Terraform",
        status: "ACTIVE",
        details: "HCL · modules · remote state locking (S3/DynamoDB) · cost optimization",
      },
      {
        name: "Ansible",
        status: "LEARNING",
        details: "Playbooks · roles · inventory",
      },
    ],
  },
  {
    title: "Containers & Systems",
    icon: "🐳",
    logo: { src: "/ansible.png", alt: "Ansible" },
    skills: [
      {
        name: "Docker",
        status: "ACTIVE",
        details: "Dockerfiles · multi-stage builds · containerization",
      },
      {
        name: "Linux Administration",
        status: "ACTIVE",
        details: "RHEL/Ubuntu · systemd · journalctl · networking · permissions",
      },
    ],
  },
  {
    title: "CI/CD & Delivery",
    icon: "🔄",
    skills: [
      {
        name: "GitLab CI/CD",
        status: "ACTIVE",
        details: "Pipelines · stages · artifacts · security scans · ECR integration",
      },
      {
        name: "GitHub Actions",
        status: "ACTIVE",
        details: "Workflows · secrets · automated testing",
      },
      {
        name: "Nginx",
        status: "ACTIVE",
        details: "Reverse proxy · routing · static optimization",
      },
    ],
  },
];

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className="flex items-center gap-1.5 shrink-0">
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
        <h2 className="font-mono text-lg text-muted mb-10">
          <span className="text-secondary">#</span> SKILLS_MATRIX
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {panels.map((panel, panelIndex) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: panelIndex * 0.12, duration: 0.5 }}
              className="bg-surface border border-border rounded-lg p-5 hover:border-primary/40 transition-all duration-300 glow-cyan-hover"
            >
              {/* Panel header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                {panel.logo ? (
                  <Image
                    src={panel.logo.src}
                    alt={panel.logo.alt}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain rounded-sm"
                  />
                ) : (
                  <span className="text-lg">{panel.icon}</span>
                )}
                <h3 className="font-mono text-sm font-semibold text-text">
                  {panel.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {panel.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm text-text">
                        <span className="text-primary">▶</span> {skill.name}
                      </span>
                      <StatusBadge status={skill.status} />
                    </div>
                    <p className="font-mono text-[11px] text-muted mt-1.5 pl-4 leading-relaxed">
                      {skill.details}
                    </p>
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
