import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini Client
// Use process.env.API_KEY as per guidelines and to avoid ImportMeta issues
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the schema for the structured output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    standoutScore: { type: Type.NUMBER, description: "Overall score 0-100 based on impact and presentation" },
    atsMatchScore: { type: Type.NUMBER, description: "Score 0-100 based on keyword optimization for the target role" },
    skillRelevanceScore: { type: Type.NUMBER, description: "Score 0-100 based on how well skills match the target industry" },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of top 3-5 strong points" },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of top 3-5 weak points" },
    atsIssues: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific formatting or keyword issues that might block ATS" },
    skillsFound: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Relevant skills found in the resume" },
    missingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Critical skills for the role that are missing" },
    sectionAnalysis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          sectionName: { type: Type.STRING },
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          status: { type: Type.STRING, enum: ["Excellent", "Good", "Needs Improvement", "Critical"] }
        }
      }
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
        }
      }
    },
    rewrittenSamples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING, description: "The name of the section or a snippet description" },
          improved: { type: Type.STRING, description: "An improved version of a summary or bullet point" },
          reasoning: { type: Type.STRING }
        }
      },
      description: "Provide 2-3 examples of how specific weak sections could be rewritten."
    },
    summary: { type: Type.STRING, description: "A professional summary paragraph of the evaluation." }
  }
};

export const analyzeResumeWithGemini = async (
  fileBase64: string,
  industry: string,
  position: string
): Promise<AnalysisResult> => {
  try {
    const modelId = "gemini-2.5-flash";
    
    // Clean base64 string if it contains data URI prefix
    const cleanBase64 = fileBase64.replace(/^data:application\/pdf;base64,/, "");

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: cleanBase64
            }
          },
          {
            text: `You are an expert Resume Evaluator and Career Coach. 
            Analyze the attached PDF resume for a candidate applying to the **${industry}** industry for the position of **${position}**.
            
            Provide a strict, constructive, and professional evaluation.
            Focus on:
            1. Impact and quantifiable achievements.
            2. Keyword matching for ATS (Applicant Tracking Systems).
            3. Formatting, readability, and tone.
            
            Return the result strictly as JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more analytical results
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("No response received from Gemini.");
    }

    const result: AnalysisResult = JSON.parse(textResponse);
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};