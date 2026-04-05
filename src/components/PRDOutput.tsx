import type { PRDResponse } from "../types/prd";
import MetadataGrid from "./MetadataGrid";
import MetricsTable from "./MetricsTable";

type PRDOutputProps = {
  data: PRDResponse | null;
  /** Hide Model Design when shown in a dedicated tab. */
  hideModelDesign?: boolean;
};

export default function PRDOutput({
  data,
  hideModelDesign = false,
}: PRDOutputProps) {
  if (!data) {
    return (
      <div className="panel-empty">
        <p>No PRD generated yet.</p>
      </div>
    );
  }

  const diagnostic = data.diagnosticSummary;
  const normalizedPrimaryRisk = diagnostic.primaryRisk
  .replace(/^The biggest risk is\s*/i, "")
  .replace(/^Biggest risk is\s*/i, "")
  .replace(/^that\s+/i, "")
  .replace(/\.$/, "")
  .trim();

const concisePrimaryRisk = normalizedPrimaryRisk
  .split(". ")[0]
  .replace(/\.$/, "")
  .trim();

const visibleDrivers = diagnostic.likelyDrivers.slice(0, 4);

const confidenceLabel = `${diagnostic.confidence} Confidence`;

const executiveSummary =
  diagnostic.executiveSummary?.trim() ||
  (concisePrimaryRisk
    ? `${concisePrimaryRisk.charAt(0).toUpperCase()}${concisePrimaryRisk.slice(
        1
      )} may be creating false contradictions and undermining trust ahead of the executive review.`
    : "");

  return (
    <section className="prd-output">
      <MetadataGrid overview={data.overview} />

      <div className="diagnostic-summary" aria-label="Diagnostic Summary">
  <div className="diagnostic-summary-top">
    <div className="diagnostic-summary-header">Diagnostic Summary</div>
    <span
      className={`diagnostic-confidence-chip diagnostic-confidence-chip--${diagnostic.confidence.toLowerCase()}`}
      aria-label={confidenceLabel}
    >
      {confidenceLabel}
    </span>
  </div>

  {executiveSummary ? (
    <p className="diagnostic-summary-exec">{executiveSummary}</p>
  ) : null}

  {concisePrimaryRisk ? (
    <div className="diagnostic-summary-section">
      <div className="diagnostic-summary-subtitle">Primary Risk</div>
      <p className="diagnostic-summary-risk">{concisePrimaryRisk}</p>
    </div>
  ) : null}

  {visibleDrivers.length > 0 ? (
    <div className="diagnostic-summary-section">
      <div className="diagnostic-summary-subtitle">Likely Drivers</div>
      <ul className="diagnostic-summary-driver-list">
        {visibleDrivers.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  ) : null}
</div>

      <h3>Problem Statement</h3>
      <p>{data.problemStatement}</p>

      <h3>Decision to Support</h3>
      <p>{data.decisionToSupport}</p>

      <h3>Objectives</h3>
      <ul>
        {data.objectives.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>Key Business Questions</h3>
      <ul>
        {data.keyBusinessQuestions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>Metrics</h3>
      <MetricsTable metrics={data.metrics} />

      <h3>Data Sources</h3>
      <ul>
        {data.dataSources.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {!hideModelDesign ? (
        <>
          <h3>Model Design</h3>
          <p>
            <strong>Fact Tables:</strong> {data.modelDesign.factTables.join(", ")}
          </p>
          <p>
            <strong>Dimensions:</strong> {data.modelDesign.dimensions.join(", ")}
          </p>
          <p>
            <strong>Grain:</strong> {data.modelDesign.grain}
          </p>
          <ul>
            {data.modelDesign.specialLogic.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h3>MVP Scope</h3>
      <ul>
        {data.mvpScope.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>Deferred Scope</h3>
      <ul>
        {data.deferredScope.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>Stakeholder Questions</h3>
      <ul>
        {data.stakeholderQuestions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
