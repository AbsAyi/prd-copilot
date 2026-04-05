import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { PRD_SYSTEM_PROMPT } from "./prompt.js";
import { prdJsonSchema } from "./schema.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/generate-prd", async (req, res) => {
  try {
    const { request, requestType } = req.body;

    if (!request || !request.trim()) {
      return res.status(400).json({ error: "Request text is required." });
    }

    const response = await client.chat.completions.create({
        model: "gpt-5.4",
        messages: [
          {
            role: "developer",
            content: PRD_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `
      Create a structured PRD draft from this stakeholder request:
      
      ${request}
      
      Request type preference: ${requestType}
      
      Additional instructions:
      - If request type is "Auto-detect", infer the best type
      - If request type is provided, respect it unless the request clearly contradicts it
      - Keep objectives to 3-5 items
      - Keep key business questions decision-oriented
      - Prefer practical MVP scope
      - Include assumptions when definitions are unclear
      - Include red flags when the request could break trust or cause implementation problems
      - Suggest likely metrics, data sources, fact tables, dimensions, and grain where reasonable
      `
          }
        ],
        response_format: {
          type: "json_schema",
          json_schema: prdJsonSchema
      }
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: "No content returned from model." });
    }

    const parsed = JSON.parse(content);
    res.json(parsed);
  } catch (error) {
    console.error("PRD generation error:", error);
    res.status(500).json({
      error: "Failed to generate PRD.",
      details: error?.message || "Unknown error"
    });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});