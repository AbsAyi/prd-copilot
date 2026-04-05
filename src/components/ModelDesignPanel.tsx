import type { PRDResponse } from "../types/prd";

type ModelDesignPanelProps = {
  modelDesign: PRDResponse["modelDesign"] | null;
};

export default function ModelDesignPanel({ modelDesign }: ModelDesignPanelProps) {
  if (!modelDesign) {
    return (
      <div className="panel-empty">
        <p>No model design yet.</p>
      </div>
    );
  }

  return (
    <div className="model-design-panel">
      <p>
        <strong>Fact Tables:</strong>{" "}
        <span className="model-chip-row">
          {modelDesign.factTables.map((name, i) => (
            <span key={`${name}-${i}`} className="model-chip">
              {name}
            </span>
          ))}
        </span>
      </p>
      <p>
        <strong>Dimensions:</strong>{" "}
        <span className="model-chip-row">
          {modelDesign.dimensions.map((name, i) => (
            <span key={`${name}-${i}`} className="model-chip">
              {name}
            </span>
          ))}
        </span>
      </p>
      <p>
        <strong>Grain:</strong> {modelDesign.grain}
      </p>
      <div className="model-design-special-logic">
        <h3 className="model-design-subheading">Special logic</h3>
        <ul>
          {modelDesign.specialLogic.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
