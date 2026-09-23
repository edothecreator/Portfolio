"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type StatusType = "ACTIVE" | "LEARNING";

interface Skill {
  name: string;
  status: StatusType;
  details: string;
  logo: { src: string; alt: string; bg: string; glow: string };
}

interface Panel {
  title: string;
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
    skills: [
      {
        name: "AWS",
        status: "ACTIVE",
        logo: { src: "/aws.jpg", alt: "AWS", bg: "rgba(255,153,0,0.12)", glow: "rgba(255,153,0,0.7)" },
        details:
          "EC2 · ECS · EKS · Lambda · S3 · EBS · EFS · Glacier · RDS · Aurora · DynamoDB · ElastiCache · Redshift · VPC · Route 53 · CloudFront · API Gateway · ALB · NLB · IAM · KMS · ACM · Secrets Manager · CloudWatch · CloudTrail · Config · SNS · SQS · EventBridge · Step Functions · Rekognition · Cognito · Systems Manager",
      },
    ],
  },
  {
    title: "IaC & Automation",
    skills: [
      {
        name: "Terraform",
        status: "ACTIVE",
        logo: { src: "/terraform.png", alt: "Terraform", bg: "rgba(95,57,182,0.15)", glow: "rgba(95,57,182,0.8)" },
        details: "HCL · modules · remote state locking (S3/DynamoDB) · cost optimization",
      },
      {
        name: "Ansible",
        status: "LEARNING",
        logo: { src: "/ansible.png", alt: "Ansible", bg: "rgba(238,0,0,0.10)", glow: "rgba(238,0,0,0.6)" },
        details: "Playbooks · roles · inventory",
      },
    ],
  },
  {
    title: "Containers & Systems",
    skills: [
      {
        name: "Docker",
        status: "ACTIVE",
        // placeholder until docker.png is provided
        logo: { src: "/globe.svg", alt: "Docker", bg: "rgba(29,99,237,0.12)", glow: "rgba(29,99,237,0.7)" },
        details: "Dockerfiles · multi-stage builds · containerization · ECR",
      },
      {
        name: "Linux Administration",
        status: "ACTIVE",
        logo: { src: "/linux.webp", alt: "Linux", bg: "rgba(255,204,0,0.10)", glow: "rgba(255,204,0,0.75)" },
        details: "RHEL/Ubuntu · systemd · journalctl · networking · permissions",
      },
    ],
  },
  {
    title: "CI/CD & Delivery",
    skills: [
      {
        name: "GitLab CI/CD",
        status: "ACTIVE",
        logo: { src: "/gitlab.svg", alt: "GitLab", bg: "rgba(252,109,38,0.12)", glow: "rgba(252,109,38,0.7)" },
        details: "Pipelines · stages · artifacts · security scans · ECR integration",
      },
      {
        name: "GitHub Actions",
        status: "ACTIVE",
        logo: { src: "/github.webp", alt: "GitHub", bg: "rgba(240,246,252,0.07)", glow: "rgba(240,246,252,0.5)" },
        details: "Workflows · secrets · automated testing",
      },
      {
        name: "Nginx",
        status: "ACTIVE",
        // placeholder until nginx.png is provided
        logo: { src: "/file.svg", alt: "Nginx", bg: "rgba(0,168,80,0.10)", glow: "rgba(0,168,80,0.6)" },
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

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <div className="group/skill flex items-start gap-3">
      {/* Logo tile */}
      <div
        className="relative w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden mt-0.5"
        style={{ background: skill.logo.bg }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${skill.logo.glow} 0%, transparent 70%)`,
          }}
        />
        {/* Shimmer on row hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
            animation: "shimmer-sweep 1.8s ease-in-out infinite",
          }}
        />
        <Image
          src={skill.logo.src}
          alt={skill.logo.alt}
          width={22}
          height={22}
          className="relative z-10 w-5 h-5 object-contain drop-shadow-sm"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-mono text-sm font-semibold text-text">{skill.name}</span>
          <StatusBadge status={skill.status} />
        </div>
        <p className="font-mono text-[11px] text-muted leading-relaxed break-words">
          {skill.details}
        </p>
      </div>
    </div>
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
              <div className="mb-4 pb-3 border-b border-border/50">
                <h3 className="font-mono text-sm font-semibold text-text">
                  <span className="text-secondary">#</span> {panel.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-5">
                {panel.skills.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
