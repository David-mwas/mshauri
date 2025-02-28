"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

// Hardcoded training data keyed by slug
const trainingData: Record<
  string,
  {
    title: string;
    description: string;
    lessons: { lesson: string; duration: string }[];
  }
> = {
  "mobile-banking": {
    title: "Mobile Banking",
    description:
      "Learn how to check your balance, send money, and pay bills using your phone. In this tutorial, you will explore the features of mobile banking apps, learn how to perform transactions safely, and troubleshoot common issues.",
    lessons: [
      { lesson: "Introduction to Mobile Banking", duration: "5 min" },
      { lesson: "Navigating the App", duration: "10 min" },
      { lesson: "Making Transactions", duration: "8 min" },
      { lesson: "Troubleshooting", duration: "7 min" },
    ],
  },
  "online-payments": {
    title: "Online Payments",
    description:
      "Learn how to safely make payments online for goods and services. This tutorial covers security tips, various payment methods, and how to resolve issues while paying online.",
    lessons: [
      { lesson: "Overview of Online Payments", duration: "6 min" },
      { lesson: "Payment Methods", duration: "8 min" },
      { lesson: "Security Best Practices", duration: "10 min" },
    ],
  },
  "telehealth-services": {
    title: "Telehealth Services",
    description:
      "Discover how to connect with your doctor via video calls, manage appointments, and access health services remotely. This tutorial walks you through the setup process and usage tips.",
    lessons: [
      { lesson: "Getting Started with Telehealth", duration: "5 min" },
      { lesson: "Setting Up a Video Call", duration: "7 min" },
      { lesson: "Managing Appointments", duration: "8 min" },
    ],
  },
  "calendar-reminders": {
    title: "Calendar & Reminders",
    description:
      "Learn how to set up and manage reminders for medications, appointments, and other important events using digital calendars. This module covers the basics and some advanced features.",
    lessons: [
      { lesson: "Introduction to Digital Calendars", duration: "4 min" },
      { lesson: "Setting Up Reminders", duration: "6 min" },
      { lesson: "Advanced Scheduling Features", duration: "7 min" },
    ],
  },
};

export default function TrainingDetailPage() {
  const params = useParams();
  const slug = params.slug as string; // Ensure slug is a string
  const router = useRouter();

  // If no slug is present, render a fallback
  if (!slug) {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </main>
    );
  }

  const moduleData = trainingData[slug];

  // If the module doesn't exist, show a "not found" message.
  if (!moduleData) {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold">Module Not Found</h1>
        <Link href="/training">
          <Button className="mt-4">Back to Training Modules</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.push("/training")}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">{moduleData.title}</h1>
      </header>

      {/* Module Description */}
      <section className="mb-8">
        <p className="text-xl text-gray-600">{moduleData.description}</p>
      </section>

      {/* Lessons List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lessons</h2>
        <ul className="space-y-4">
          {moduleData.lessons.map((lesson, index) => (
            <li
              key={index}
              className="p-4 border rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{lesson.lesson}</span>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
              <div className="mt-2">
                <Button
                  variant="outline"
                  className="gap-2 text-lg"
                  onClick={() =>
                    router.push(`/trainingdetail/${slug}/lesson/${index}`)
                  }
                >
                  <Play className="h-5 w-5" /> Start Lesson
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Back Button */}
      <div>
        <Button
          className="gap-2 text-lg"
          onClick={() => router.push("/training")}
        >
          <ArrowLeft className="h-5 w-5" /> Back to Training Modules
        </Button>
      </div>
    </main>
  );
}
