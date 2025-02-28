import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-primary p-4 text-center">
        <h1 className="text-4xl font-bold text-white">Mshauri AI</h1>
        <p className="text-xl text-white">Your Friendly Digital Assistant</p>
      </header>

      {/* Notification Banner */}
      <div className="bg-amber-100 p-4 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          <span className="text-2xl font-medium text-amber-800">
            Reminder: Take your blood pressure medication at 2:00 PM today • Dr. Kamau appointment tomorrow at 10:00 AM
            • New message from your daughter Mary
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Voice Activation */}
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-gray-50 p-8 shadow-md">
            <h2 className="text-3xl font-bold text-gray-800">How can I help you today?</h2>
            <p className="text-center text-xl text-gray-600">Press the button below and speak to me</p>
            <Button
              className="h-32 w-32 rounded-full bg-primary text-2xl hover:bg-primary/90"
              aria-label="Activate voice assistant"
            >
              <Mic className="mr-2 h-12 w-12" />
              <span className="sr-only">Speak</span>
            </Button>
            <p className="text-center text-lg text-gray-600">Say "Hello Mshauri" or press the button</p>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/voice-interaction">
                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-blue-100 p-6 text-center shadow-sm transition-colors hover:bg-blue-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-700"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                  <span className="text-2xl font-medium text-blue-700">Talk to Mshauri</span>
                </div>
              </Link>
              <Link href="/training">
                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-green-100 p-6 text-center shadow-sm transition-colors hover:bg-green-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-700"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span className="text-2xl font-medium text-green-700">Learn Digital Skills</span>
                </div>
              </Link>
              <Link href="/language">
                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-purple-100 p-6 text-center shadow-sm transition-colors hover:bg-purple-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-700"
                  >
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                  </svg>
                  <span className="text-2xl font-medium text-purple-700">Change Language</span>
                </div>
              </Link>
              <Link href="/settings">
                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-gray-200 p-6 text-center shadow-sm transition-colors hover:bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-2xl font-medium text-gray-700">Settings & Help</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

