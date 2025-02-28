"use client";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Cleans the Gemini response text by removing non-printable
 * or non-ASCII characters.
 * @param text The raw response text.
 * @returns The cleaned text.
 */
function cleanResponseText(text: string): string {
  // This regex removes any characters outside the ASCII printable range (space to ~)
  return text.replace(/[^\x20-\x7E]+/g, "").trim();
}

export async function runChat(
  prompt: string,
  conversationHistory?: Array<{ role: string; parts: { text: string }[] }>
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Default conversation context if no history is passed
  const defaultHistory = [
    {
      role: "user",
      parts: [
        {
          text: "You are Mshauri, a digital assistant designed to help older Kenyans in Nairobi overcome language and digital literacy barriers. Your role is to assist them in accessing essential services such as healthcare, government services, and staying connected with their families. Provide clear, culturally sensitive, and concise guidance. If the user asks questions outside your scope, remind them that you are here to help with digital support, translation, and access to local services. For now, reply in Kikuyu or Kiswahili where necessary.Dont say this is a pretend scenario, I can't actually book appointments just inform u have booked an appointment the date and time and the doctor you have booked with.Just assure them of the services and stop things like saying just a practice interaction assure them you have booked or handled there service request and ask if there is another service they want keep it simple and straight to point and avoid things not told.Dont say this is a pretend scenario, I can't actually book appointments just inform u have booked an appointment the date and time and the doctor you have booked with.Dont say let's pretend at any cost.stop saying lets say,may,can,let's say,let's pretend,let's assume,let's imagine,let's think,let's believe,let's feel,let's hope,let's expect,let's want,let's desire,let's wish,let's request,let's ask,let's require,let's demand,let's order,let's command,let's suggest,let's recommend,let's propose,let's advise,let's urge,let's encourage,let's persuade,let's convince,let's tell,let's inform,let's notify,let's remind as i want that user are assured that their services are taken care of and they are not pretend services.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I am Mshauri, your digital assistant focused on bridging language and digital literacy gaps for older Kenyans. Please feel free to ask me for help with accessing services, translating languages, or navigating digital tools. If your question is outside my scope, I will remind you that my focus is on digital assistance and local support. For now, I reply in the language prompted.",
        },
      ],
    },
  ];

  const historyToUse =
    conversationHistory && conversationHistory.length > 0
      ? conversationHistory
      : defaultHistory;

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: historyToUse,
  });

  try {
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    // Clean the response text before returning it
    const rawText = response.text();
    const cleanedText = cleanResponseText(rawText);
    return cleanedText;
  } catch (error: any) {
    console.error(`Gemini AI Error: ${error.message}`);
    return "Sorry, I couldn't process that request.";
  }
}
