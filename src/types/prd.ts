export type MetricDefinition = {
  name: string;
  definition: string;
  source: string;
  notes: string;
};

export type RedFlag = {
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
};

export type DiagnosticSummary = {
  executiveSummary: string;
  primaryRisk: string;
  confidence: "Low" | "Medium" | "High";
  likelyDrivers: string[];
};

export type PRDResponse = {
  diagnosticSummary: DiagnosticSummary;
  overview: {
    productName: string;
    owner: string;
    stakeholders: string[];
    status: string;
    requestType:
      | "Executive Diagnostic Dashboard"
      | "Diagnostic Analysis Report"
      | "Pipeline";
  };
  problemStatement: string;
  decisionToSupport: string;
  objectives: string[];
  keyBusinessQuestions: string[];
  metrics: MetricDefinition[];
  dataSources: string[];
  modelDesign: {
    factTables: string[];
    dimensions: string[];
    grain: string;
    specialLogic: string[];
  };
  analyticalApproach: string[];
  outputDesign: {
    format: string;
    structure: string[];
    userFlow: string;
  };
  dataQualityAssumptions: string[];
  risksLimitations: string[];
  successCriteria: string[];
  futureEnhancements: string[];
  mvpScope: string[];
  deferredScope: string[];
  stakeholderQuestions: string[];
  redFlags: RedFlag[];
};