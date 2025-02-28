"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, ArrowLeft } from "lucide-react";
import { db } from "../../firebase";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { runChat } from "@/lib/geminiHelper"; // Import the helper function

// Web Speech API for Voice Recognition & Speech Synthesis
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "sw-KE";

type Message = {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: number;
};

export default function VoiceInteraction() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");
  const [typedText, setTypedText] = useState("");

  // Reference to the end of messages container for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message))
      );
    });
    return () => unsubscribe();
  }, []);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: isFirstLoad.current ? "auto" : "smooth",
      });
      isFirstLoad.current = false;
    }
  }, [messages]);

  const addMessage = async (text: string, sender: "user" | "assistant") => {
    const newMessage = {
      text,
      sender,
      timestamp: Date.now(),
    };
    await addDoc(collection(db, "messages"), newMessage);
  };

  // Toggle listening functionality
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
    }
  };

  recognition.onresult = (event: any) => {
    const text: string = event.results[0][0].transcript;
    addMessage(text, "user");
    fetchAIResponse(text);
  };
  recognition.onerror = () => setIsListening(false);
  recognition.onend = () => setIsListening(false);

  const buildConversationHistory = () => {
    return messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));
  };

  // Fetch AI response with appointment booking logic
  const fetchAIResponse = async (userText: string) => {
    const history = buildConversationHistory();
    const lowerText = userText.toLowerCase();
    if (lowerText.includes("appointment") || lowerText.includes("book")) {
      const suggestion = `Here are some available doctors for your appointment:
1. Dr. Amina – General Practitioner (for general elderly care)
2. Dr. Rakesh Rajpal – Endocrinologist & General Practitioner (specializes in diabetes and metabolic health)
3. Dr. Polycarp Omendo – General Practitioner (experienced in elderly care)
4. Dr. Consolata Mwangi – Endocrinologist (focused on diabetes and hormonal care)
5. Dr. David Ndonye – Internist (specialist in diabetes, nutrition, and overall metabolic care)
Please type the name of the doctor you'd like to book an appointment with.`;
      addMessage(suggestion, "assistant");
      speak(suggestion);
      setProcessingMessage("");
      return;
    }

    setProcessingMessage("Processing...");
    try {
      const responseText = await runChat(userText, history);
      addMessage(responseText, "assistant");
      speak(responseText);
    } catch (error) {
      console.error("AI Error:", error);
      addMessage("Sorry, I couldn't process that.", "assistant");
    } finally {
      setProcessingMessage("");
    }
  };

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "sw-KE";
    speech.rate = 1.1;
    window.speechSynthesis.speak(speech);
  };

  const handleSendTypedText = () => {
    if (!typedText.trim()) return;
    addMessage(typedText, "user");
    fetchAIResponse(typedText);
    setTypedText("");
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-primary p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2 text-white">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Talk to Mshauri</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="container mx-auto p-4 flex-grow overflow-y-auto">
        <div className="mb-20 rounded-xl bg-gray-50 p-4 shadow-sm">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <div className="whitespace-pre-line text-xl">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                  </Markdown>
                </div>
                <div className="mt-1 text-right text-sm opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {/* Dummy div to auto-scroll into view */}
          <div ref={messagesEndRef} />
          {processingMessage && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-[80%] rounded-2xl bg-gray-200 p-4 text-gray-800">
                <span>{processingMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input & Voice Controls at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md">
        <div className="container mx-auto flex items-center gap-3">
          {/* Text Input */}
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg text-xl"
            placeholder="Type your message..."
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
          />
          <Button
            onClick={handleSendTypedText}
            className="bg-primary text-white px-4 py-3 rounded-lg"
          >
            Send
          </Button>

          {/* Voice Controls */}
          <Button
            onClick={toggleListening}
            className="h-14 w-14 rounded-full bg-primary"
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
          <Button
            onClick={stopSpeech}
            className="h-14 w-14 rounded-full bg-gray-500 text-white"
          >
            Stop
          </Button>
        </div>
      </div>
    </main>
  );
}
