import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"

export default function LanguagePage() {
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
          <h1 className="text-3xl font-bold text-white">Language Settings</h1>
        </div>
      </header>

      {/* Language Selection */}
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Select Your Preferred Language</h2>
          <p className="text-xl text-gray-600">Mshauri will speak and display text in your chosen language</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <LanguageOption name="English" isSelected={true} />
          <LanguageOption name="Kiswahili" isSelected={false} />
          <LanguageOption name="Kikuyu" isSelected={false} />
          <LanguageOption name="Luo" isSelected={false} />
          <LanguageOption name="Kamba" isSelected={false} />
          <LanguageOption name="Kalenjin" isSelected={false} />
        </div>

        <div className="mt-8 rounded-xl bg-amber-50 p-6">
          <h3 className="mb-2 text-2xl font-semibold text-amber-800">Voice Speed</h3>
          <p className="mb-4 text-lg text-amber-700">Adjust how fast Mshauri speaks to you</p>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Slow</span>
            <input
              type="range"
              min="1"
              max="5"
              defaultValue="3"
              className="h-4 w-full appearance-none rounded-full bg-amber-200 accent-primary"
              aria-label="Voice speed"
            />
            <span className="text-lg font-medium">Fast</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="px-8 py-6 text-xl">Save Language Preferences</Button>
        </div>
      </div>
    </main>
  )
}

function LanguageOption({ name, isSelected }: { name: string; isSelected: boolean }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-6 text-2xl transition-colors ${
        isSelected
          ? "border-primary bg-primary/10 text-primary"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span className="font-medium">{name}</span>
      {isSelected && <Check className="h-6 w-6" />}
    </div>
  )
}

