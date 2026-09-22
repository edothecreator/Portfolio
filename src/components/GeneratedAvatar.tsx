"use client";

/**
 * Programmatic avatar — a stylized "E" monogram with terminal/cloud aesthetic.
 * Replace the `src` in Hero.tsx with your actual photo later.
 */
export default function GeneratedAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Edo's profile picture"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a0e1a" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#7fff6e" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="100" cy="100" r="96" fill="none" stroke="url(#ring-grad)" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="90" fill="url(#avatar-grad)" />

      {/* Grid pattern inside */}
      <g opacity="0.08">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="20" y1={30 + i * 20} x2="180" y2={30 + i * 20} stroke="#00d4ff" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={30 + i * 20} y1="20" x2={30 + i * 20} y2="180" stroke="#00d4ff" strokeWidth="0.5" />
        ))}
      </g>

      {/* Terminal prompt symbol */}
      <text x="50" y="80" fontFamily="monospace" fontSize="14" fill="#64748b" opacity="0.6">
        $&gt;
      </text>

      {/* Big "E" monogram */}
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="72"
        fontWeight="bold"
        fill="#00d4ff"
      >
        E
      </text>

      {/* Subtitle */}
      <text x="100" y="155" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#7fff6e">
        cloud://edo
      </text>

      {/* Status dot */}
      <circle cx="155" cy="45" r="6" fill="#7fff6e">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
