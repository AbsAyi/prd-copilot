import type { MetricDefinition } from "../types/prd";

type MetricsTableProps = {
  metrics: MetricDefinition[];
};

export default function MetricsTable({ metrics }: MetricsTableProps) {
  if (metrics.length === 0) {
    return <p className="metrics-empty">No metrics listed.</p>;
  }

  return (
    <div className="metrics-table-wrap">
      <table className="metrics-table">
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Definition</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => {
            const notes = metric.notes.trim();
            return (
              <tr key={metric.name}>
                <td
                  className="metrics-table-metric"
                  title={notes.length > 0 ? metric.notes : undefined}
                >
                  {metric.name}
                </td>
                <td>{metric.definition}</td>
                <td>{metric.source}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
