"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── CloudScale terminal mockup ─────────────────────────────────── */
function CloudScaleMockup() {
  const tfLines = [
    { prefix: "  +",  color: "text-secondary", text: ' resource "aws_vpc" "main"             {}' },
    { prefix: "  +",  color: "text-secondary", text: ' resource "aws_subnet" "public"         {}' },
    { prefix: "  +",  color: "text-secondary", text: ' resource "aws_subnet" "private"        {}' },
    { prefix: "  +",  color: "text-secondary", text: ' resource "aws_db_instance" "postgres"  {}' },
  ];

  return (
    <div className="bg-[#0d1117] border-b border-border/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-border/40">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="font-mono text-[10px] text-muted ml-2">terraform plan — cloudscale</span>
        {/* Status badge */}
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] font-semibold text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary status-active" />
          DEPLOYED
        </span>
      </div>

      <div className="p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] leading-relaxed space-y-0.5 overflow-hidden">
        <p className="text-muted">$ terraform plan -out=tfplan</p>
        <p className="text-muted/50 h-2" />
        <p className="text-text/70">Terraform will perform the following actions:</p>
        <p className="text-muted/50 h-1" />
        {tfLines.map((l, i) => (
          <p key={i} className="truncate">
            <span className={`${l.color} font-bold`}>{l.prefix}</span>
            <span className="text-text/80">{l.text}</span>
          </p>
        ))}
        <p className="text-muted/50 h-1" />
        <p>
          <span className="text-secondary font-bold">Plan:</span>
          <span className="text-text/70"> 15 to add, 0 to change, 0 to destroy.</span>
        </p>
      </div>

      {/* AZ topology strip */}
      <div className="mx-3 sm:mx-4 mb-4 border border-border/40 rounded bg-surface/50 p-2 sm:p-3">
        <p className="font-mono text-[9px] text-muted mb-2 uppercase tracking-widest">
          Network Topology — 2 AZs
        </p>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {["AZ-1a", "AZ-1b"].map((az) => (
            <div key={az} className="border border-border/30 rounded p-1.5 sm:p-2 bg-bg/60">
              <p className="font-mono text-[8px] sm:text-[9px] text-primary mb-1">{az}</p>
              <p className="font-mono text-[8px] sm:text-[9px] text-muted">public</p>
              <p className="font-mono text-[8px] sm:text-[9px] text-muted">private</p>
              <p className="font-mono text-[8px] sm:text-[9px] text-muted">db</p>
            </div>
          ))}
          <div className="border border-secondary/20 rounded p-1.5 sm:p-2 bg-secondary/5">
            <p className="font-mono text-[8px] sm:text-[9px] text-secondary mb-1">Cost</p>
            <p className="font-mono text-[8px] sm:text-[9px] text-text">−$65/mo</p>
            <p className="font-mono text-[8px] sm:text-[9px] text-muted">no NAT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PitchOps terminal mockup ───────────────────────────────────── */
function PitchOpsMockup() {
  const stages = [
    { name: "build",   status: "passed",   color: "text-secondary", dot: "bg-secondary" },
    { name: "test",    status: "passed",   color: "text-secondary", dot: "bg-secondary" },
    { name: "scan",    status: "passed",   color: "text-secondary", dot: "bg-secondary" },
    { name: "push",    status: "passed",   color: "text-secondary", dot: "bg-secondary" },
    { name: "deploy",  status: "passed",   color: "text-secondary", dot: "bg-secondary" },
  ];

  const containers = [
    { name: "frontend",  image: "next:alpine",    port: "3000", status: "Up" },
    { name: "backend",   image: "python:3.11",    port: "8000", status: "Up" },
    { name: "nginx",     image: "nginx:alpine",   port: "80",   status: "Up" },
  ];

  return (
    <div className="bg-[#0d1117] border-b border-border/50 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-border/40">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="font-mono text-[10px] text-muted ml-2">gitlab-ci — pitchops · main</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] font-semibold text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary status-active" />
          DEPLOYED
        </span>
      </div>

      {/* Pipeline stages */}
      <div className="px-4 pt-3 pb-2">
        <p className="font-mono text-[9px] text-muted uppercase tracking-widest mb-2">
          Pipeline · #47 · triggered by push to main
        </p>
        <div className="flex items-center gap-1 flex-wrap">
          {stages.map((s, i) => (
            <div key={s.name} className="flex items-center gap-1">
              <div className="flex items-center gap-1.5 border border-secondary/20 rounded px-2 py-1 bg-secondary/5">
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot} status-active`} />
                <span className={`font-mono text-[9px] ${s.color}`}>{s.name}</span>
              </div>
              {i < stages.length - 1 && (
                <span className="font-mono text-[9px] text-muted/40">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Trivy scan output */}
        <div className="mt-2 font-mono text-[10px] space-y-0.5">
          <p>
            <span className="text-accent">▶</span>
            <span className="text-text/70"> trivy image scan </span>
            <span className="text-secondary">✓ 0 HIGH · 0 CRITICAL</span>
          </p>
          <p>
            <span className="text-accent">▶</span>
            <span className="text-text/70"> docker push → ECR </span>
            <span className="text-primary">sha256:a3f9…</span>
          </p>
        </div>
      </div>

      {/* Container topology */}
      <div className="mx-3 sm:mx-4 mb-4 border border-border/40 rounded bg-surface/50 p-2 sm:p-3">
        <p className="font-mono text-[9px] text-muted mb-2 uppercase tracking-widest">
          docker compose ps — EC2 production
        </p>
        <div className="space-y-1">
          {containers.map((c) => (
            <div key={c.name} className="flex items-center gap-2 sm:gap-3 font-mono text-[9px]">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary status-active shrink-0" />
              <span className="text-primary w-16 sm:w-20 shrink-0">{c.name}</span>
              <span className="text-muted/70 flex-1 truncate">{c.image}</span>
              <span className="text-text/60 shrink-0">:{c.port}</span>
              <span className="text-secondary shrink-0">{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Project card ───────────────────────────────────────────────── */
interface ProjectData {
  name: string;
  codename: string;
  description: string;
  stack: string[];
  links: { label: string; url: string }[];
  command: string;
  mockup: React.ReactNode;
}

const projects: ProjectData[] = [
  {
    name: "CloudScale",
    codename: "cloudscale",
    description:
      "Production-ready 15-service AWS infrastructure entirely automated via Terraform with remote S3/DynamoDB state locking. Architected secure private subnets for RDS without NAT Gateways, cutting cloud costs by $65/month. Integrated an event-driven serverless AI pipeline (S3 → Lambda → Rekognition → DynamoDB).",
    stack: ["AWS", "Terraform", "Lambda", "S3", "DynamoDB", "RDS", "Rekognition"],
    links: [
      { label: "GitHub",              url: "https://github.com/edothecreator" },
      { label: "Architecture Diagram", url: "#" },
    ],
    command: "$ terraform apply",
    mockup: <CloudScaleMockup />,
  },
  {
    name: "PitchOps",
    codename: "pitchops",
    description:
      "Containerized multi-service football analytics platform running on a hardened Linux server. Automated the entire SDLC using GitLab CI/CD pipelines for automated testing, Docker multi-stage builds, and Trivy security scans pushing to Amazon ECR. Paired a static Next.js frontend (S3/CloudFront) with a containerized backend.",
    stack: ["Docker", "GitLab CI/CD", "AWS", "EC2", "S3", "CloudFront", "Linux", "Next.js"],
    links: [
      { label: "GitHub",        url: "https://github.com/edothecreator" },
      { label: "Pipeline Logs", url: "#" },
    ],
    command: "$ docker compose up -d",
    mockup: <PitchOpsMockup />,
  },
];

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="group relative bg-surface border border-border rounded-xl overflow-hidden
                 hover:border-primary/50 transition-all duration-300 glow-cyan-hover flex flex-col"
    >
      {/* Animated top deploy bar */}
      <div className="h-0.5 bg-border overflow-hidden shrink-0">
        <div className="deploy-bar h-full bg-gradient-to-r from-primary via-secondary to-primary w-0" />
      </div>

      {/* Terminal mockup */}
      {project.mockup}

      {/* Card body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-mono text-base font-semibold text-text">
            {project.name}
          </h3>
          <p className="font-mono text-[11px] text-muted mt-0.5">
            ~/{project.codename}
          </p>
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5 bg-border/50 text-muted rounded border border-border
                         hover:border-primary/40 hover:text-text transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-text/80 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Links + command */}
        <div className="flex items-center gap-3 pt-3 border-t border-border/50 flex-wrap">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-primary transition-colors duration-200"
            >
              [{link.label}]
            </a>
          ))}
          <span className="hidden sm:inline font-mono text-[10px] text-muted/40 ml-auto">
            {project.command}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="px-4 sm:px-8 lg:px-16 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="font-mono text-lg text-muted mb-10">
          <span className="text-secondary">#</span> DEPLOYMENTS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.codename} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
