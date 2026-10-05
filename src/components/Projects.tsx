"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ProjectThumbnail, { type ProjectThumbnailVariant } from "@/components/ProjectThumbnail";
import SectionHeader from "@/components/SectionHeader";

/* ─── Types ──────────────────────────────────────────────────────── */
interface ProjectData {
  name: string;
  codename: string;
  description: string;
  stack: string[];
  links: { label: string; url: string; accent?: boolean }[];
  command: string;
  archImage?: string;
  thumbnail?: ProjectThumbnailVariant; // generated SVG fallback used when archImage is absent
}

/* ─── Project data ───────────────────────────────────────────────── */
const projects: ProjectData[] = [
  {
    name: "PitchOps",
    codename: "pitchops",
    description:
      "Containerized multi-service football analytics platform deployed on AWS with fully automated CI/CD. GitHub Actions pipelines handle build, Trivy security scanning, and deploy. Static Next.js frontend on S3/CloudFront, FastAPI backend on EC2 behind Nginx with Let's Encrypt SSL. OIDC federation — zero long-lived credentials in CI/CD.",
    stack: ["AWS", "GitHub Actions", "Docker", "Next.js", "FastAPI", "CloudFront", "EC2", "Nginx", "Let's Encrypt", "OIDC"],
    links: [
      { label: "GitHub ↗", url: "https://github.com/edothecreator/PitchOps" },
      { label: "Live ↗",   url: "https://pitchopsss.xyz", accent: true },
    ],
    command: "$ docker compose up -d",
    archImage: "/pitchops-arch.png",
  },
  {
    name: "CloudScale",
    codename: "cloudscale",
    description:
      "Production-ready 15-service AWS infrastructure entirely automated via Terraform. Multi-AZ high availability with ALB + ASG, serverless AI pipeline (S3 → Lambda → Rekognition → DynamoDB), RDS in private subnets with no NAT Gateway (saves $65/month), and remote state with S3 + DynamoDB locking.",
    stack: ["AWS", "Terraform", "Lambda", "S3", "DynamoDB", "RDS", "Rekognition", "CloudFront", "EC2", "IAM"],
    links: [
      { label: "GitHub ↗", url: "https://github.com/edothecreator/CloudScale" },
    ],
    command: "$ terraform apply",
    archImage: "/cloudscale-arch.png",
  },
  {
    name: "CineTrack",
    codename: "cinetrack",
    description:
      "Full-stack social movie & TV tracking platform on Next.js 16 (App Router) and React 19, backed by PostgreSQL via Prisma on Supabase and deployed on Vercel. Six-stage GitLab CI/CD pipeline (validate → build → test → security → docker → deploy) with a multi-stage Docker image. JWT auth in HTTP-only cookies, server-side-only TMDB integration, and a Taste Match engine blending Jaccard, Pearson, and cosine similarity.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Supabase", "Vercel", "GitLab CI", "Docker"],
    links: [
      { label: "GitHub ↗", url: "https://github.com/edothecreator/CineTrack" },
      { label: "Live ↗",   url: "https://movie-tracker-five-theta.vercel.app", accent: true },
    ],
    command: "$ npx prisma migrate deploy",
    // No architecture image yet — drop public/cinetrack-arch.png and add: archImage: "/cinetrack-arch.png",
    thumbnail: "cinetrack",
  },
];

/* ─── Project card ───────────────────────────────────────────────── */
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

      {/* ── Thumbnail with hover overlay ── */}
      <div className="relative overflow-hidden">
        {/* Architecture diagram image */}
        {project.archImage ? (
          <Image
            src={project.archImage}
            alt={`${project.name} architecture diagram`}
            width={800}
            height={450}
            className="w-full h-72 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : project.thumbnail ? (
          <div className="w-full h-72 sm:h-80 md:h-96 bg-[#0d1117] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
            <ProjectThumbnail variant={project.thumbnail} className="w-full h-full" />
          </div>
        ) : null}

        {/* Dark overlay + action buttons on hover */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 flex items-center justify-center gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={
                link.accent
                  ? "font-mono text-sm font-medium px-4 py-2 rounded-lg bg-primary text-bg hover:bg-primary/80 transition-colors duration-150"
                  : "font-mono text-sm px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors duration-150"
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1.5 font-mono text-2xs font-semibold
                           px-2 py-0.5 rounded bg-bg/80 backdrop-blur-sm border border-border/50 text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary status-active" />
            DEPLOYED
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-mono text-base font-semibold text-text">{project.name}</h3>
          <p className="font-mono text-[11px] text-muted mt-0.5">~/{project.codename}</p>
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-2xs px-2 py-0.5 bg-border/50 text-muted rounded border border-border
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
              [{link.label.replace(" ↗", "")}]
            </a>
          ))}
          <span className="hidden sm:inline font-mono text-2xs text-muted ml-auto">
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
        <SectionHeader path="projects" command="kubectl get deployments" title="Projects" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.codename} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
