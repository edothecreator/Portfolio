/* ─── Section header: shell prompt line + large title + gradient rule ─── */
export default function SectionHeader({
  path,
  command,
  title,
}: {
  path: string;
  command: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p aria-hidden="true" className="font-mono text-xs sm:text-sm text-muted break-words">
        <span className="text-secondary">edo@cloudstack</span>:
        <span className="text-primary">~/{path}</span>$ {command}
      </p>
      <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-bold text-text">{title}</h2>
      <div
        aria-hidden="true"
        className="mt-4 h-px w-full bg-linear-to-r from-primary/70 via-border to-transparent"
      />
    </div>
  );
}
