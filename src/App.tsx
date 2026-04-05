import { useState } from "react";
import RequestInput from "./components/RequestInput";
import OutputWorkspace from "./components/OutputWorkspace";
import type { PRDResponse } from "./types/prd";
import "./index.css";

export default function App() {
  const [request, setRequest] = useState("");
  const [requestType, setRequestType] = useState("Auto-detect");
  const [result, setResult] = useState<PRDResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setResult(null);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-prd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request, requestType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate PRD.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="page-header">
        <h1>PRD Copilot</h1>
        <p>
          Turn messy analytics requests into structured product requirements.
        </p>
      </header>

      <div className="layout">
        <div className="layout-composer">
          <RequestInput
            value={request}
            requestType={requestType}
            onChange={setRequest}
            onRequestTypeChange={setRequestType}
            onGenerate={handleGenerate}
            loading={loading}
          />
        </div>
        <div className="layout-workspace">
          <OutputWorkspace data={result} />
        </div>
      </div>
    </main>
  );
}
