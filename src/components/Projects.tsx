"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectThumbnail from "./ProjectThumbnail";

type ProjectStatus = "DEPLOYED" | "LIVE" | "IN PROGRESS";

interface Project {
  name: string;
  codename: string;
  status: ProjectStatus;
  stack: string[];
  description: string;
  metrics?: string;
  links: { label: string; url: string }[];
  thumbnail: "vpc" | "zerotrust" | "cineapi" | "cinetrack";
}

const statusStyles: Record<ProjectStatus, string> = {
  DEPLOYED: "text-secondary",
  LIVE: "text-primary",
  "IN PROGRESS": "text-accent",
};

const projects: Project[] = [
  {
    name: "CloudScale VPC Lab",
    codename: "vpc-lab",
    status: "DEPLOYED",
    stack: ["AWS", "Terraform", "EC2", "RDS", "ALB", "CloudWatch"],
    description:
      "Production-grade 3-tier VPC across 2 AZs. Public/Private/DB subnets, bastion host, encrypted RDS, ALB with health checks. Infrastructure fully reproducible via Terraform.",
    metrics: "2 AZs · 6 subnets · 1 bastion · 1 ALB · 1 RDS Multi-AZ",
    links: [
      { label: "GitHub", url: "https://github.com/edothecreator" },
    ],
    thumbnail: "vpc",
  },
  {
    name: "ZeroTrust Dual-Account AWS",
    codename: "zero-trust",
    status: "DEPLOYED",
    stack: ["AWS", "IAM", "SCPs", "GuardDuty", "Security Hub", "CloudTrail"],
    description:
      "Dual-account setup (prod/security) with centralized logging, GuardDuty threat detection, SCP enforcement, and least-privilege IAM. Built for security-focused DevOps.",
    links: [
      { label: "GitHub", url: "https://github.com/edothecreator" },
      { label: "LinkedIn Post", url: "https://linkedin.com/in/mohamed-el-khanfaf" },
    ],
    thumbnail: "zerotrust",
  },
  {
    name: "CineAPI — Containerized Microservice",
    codename: "cineapi",
    status: "LIVE",
    stack: ["Flask", "PostgreSQL", "Redis", "Nginx", "Docker Compose", "GitHub Actions"],
    description:
      "Full movie review REST API. Multi-container with Redis caching, Nginx reverse proxy, GitHub Actions CI/CD pipeline, deployed on Railway.",
    links: [
      { label: "GitHub", url: "https://github.com/edothecreator" },
      { label: "Live", url: "#" },
    ],
    thumbnail: "cineapi",
  },
  {
    name: "CINETRACK — Academic DevOps Platform",
    codename: "cinetrack",
    status: "LIVE",
    stack: ["Next.js", "Neon PostgreSQL", "GitLab CI/CD", "Vercel", "Docker"],
    description:
      "Team project with full GitOps workflow: GitLab pipelines, Docker builds, Vercel auto-deploy, Neon serverless Postgres. Full DevOps report written.",
    links: [
      { label: "GitLab", url: "#" },
      { label: "Live", url: "#" },
    ],
    thumbnail: "cinetrack",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-surface border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 glow-cyan-hover"
    >
      {/* Deploy progress bar */}
      <div className="h-0.5 bg-border overflow-hidden">
        <div className="deploy-bar h-full bg-gradient-to-r from-primary via-secondary to-primary w-0" />
      </div>

      {/* Thumbnail — like a YouTube/project preview */}
      <div className="relative overflow-hidden border-b border-border/50">
        {/* 
          Replace ProjectThumbnail with a real screenshot:
          <Image src={`/projects/${project.codename}.png`} alt={project.name} width={400} height={225} className="w-full" />
        */}
        <ProjectThumbnail
          variant={project.thumbnail}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <span
            className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-bg/80 backdrop-blur-sm border border-border/50 ${statusStyles[project.status]} flex items-center gap-1.5`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "DEPLOYED"
                  ? "bg-secondary status-active"
                  : project.status === "LIVE"
                  ? "bg-primary status-active"
                  : "bg-accent status-learning"
              }`}
            />
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-mono text-base font-semibold text-text">
            {project.name}
          </h3>
          <p className="font-mono text-[11px] text-muted mt-0.5">
            ~/{project.codename}
          </p>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5 bg-border/50 text-muted rounded border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-text/80 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <p className="font-mono text-[11px] text-primary/70 mb-4">
            {project.metrics}
          </p>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-border/50">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-primary transition-colors"
            >
              [{link.label}]
            </a>
          ))}
          <span className="font-mono text-[10px] text-muted/50 ml-auto">
            $ terraform apply
          </span>
        </div>
      </div>
    </motion.div>
  );
}

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.codename} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
