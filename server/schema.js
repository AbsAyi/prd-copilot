export const prdJsonSchema = {
    name: "prd_response",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        diagnosticSummary: {
            type: "object",
            additionalProperties: false,
            properties: {
              executiveSummary: { type: "string" },
              primaryRisk: { type: "string" },
              confidence: {
                type: "string",
                enum: ["Low", "Medium", "High"]
              },
              likelyDrivers: {
                type: "array",
                items: { type: "string" },
                maxItems: 4
              }
            },
            required: ["executiveSummary", "primaryRisk", "confidence", "likelyDrivers"]
          },
        overview: {
          type: "object",
          additionalProperties: false,
          properties: {
            productName: { type: "string" },
            owner: { type: "string" },
            stakeholders: {
              type: "array",
              items: { type: "string" }
            },
            status: { type: "string" },
            requestType: {
              type: "string",
              enum: [
                "Executive Diagnostic Dashboard",
                "Diagnostic Analysis Report",
                "Pipeline",
              ],
            },
          },
          required: ["productName", "owner", "stakeholders", "status", "requestType"]
        },
        problemStatement: { type: "string" },
        decisionToSupport: { type: "string" },
        objectives: {
          type: "array",
          items: { type: "string" }
        },
        keyBusinessQuestions: {
          type: "array",
          items: { type: "string" }
        },
        metrics: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              definition: { type: "string" },
              source: { type: "string" },
              notes: { type: "string" }
            },
            required: ["name", "definition", "source", "notes"]
          }
        },
        dataSources: {
          type: "array",
          items: { type: "string" }
        },
        modelDesign: {
          type: "object",
          additionalProperties: false,
          properties: {
            factTables: {
              type: "array",
              items: { type: "string" }
            },
            dimensions: {
              type: "array",
              items: { type: "string" }
            },
            grain: { type: "string" },
            specialLogic: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["factTables", "dimensions", "grain", "specialLogic"]
        },
        analyticalApproach: {
          type: "array",
          items: { type: "string" }
        },
        outputDesign: {
          type: "object",
          additionalProperties: false,
          properties: {
            format: { type: "string" },
            structure: {
              type: "array",
              items: { type: "string" }
            },
            userFlow: { type: "string" }
          },
          required: ["format", "structure", "userFlow"]
        },
        dataQualityAssumptions: {
          type: "array",
          items: { type: "string" }
        },
        risksLimitations: {
          type: "array",
          items: { type: "string" }
        },
        successCriteria: {
          type: "array",
          items: { type: "string" }
        },
        futureEnhancements: {
          type: "array",
          items: { type: "string" }
        },
        mvpScope: {
          type: "array",
          items: { type: "string" }
        },
        deferredScope: {
          type: "array",
          items: { type: "string" }
        },
        stakeholderQuestions: {
          type: "array",
          items: { type: "string" }
        },
        redFlags: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              detail: { type: "string" },
              severity: {
                type: "string",
                enum: ["low", "medium", "high"]
              }
            },
            required: ["title", "detail", "severity"]
          }
        }
      },
      required: [
        "diagnosticSummary",
        "overview",
        "problemStatement",
        "decisionToSupport",
        "objectives",
        "keyBusinessQuestions",
        "metrics",
        "dataSources",
        "modelDesign",
        "analyticalApproach",
        "outputDesign",
        "dataQualityAssumptions",
        "risksLimitations",
        "successCriteria",
        "futureEnhancements",
        "mvpScope",
        "deferredScope",
        "stakeholderQuestions",
        "redFlags"
      ]
    }
  };