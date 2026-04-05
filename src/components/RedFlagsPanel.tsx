import type { PRDResponse } from "../types/prd";

const SEVERITY_RANK: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function severityRank(severity: string): number {
  return SEVERITY_RANK[severity] ?? 0;
}

type RedFlagsPanelProps = {
  data: PRDResponse | null;
  /** When true, omit outer card and heading (e.g. inside tabs). */
  embedded?: boolean;
};

export default function RedFlagsPanel({
  data,
  embedded = false,
}: RedFlagsPanelProps) {
  const list = (
    <>
      {!data || data.redFlags.length === 0 ? (
        <p>No red flags yet.</p>
      ) : (
        <ul className={embedded ? "red-flags-list" : undefined}>
          {[...data.redFlags]
            .sort(
              (a, b) =>
                severityRank(b.severity) - severityRank(a.severity)
            )
            .map((flag) => (
              <li key={flag.title} className={`flag ${flag.severity}`}>
                <strong>{flag.title}</strong> ({flag.severity})
                <span className="red-flag-detail"> — {flag.detail}</span>
              </li>
            ))}
        </ul>
      )}
    </>
  );

  if (embedded) {
    return <div className="red-flags-panel red-flags-panel--embedded">{list}</div>;
  }

  return (
    <section className="card">
      <h2>Red Flags</h2>
      {list}
    </section>
  );
}
