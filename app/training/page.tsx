"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Play,
  Smartphone,
  CreditCard,
  Video,
  Calendar,
} from "lucide-react";

const trainingModules = [
  {
    title: "Mobile Banking",
    description:
      "Learn how to check your balance, send money, and pay bills using your phone",
    icon: <Smartphone className="h-10 w-10" />,
    color: "bg-blue-100",
    textColor: "text-blue-700",
    slug: "mobile-banking",
  },
  {
    title: "Online Payments",
    description: "Safely make payments online for goods and services",
    icon: <CreditCard className="h-10 w-10" />,
    color: "bg-green-100",
    textColor: "text-green-700",
    slug: "online-payments",
  },
  {
    title: "Telehealth Services",
    description:
      "Connect with your doctor through video calls and manage appointments",
    icon: <Video className="h-10 w-10" />,
    color: "bg-purple-100",
    textColor: "text-purple-700",
    slug: "telehealth-services",
  },
  {
    title: "Calendar & Reminders",
    description: "Set up reminders for medications and appointments",
    icon: <Calendar className="h-10 w-10" />,
    color: "bg-amber-100",
    textColor: "text-amber-700",
    slug: "calendar-reminders",
  },
];

export default function TrainingPage() {
  const [progress, setProgress] = useState(35); // Hardcoded progress percentage

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-primary p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2 text-white">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">
            Digital Skills Training
          </h1>
        </div>
      </header>

      {/* Training Modules */}
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Learn Essential Digital Skills
          </h2>
          <p className="text-xl text-gray-600">
            Step-by-step voice-guided tutorials to help you use digital services
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {trainingModules.map((module, index) => (
            <TrainingModule key={index} {...module} />
          ))}
        </div>

        {/* Progress Section */}
        <div className="mt-10 rounded-xl bg-gray-100 p-6">
          <h3 className="mb-2 text-2xl font-semibold text-gray-800">
            Your Progress
          </h3>
          <div className="mb-4 h-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-lg text-gray-600">
            You've completed 2 out of 6 lessons. Keep going!
          </p>
          <div className="mt-4">
            <Button className="gap-2 text-lg">
              <Play className="h-5 w-5" />
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

interface TrainingModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  slug: string;
}

function TrainingModule({
  title,
  description,
  icon,
  color,
  textColor,
  slug,
}: TrainingModuleProps) {
  return (
    <Link href={`/trainingdetail/${slug}`}>
      <div className="flex cursor-pointer flex-col rounded-xl border-2 border-red-200 p-6 transition-all hover:border-primary hover:shadow-md">
        <div
          className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${color}`}
        >
          <div className={textColor}>{icon}</div>
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h3>
        <p className="mb-4 text-lg text-gray-600">{description}</p>
        <Button variant="outline" className="mt-auto gap-2 self-start">
          <Play className="h-4 w-4" /> Start Tutorial
        </Button>
      </div>
    </Link>
  );
}
