import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import type { ChatFile, GeneratedCode } from "../types";

let chat: Chat | null = null;
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 30000; // Reduced to 30 seconds
const MAX_RETRIES = 5; // Increased retries

const getApiKey = (): string => {
  try {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem("geminiApiKey")) || "";
    if (stored && stored.trim() !== "") return stored.trim();
  } catch (_) {
    // Ignore storage access errors (e.g., privacy mode)
  }
  const envKey = (import.meta as any).env?.VITE_GOOGLE_API_KEY || "";
  if (envKey && String(envKey).trim() !== "") return String(envKey).trim();
  throw new Error("Set your Gemini API key in Settings or .env as VITE_GOOGLE_API_KEY");
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const checkRateLimit = async (): Promise<void> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const waitTime = RATE_LIMIT_DELAY - timeSinceLastRequest;
    console.log(`Rate limit active. Waiting ${Math.ceil(waitTime / 1000)} seconds...`);
    await sleep(waitTime);
  }
  
  lastRequestTime = Date.now();
};

export const startChat = () => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

const fileToGenerativePart = (file: ChatFile) => {
  return {
    inlineData: {
      mimeType: file.type,
      data: file.data,
    },
  };
};

export const sendMessage = async (
  message: string,
  files?: ChatFile[]
): Promise<string> => {
  if (!chat) {
    startChat();
  }

  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      await checkRateLimit();
      
      const messageParts: any[] = [{ text: message }];

      if (files && files.length > 0) {
        files.forEach((file) => {
          messageParts.push(fileToGenerativePart(file));
        });
      }

      const response: GenerateContentResponse = await (chat as Chat).sendMessage({
        message: messageParts,
      });

      return response.text;
      
    } catch (error: any) {
      console.error(`Attempt ${retries + 1} failed:`, error);
      
      // Check if it's a rate limit error
      if (error?.error?.code === 429 || 
          error?.message?.includes("RESOURCE_EXHAUSTED") ||
          error?.message?.includes("Quota exceeded")) {
        
        retries++;
        if (retries < MAX_RETRIES) {
          const waitTime = Math.min(30000 * retries, 120000); // Max 2 minutes, progressive delay
          console.log(`Rate limit hit. Waiting ${waitTime / 1000} seconds before retry ${retries + 1}/${MAX_RETRIES}...`);
          await sleep(waitTime);
          continue;
        } else {
          throw new Error(`Rate limit exceeded after ${MAX_RETRIES} retries. Please wait 2-3 minutes and try again, or create a new API key from Google AI Studio.`);
        }
      }
      
      // For other errors, throw immediately
      if (error instanceof Error) {
        throw new Error(`Failed to get response. Details: ${error.message}`);
      }
      throw new Error("An unknown error occurred while sending the message.");
    }
  }
  
  throw new Error("Maximum retries exceeded");
};

export const parseCodeResponse = (
  responseText: string
): GeneratedCode | null => {
  try {
    // Regex to find JSON in markdown ```json ... ``` or as a raw string
    const jsonMatch = responseText.match(
      /```json\n([\s\S]*?)\n```|({[\s\S]*})/
    );
    if (!jsonMatch) return null;

    const jsonString = jsonMatch[1] || jsonMatch[2];
    if (!jsonString) return null;

    const parsed = JSON.parse(jsonString);

    // Basic validation: is it an object, and are its values strings?
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      const allValuesAreStrings = Object.values(parsed).every(
        (value) => typeof value === "string"
      );
      if (Object.keys(parsed).length > 0 && allValuesAreStrings) {
        return parsed as GeneratedCode;
      }
    }
    return null;
  } catch (e) {
    console.warn(
      "Failed to parse AI response as JSON code:",
      responseText,
      e
    );
    return null;
  }
};

export default sendMessage;