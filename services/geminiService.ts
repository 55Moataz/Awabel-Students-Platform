
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the Gemini API client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseStudentData = async (inputText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: inputText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING },
            village: { type: Type.STRING },
            university: { type: Type.STRING },
            college: { type: Type.STRING },
            major: { type: Type.STRING },
            academicLevel: { type: Type.STRING },
            studyLocation: { type: Type.STRING },
            isComplete: { type: Type.BOOLEAN, description: "True if all core fields are present" },
            missingFields: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["fullName", "village", "university", "college", "major", "academicLevel", "studyLocation", "isComplete"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const getGeneralResponse = async (chatHistory: { role: string; parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: chatHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text;
  } catch (error) {
    return "عذراً، حدث خطأ في معالجة طلبك.";
  }
};
