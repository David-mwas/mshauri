import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Volume2, Bell, Phone, HelpCircle, Moon, Sun } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SettingsPage() {
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
          <h1 className="text-3xl font-bold text-white">Settings & Help</h1>
        </div>
      </header>

      {/* Settings */}
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Customize Your Experience</h2>
          <p className="text-xl text-gray-600">Adjust settings to make Mshauri work best for you</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Settings Column */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">Settings</h3>

            <div className="space-y-6 rounded-xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-6 w-6 text-gray-700" />
                  <span className="text-xl font-medium">Volume</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="80"
                  className="w-32 accent-primary"
                  aria-label="Volume"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-gray-700" />
                  <span className="text-xl font-medium">Notifications</span>
                </div>
                <Switch id="notifications" defaultChecked aria-label="Toggle notifications" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Moon className="h-6 w-6 text-gray-700" />
                    <Sun className="h-6 w-6 text-gray-700" />
                  </div>
                  <span className="text-xl font-medium">Dark Mode</span>
                </div>
                <Switch id="dark-mode" aria-label="Toggle dark mode" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-gray-700" />
                  <span className="text-xl font-medium">Call for Support</span>
                </div>
                <Button variant="outline" className="text-lg">
                  Call
                </Button>
              </div>
            </div>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">Help & Support</h3>

            <div className="rounded-xl border-2 border-gray-200 p-6">
              <div className="mb-4 flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-gray-700" />
                <span className="text-xl font-medium">Frequently Asked Questions</span>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">How do I change the language?</AccordionTrigger>
                  <AccordionContent className="text-lg">
                    Go to the home screen and tap on "Change Language". Select your preferred language from the list and
                    tap "Save".
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">
                    How do I set medication reminders?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg">
                    Simply ask Mshauri by saying "Set a reminder for my medication" and follow the voice prompts to set
                    the time and frequency.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    Can I use Mshauri without internet?
                  </AccordionTrigger>
                  <AccordionContent className="text-lg">
                    Some basic features work offline, but you'll need internet connection for most features including
                    voice recognition and responses.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">How do I make the text larger?</AccordionTrigger>
                  <AccordionContent className="text-lg">
                    In the Settings menu, you can adjust the text size using the "Text Size" slider to make everything
                    easier to read.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button className="w-full gap-2 text-lg">
                  <Phone className="h-5 w-5" />
                  Call Support Center
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

