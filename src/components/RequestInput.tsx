const REQUEST_TYPE_OPTIONS = [
  "Auto-detect",
  "Dashboard",
  "Report",
  "Pipeline",
] as const;

type RequestInputProps = {
  value: string;
  requestType: string;
  onChange: (value: string) => void;
  onRequestTypeChange: (value: string) => void;
  onGenerate: () => void;
  loading?: boolean;
};

export default function RequestInput({
  value,
  requestType,
  onChange,
  onRequestTypeChange,
  onGenerate,
  loading = false,
}: RequestInputProps) {
  return (
    <section className="card card-composer">
      <h2 className="composer-title">Stakeholder Request</h2>

      <div className="request-type-field">
        <span className="request-type-label" id="request-type-label">
          Request Type
        </span>
        <div
          className="request-type-pills"
          role="group"
          aria-labelledby="request-type-label"
        >
          {REQUEST_TYPE_OPTIONS.map((opt) => {
            const selected = requestType === opt;
            return (
              <button
                key={opt}
                type="button"
                className={`request-type-pill${selected ? " request-type-pill-selected" : ""}`}
                onClick={() => onRequestTypeChange(opt)}
                aria-pressed={selected}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste a messy stakeholder request here..."
        rows={10}
      />

      <button
        type="button"
        className="btn-primary"
        onClick={onGenerate}
        disabled={loading || !value.trim()}
      >
        {loading ? "Generating..." : "Generate PRD"}
      </button>
    </section>
  );
}
