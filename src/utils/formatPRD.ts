import type { PRDResponse } from "../types/prd";

export function formatPRDAsMarkdown(data: PRDResponse): string {
  return `
# ${data.overview.productName}

## Overview
- Owner: ${data.overview.owner}
- Type: ${data.overview.requestType}
- Stakeholders: ${data.overview.stakeholders.join(", ")}

## Problem Statement
${data.problemStatement}

## Decision to Support
${data.decisionToSupport}

## Objectives
${data.objectives.map(o => `- ${o}`).join("\n")}

## Key Business Questions
${data.keyBusinessQuestions.map(q => `- ${q}`).join("\n")}

## Metrics
${data.metrics.map(m => `
- ${m.name}
  - Definition: ${m.definition}
  - Source: ${m.source}
  - Notes: ${m.notes}
`).join("\n")}

## MVP Scope
${data.mvpScope.map(m => `- ${m}`).join("\n")}

## Deferred Scope
${data.deferredScope.map(d => `- ${d}`).join("\n")}

## Risks & Assumptions
${data.risksLimitations.map(r => `- ${r}`).join("\n")}

## Stakeholder Questions
${data.stakeholderQuestions.map(q => `- ${q}`).join("\n")}
`;
}