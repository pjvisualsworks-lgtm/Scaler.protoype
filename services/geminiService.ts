
import { GoogleGenAI } from "@google/genai";

export async function evaluateAnswer(
  question: string, 
  answer: string, 
  questionImage?: { data: string, mimeType: string },
  answerImage?: { data: string, mimeType: string }
): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a high-level, strict CBSE Board Examiner for Class 10. 
    Your evaluation must strictly adhere to the following CBSE protocols:
    1. MARKING SCHEME: Allocate exactly 1 mark per valid scientific/historical/mathematical point or reasoning, up to a maximum of 5.
    2. KEYWORDS: CBSE marking is keyword-centric. If the essential technical terms (as per NCERT) are missing, deduct marks even if the general explanation is correct.
    3. STRUCTURE: Prioritize answers that use bullet points, sub-headings, and clear definitions.
    4. ACCURACY: Use NCERT textbooks as the primary source of truth.
    5. COMPETENCY: Evaluate for conceptual clarity, not just rote memorization.
    
    SPECIAL RULE: If you do not know something or if a required piece of information is missing from the student's answer, write "Not mentioned by student".
    
    Do not praise the student. Be clinical, objective, and exam-focused.
    Do not add any extra text outside the specified format. Respond ONLY with the requested sections.
    
    IMPORTANT: 
    - If a student answer image is provided, perform precise OCR.
    - If keywords are missing, explicitly list them in the 'Missing' section.
  `;

  const promptText = `
    --- CONTEXT ---
    Question Text: ${question || "Refer to Question Image."}
    Student Answer Text: ${answer || "Refer to Student Answer Image."}

    --- TASK ---
    Evaluate this response based on CBSE Class 10 Board Standards.

    Instructions:
    - Marks: Provide a score out of 5 (e.g., 3.5/5).
    - Correct Points: Identify valid points that earn marks. If none, write "Not mentioned by student".
    - Missing / Incorrect Points: Identify missing technical keywords or conceptual errors. If none, write "Not mentioned by student".
    - Suggested Writing Approach: Breakdown the structure (e.g., 'Define X, explain process Y in 3 points, provide 1 example').
    - Suggested Model Answer: A perfect 'Topper-style' answer with mandatory keywords in **bold**.
    - Examiner Tips: 2 strategic tips to avoid losing marks in the actual board exam.

    Respond ONLY in this format:

    Marks: X/5

    Correct Points:
    - ...

    Missing / Incorrect Points:
    - ...

    Suggested Writing Approach:
    ...

    Suggested Model Answer:
    ...

    Examiner Tips:
    - ...
    - ...
  `;

  const parts: any[] = [{ text: promptText }];
  
  if (questionImage) {
    parts.push({
      inlineData: {
        data: questionImage.data,
        mimeType: questionImage.mimeType
      }
    });
  }

  if (answerImage) {
    parts.push({
      inlineData: {
        data: answerImage.data,
        mimeType: answerImage.mimeType
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts },
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1,
      },
    });

    return response.text || null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
