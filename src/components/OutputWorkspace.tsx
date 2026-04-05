import { useState } from "react";
import { formatPRDAsMarkdown } from "../utils/formatPRD";
import type { PRDResponse } from "../types/prd";
import PRDOutput from "./PRDOutput";
import RedFlagsPanel from "./RedFlagsPanel";
import ModelDesignPanel from "./ModelDesignPanel";

type TabId = "prd" | "flags" | "dataModel";

type OutputWorkspaceProps = {
  data: PRDResponse | null;
};

export default function OutputWorkspace({ data }: OutputWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabId>("prd");

  const flagCount = data?.redFlags.length ?? 0;
  const markdown = data ? formatPRDAsMarkdown(data) : "";

  const copyMarkdown = () => {
    if (!data) return;
    void navigator.clipboard.writeText(markdown);
    alert("Copied as Markdown!");
  };

  const exportMarkdown = () => {
    if (!data) return;
    const blob = new Blob([markdown], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prd-draft.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: "prd", label: "PRD Output" },
    { id: "flags", label: "Red Flags" },
    { id: "dataModel", label: "Data Model" },
  ];

  return (
    <section className="output-workspace" aria-label="Results">
      <div className="output-workspace-toolbar">
        <div className="tab-list" role="tablist" aria-label="Output views">
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                className={`tab-trigger${selected ? " tab-trigger-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-trigger-label">{tab.label}</span>
                {tab.id === "flags" && flagCount > 0 ? (
                  <span className="tab-badge" aria-label={`${flagCount} red flags`}>
                    {flagCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="output-workspace-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={copyMarkdown}
            disabled={!data}
          >
            Copy as Markdown
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={exportMarkdown}
            disabled={!data}
          >
            Export
          </button>
        </div>
      </div>

      <div className="output-workspace-body">
        <div
          role="tabpanel"
          id="panel-prd"
          aria-labelledby="tab-prd"
          hidden={activeTab !== "prd"}
          className="tab-panel"
        >
          <PRDOutput data={data} hideModelDesign />
        </div>
        <div
          role="tabpanel"
          id="panel-flags"
          aria-labelledby="tab-flags"
          hidden={activeTab !== "flags"}
          className="tab-panel"
        >
          <RedFlagsPanel data={data} embedded />
        </div>
        <div
          role="tabpanel"
          id="panel-dataModel"
          aria-labelledby="tab-dataModel"
          hidden={activeTab !== "dataModel"}
          className="tab-panel"
        >
          <ModelDesignPanel modelDesign={data?.modelDesign ?? null} />
        </div>
      </div>
    </section>
  );
}
