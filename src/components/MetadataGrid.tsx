import type { PRDResponse } from "../types/prd";

type MetadataGridProps = {
  overview: PRDResponse["overview"];
};

export default function MetadataGrid({ overview }: MetadataGridProps) {
  const items = [
    { label: "Product", value: overview.productName },
    { label: "Output", value: overview.requestType },
    { label: "Owner", value: overview.owner },
    {
      label: "Stakeholders",
      value: overview.stakeholders.join(", "),
    },
  ];

  return (
    <div className="metadata-grid">
      {items.map((item) => (
        <div key={item.label} className="metadata-card">
          <div className="metadata-card-label">{item.label}</div>
          <div className="metadata-card-value">{item.value || "—"}</div>
        </div>
      ))}
    </div>
  );
}
