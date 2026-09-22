"use client";

interface ProjectThumbnailProps {
  variant: "vpc" | "zerotrust" | "cineapi" | "cinetrack";
  className?: string;
}

/**
 * Programmatic project thumbnails — styled like terminal screenshots / infra dashboards.
 * Replace these with actual screenshots later.
 */
export default function ProjectThumbnail({ variant, className }: ProjectThumbnailProps) {
  return (
    <svg
      viewBox="0 0 400 225"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${variant} project thumbnail`}
    >
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d1117" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="225" rx="4" fill={`url(#bg-${variant})`} />

      {/* Terminal header bar */}
      <rect width="400" height="28" fill="#161b22" rx="4" />
      <rect x="0" y="24" width="400" height="4" fill="#161b22" />
      <circle cx="16" cy="14" r="5" fill="#ff5f57" />
      <circle cx="32" cy="14" r="5" fill="#febc2e" />
      <circle cx="48" cy="14" r="5" fill="#28c840" />

      {variant === "vpc" && <VpcContent />}
      {variant === "zerotrust" && <ZeroTrustContent />}
      {variant === "cineapi" && <CineApiContent />}
      {variant === "cinetrack" && <CinetrackContent />}
    </svg>
  );
}

function VpcContent() {
  return (
    <g>
      {/* Title */}
      <text x="70" y="16" fontFamily="monospace" fontSize="9" fill="#64748b">
        terraform plan — vpc-lab
      </text>

      {/* Fake terraform output */}
      <text x="16" y="50" fontFamily="monospace" fontSize="9" fill="#7fff6e">
        + aws_vpc.main
      </text>
      <text x="16" y="65" fontFamily="monospace" fontSize="9" fill="#7fff6e">
        + aws_subnet.public[0]
      </text>
      <text x="16" y="80" fontFamily="monospace" fontSize="9" fill="#7fff6e">
        + aws_subnet.public[1]
      </text>
      <text x="16" y="95" fontFamily="monospace" fontSize="9" fill="#7fff6e">
        + aws_subnet.private[0]
      </text>
      <text x="16" y="110" fontFamily="monospace" fontSize="9" fill="#64748b">
        + aws_subnet.private[1]
      </text>
      <text x="16" y="125" fontFamily="monospace" fontSize="9" fill="#64748b">
        + aws_lb.main
      </text>
      <text x="16" y="140" fontFamily="monospace" fontSize="9" fill="#64748b">
        + aws_db_instance.postgres
      </text>

      {/* Summary */}
      <text x="16" y="170" fontFamily="monospace" fontSize="9" fill="#e2e8f0">
        Plan: 23 to add, 0 to change, 0 to destroy.
      </text>

      {/* Infra diagram mini */}
      <rect x="250" y="45" width="130" height="160" rx="3" fill="#0a0e1a" stroke="#1e3a5f" strokeWidth="1" />
      <text x="265" y="62" fontFamily="monospace" fontSize="7" fill="#00d4ff">┌─ AZ-1 ─┐</text>
      <rect x="265" y="68" width="45" height="16" rx="2" fill="#1e3a5f" />
      <text x="272" y="79" fontFamily="monospace" fontSize="7" fill="#7fff6e">EC2</text>
      <rect x="320" y="68" width="45" height="16" rx="2" fill="#1e3a5f" />
      <text x="327" y="79" fontFamily="monospace" fontSize="7" fill="#7fff6e">EC2</text>
      <text x="265" y="100" fontFamily="monospace" fontSize="7" fill="#00d4ff">┌─ AZ-2 ─┐</text>
      <rect x="265" y="106" width="45" height="16" rx="2" fill="#1e3a5f" />
      <text x="272" y="117" fontFamily="monospace" fontSize="7" fill="#7fff6e">RDS</text>
      <rect x="320" y="106" width="45" height="16" rx="2" fill="#1e3a5f" />
      <text x="327" y="117" fontFamily="monospace" fontSize="7" fill="#ff6b35">ALB</text>

      {/* Status indicator */}
      <circle cx="370" y="190" r="4" fill="#7fff6e">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="280" y="193" fontFamily="monospace" fontSize="7" fill="#7fff6e">● ALL HEALTHY</text>
    </g>
  );
}

function ZeroTrustContent() {
  return (
    <g>
      <text x="70" y="16" fontFamily="monospace" fontSize="9" fill="#64748b">
        security-hub — zero-trust
      </text>

      {/* Shield icon area */}
      <rect x="16" y="40" width="170" height="165" rx="3" fill="#0a0e1a" stroke="#1e3a5f" strokeWidth="1" />
      <text x="30" y="60" fontFamily="monospace" fontSize="8" fill="#ff6b35">⚠ SECURITY DASHBOARD</text>

      {/* Metrics */}
      <text x="30" y="82" fontFamily="monospace" fontSize="8" fill="#e2e8f0">GuardDuty Findings:</text>
      <text x="150" y="82" fontFamily="monospace" fontSize="8" fill="#7fff6e">0</text>

      <text x="30" y="98" fontFamily="monospace" fontSize="8" fill="#e2e8f0">SCP Violations:</text>
      <text x="150" y="98" fontFamily="monospace" fontSize="8" fill="#7fff6e">0</text>

      <text x="30" y="114" fontFamily="monospace" fontSize="8" fill="#e2e8f0">IAM Score:</text>
      <text x="150" y="114" fontFamily="monospace" fontSize="8" fill="#7fff6e">98/100</text>

      <text x="30" y="130" fontFamily="monospace" fontSize="8" fill="#e2e8f0">CloudTrail Events:</text>
      <text x="150" y="130" fontFamily="monospace" fontSize="8" fill="#00d4ff">1,247</text>

      <text x="30" y="150" fontFamily="monospace" fontSize="8" fill="#e2e8f0">Config Rules:</text>
      <text x="150" y="150" fontFamily="monospace" fontSize="8" fill="#7fff6e">COMPLIANT</text>

      {/* Account diagram */}
      <rect x="200" y="40" width="185" height="165" rx="3" fill="#0a0e1a" stroke="#1e3a5f" strokeWidth="1" />
      <text x="215" y="60" fontFamily="monospace" fontSize="8" fill="#00d4ff">ACCOUNT TOPOLOGY</text>

      <rect x="215" y="70" width="70" height="50" rx="2" fill="#1e3a5f" stroke="#00d4ff" strokeWidth="0.5" />
      <text x="225" y="85" fontFamily="monospace" fontSize="7" fill="#e2e8f0">PROD</text>
      <text x="225" y="98" fontFamily="monospace" fontSize="6" fill="#64748b">EC2 · RDS</text>
      <text x="225" y="110" fontFamily="monospace" fontSize="6" fill="#64748b">VPC · S3</text>

      <rect x="305" y="70" width="70" height="50" rx="2" fill="#1e3a5f" stroke="#ff6b35" strokeWidth="0.5" />
      <text x="315" y="85" fontFamily="monospace" fontSize="7" fill="#e2e8f0">SECURITY</text>
      <text x="315" y="98" fontFamily="monospace" fontSize="6" fill="#64748b">GuardDuty</text>
      <text x="315" y="110" fontFamily="monospace" fontSize="6" fill="#64748b">CloudTrail</text>

      {/* Arrow */}
      <line x1="285" y1="95" x2="305" y2="95" stroke="#7fff6e" strokeWidth="1" markerEnd="url(#arrow)" />

      <text x="215" y="145" fontFamily="monospace" fontSize="7" fill="#7fff6e">● Zero findings</text>
      <text x="215" y="160" fontFamily="monospace" fontSize="7" fill="#7fff6e">● SCPs enforced</text>
      <text x="215" y="175" fontFamily="monospace" fontSize="7" fill="#7fff6e">● Least privilege</text>
    </g>
  );
}

function CineApiContent() {
  return (
    <g>
      <text x="70" y="16" fontFamily="monospace" fontSize="9" fill="#64748b">
        docker-compose up — cineapi
      </text>

      {/* Docker compose output */}
      <text x="16" y="50" fontFamily="monospace" fontSize="8" fill="#00d4ff">
        [+] Running 4/4
      </text>
      <text x="16" y="65" fontFamily="monospace" fontSize="8" fill="#7fff6e">
        ✔ Container nginx      Started
      </text>
      <text x="16" y="80" fontFamily="monospace" fontSize="8" fill="#7fff6e">
        ✔ Container flask-api  Started
      </text>
      <text x="16" y="95" fontFamily="monospace" fontSize="8" fill="#7fff6e">
        ✔ Container redis      Started
      </text>
      <text x="16" y="110" fontFamily="monospace" fontSize="8" fill="#7fff6e">
        ✔ Container postgres   Started
      </text>

      {/* API response */}
      <rect x="16" y="125" width="368" height="80" rx="3" fill="#0a0e1a" stroke="#1e3a5f" strokeWidth="1" />
      <text x="26" y="142" fontFamily="monospace" fontSize="8" fill="#64748b">
        GET /api/v1/movies HTTP/1.1 — 200 OK
      </text>
      <text x="26" y="158" fontFamily="monospace" fontSize="8" fill="#e2e8f0">
        {`{`}
      </text>
      <text x="26" y="172" fontFamily="monospace" fontSize="8" fill="#00d4ff">
        {`  "movies": [...], "count": 42, "cached": true`}
      </text>
      <text x="26" y="186" fontFamily="monospace" fontSize="8" fill="#e2e8f0">
        {`}`}
      </text>
      <text x="300" y="142" fontFamily="monospace" fontSize="7" fill="#7fff6e">
        12ms ⚡
      </text>
    </g>
  );
}

function CinetrackContent() {
  return (
    <g>
      <text x="70" y="16" fontFamily="monospace" fontSize="9" fill="#64748b">
        gitlab-ci — cinetrack pipeline
      </text>

      {/* Pipeline stages */}
      <text x="16" y="50" fontFamily="monospace" fontSize="8" fill="#e2e8f0">
        Pipeline #847 — main
      </text>

      {/* Stage boxes */}
      <rect x="16" y="60" width="75" height="30" rx="3" fill="#1e3a5f" stroke="#7fff6e" strokeWidth="1" />
      <text x="30" y="78" fontFamily="monospace" fontSize="8" fill="#7fff6e">✓ build</text>

      <line x1="91" y1="75" x2="105" y2="75" stroke="#64748b" strokeWidth="1" />

      <rect x="105" y="60" width="75" height="30" rx="3" fill="#1e3a5f" stroke="#7fff6e" strokeWidth="1" />
      <text x="122" y="78" fontFamily="monospace" fontSize="8" fill="#7fff6e">✓ test</text>

      <line x1="180" y1="75" x2="194" y2="75" stroke="#64748b" strokeWidth="1" />

      <rect x="194" y="60" width="75" height="30" rx="3" fill="#1e3a5f" stroke="#7fff6e" strokeWidth="1" />
      <text x="205" y="78" fontFamily="monospace" fontSize="8" fill="#7fff6e">✓ docker</text>

      <line x1="269" y1="75" x2="283" y2="75" stroke="#64748b" strokeWidth="1" />

      <rect x="283" y="60" width="75" height="30" rx="3" fill="#1e3a5f" stroke="#7fff6e" strokeWidth="1" />
      <text x="295" y="78" fontFamily="monospace" fontSize="8" fill="#7fff6e">✓ deploy</text>

      {/* Deploy log */}
      <rect x="16" y="105" width="368" height="100" rx="3" fill="#0a0e1a" stroke="#1e3a5f" strokeWidth="1" />
      <text x="26" y="122" fontFamily="monospace" fontSize="7" fill="#64748b">deploy:vercel</text>
      <text x="26" y="137" fontFamily="monospace" fontSize="8" fill="#e2e8f0">
        Deploying to production...
      </text>
      <text x="26" y="152" fontFamily="monospace" fontSize="8" fill="#7fff6e">
        ✓ Build completed in 34s
      </text>
      <text x="26" y="167" fontFamily="monospace" fontSize="8" fill="#7fff6e">
        ✓ Deployed to cinetrack.vercel.app
      </text>
      <text x="26" y="182" fontFamily="monospace" fontSize="8" fill="#00d4ff">
        ● Production ready — 0 errors
      </text>

      {/* Duration */}
      <text x="300" y="122" fontFamily="monospace" fontSize="7" fill="#64748b">
        Duration: 2m 14s
      </text>
    </g>
  );
}
