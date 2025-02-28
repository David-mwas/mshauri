"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Training data with detailed course lessons and full teaching content.
const trainingData: Record<
  string,
  {
    title: string;
    description: string;
    lessons: {
      lesson: string;
      duration: string;
      content: string;
      steps: string[];
    }[];
  }
> = {
  "mobile-banking": {
    title: "Mobile Banking",
    description:
      "Learn how to check your balance, send money, and pay bills using your phone. In Kenya, mobile banking is widely used through platforms like M-Pesa. This course will walk you through how these services work and how to use them safely.",
    lessons: [
      {
        lesson: "Introduction to Mobile Banking",
        duration: "5 min",
        content: `
          <p>Mobile banking in Kenya has revolutionized access to financial services, with M-Pesa being a flagship example. Launched by Safaricom in 2007, M-Pesa has enabled millions of Kenyans—especially those without access to traditional banks—to transfer money, pay bills, and even save money using only their mobile phones.</p>
          <p><strong>Historical Impact:</strong> M-Pesa’s launch marked a turning point in financial inclusion. It has been credited with transforming the economy by providing a simple, secure way to access money and credit. For more on its history and impact, visit the <a href='https://www.safaricom.co.ke/personal/m-pesa' target='_blank' rel='noopener noreferrer'>Safaricom M-Pesa</a> page and the <a href='https://www.centralbank.go.ke' target='_blank' rel='noopener noreferrer'>Central Bank of Kenya</a> website.</p>
          <p><strong>Security Practices:</strong> As you begin using mobile banking, it’s vital to protect your account. Always keep your PIN confidential, avoid using public Wi-Fi for transactions, and routinely check your transaction history for any discrepancies.</p>
        `,
        steps: [
          "Understand that mobile banking enables you to perform transactions via your smartphone.",
          "Learn how M-Pesa has transformed Kenya's financial landscape.",
          "Adopt essential security practices: keep your PIN secret, avoid public networks, and monitor your account regularly.",
        ],
      },
      {
        lesson: "Navigating the App",
        duration: "10 min",
        content: `
          <p>After installing your mobile banking app (for example, the M-Pesa app), you need to become familiar with its layout to use it effectively. This lesson covers the key sections of the app.</p>
          <p><strong>Dashboard:</strong> Upon logging in, you'll see a dashboard that displays your current balance, recent transactions, and quick access shortcuts.</p>
          <p><strong>Menu Options:</strong> Use the navigation menu to access different functions such as sending money, paying bills, and viewing your transaction history. Exploring the app helps build confidence in using its features.</p>
          <p>If you ever get lost, check the app’s help section or contact customer support for guidance.</p>
        `,
        steps: [
          "Launch your mobile banking app and sign in securely.",
          "Identify the dashboard where your account balance and transactions are displayed.",
          "Explore the menu options to locate functions like sending money, paying bills, and accessing support.",
        ],
      },
      {
        lesson: "Making Transactions",
        duration: "8 min",
        content: `
          <p>This lesson guides you through the process of making transactions. Accuracy is crucial when transferring money or paying bills.</p>
          <p><strong>Process:</strong></p>
          <ol>
            <li>Select the appropriate transaction option (e.g., "Send Money" or "Pay Bills").</li>
            <li>Enter the recipient's details accurately. For example, if sending money via M-Pesa, double-check the phone number.</li>
            <li>Review all transaction details on the confirmation screen.</li>
            <li>Confirm the transaction and wait for a notification or confirmation message.</li>
          </ol>
          <p>Following these steps helps ensure that your funds reach the intended recipient without any errors.</p>
        `,
        steps: [
          "Choose the correct transaction option from the app.",
          "Enter and verify the recipient’s details.",
          "Review the transaction details carefully before confirming.",
          "Ensure you receive and verify a confirmation message.",
        ],
      },
      {
        lesson: "Troubleshooting",
        duration: "7 min",
        content: `
          <p>No system is perfect. In this lesson, we address common issues you might encounter and how to resolve them.</p>
          <p><strong>Common Problems:</strong></p>
          <ul>
            <li>Login failures due to network issues or incorrect credentials.</li>
            <li>Transaction errors caused by misentered details or system glitches.</li>
          </ul>
          <p>To troubleshoot, ensure that your internet connection is stable, update your app regularly, and follow any in-app troubleshooting guides. If problems persist, reach out to customer support via <a href='https://www.safaricom.co.ke/support' target='_blank' rel='noopener noreferrer'>Safaricom Support</a>.</p>
        `,
        steps: [
          "Determine if the problem is due to network connectivity or a user error.",
          "Make sure your app is up to date.",
          "Follow the provided troubleshooting steps or contact customer support if necessary.",
        ],
      },
    ],
  },
  "online-payments": {
    title: "Online Payments",
    description:
      "Learn how to make secure online payments for goods and services. With platforms like Pesapal gaining popularity in Kenya, this course will teach you the fundamentals of online payment systems and essential security practices.",
    lessons: [
      {
        lesson: "Overview of Online Payments",
        duration: "6 min",
        content: `
          <p>Online payments allow you to complete transactions via the internet, making shopping and bill payments more convenient than ever. This lesson explains the overall process and highlights the importance of security.</p>
          <p><strong>How It Works:</strong> Transactions are processed through secure gateways. The process involves initiating a payment, processing it through a secure server, and then receiving a confirmation.</p>
          <p><strong>Security:</strong> Always ensure the website uses HTTPS to protect your data. Be cautious and only use trusted payment platforms like <a href='https://www.pesapal.com' target='_blank' rel='noopener noreferrer'>Pesapal</a>.</p>
        `,
        steps: [
          "Understand the digital payment process from initiation to confirmation.",
          "Recognize the convenience and speed of online transactions.",
          "Be aware of potential risks such as fraud and learn basic mitigation techniques.",
        ],
      },
      {
        lesson: "Payment Methods",
        duration: "8 min",
        content: `
          <p>There are various methods to pay online in Kenya. This lesson compares mobile money, digital wallets, and traditional bank cards.</p>
          <p><strong>Mobile Money:</strong> Services like M-Pesa are popular for their ease of use and wide acceptance.</p>
          <p><strong>Digital Wallets:</strong> These offer fast transactions and can store multiple payment options securely.</p>
          <p><strong>Bank Cards:</strong> Traditional cards are still widely used, often integrated with secure payment gateways.</p>
        `,
        steps: [
          "Review the different online payment methods available in Kenya.",
          "Compare the advantages and security features of mobile money, digital wallets, and bank cards.",
          "Decide which method suits different transaction scenarios best.",
        ],
      },
      {
        lesson: "Security Best Practices",
        duration: "10 min",
        content: `
          <p>Protecting your financial data is crucial when paying online. This lesson outlines best practices to ensure your transactions remain secure.</p>
          <p><strong>Password Management:</strong> Use strong, unique passwords and consider a password manager for added security.</p>
          <p><strong>Secure Connections:</strong> Always verify that you are on a secure (HTTPS) site before entering sensitive information.</p>
          <p><strong>Monitoring:</strong> Regularly check your bank and payment statements for any unauthorized transactions. Learn more about cybersecurity at the <a href='https://www.icta.go.ke' target='_blank' rel='noopener noreferrer'>Kenya ICT Authority</a>.</p>
        `,
        steps: [
          "Adopt strong password practices and use a password manager if possible.",
          "Ensure that all websites and apps use HTTPS before providing any sensitive data.",
          "Monitor your transactions and report any suspicious activity immediately.",
        ],
      },
    ],
  },
  "telehealth-services": {
    title: "Telehealth Services",
    description:
      "Telehealth enables remote consultations and healthcare management via video calls and online platforms. This course explains how telehealth is evolving in Kenya and provides practical steps for effective usage.",
    lessons: [
      {
        lesson: "Getting Started with Telehealth",
        duration: "5 min",
        content: `
          <p>Telehealth has become an essential service in Kenya, particularly in rural areas where access to physical clinics is limited. This lesson introduces telehealth, outlines its benefits, and shows you how to get started.</p>
          <p><strong>Benefits:</strong> Telehealth offers convenience, saves time, and connects you with healthcare providers regardless of your location. For official guidelines, refer to the <a href='https://www.health.go.ke' target='_blank' rel='noopener noreferrer'>Kenya Ministry of Health</a> website.</p>
        `,
        steps: [
          "Understand that telehealth brings healthcare services to you remotely.",
          "Review the various types of telehealth services available, such as virtual consultations and remote diagnostics.",
          "Learn the basic steps required to register for and start using a telehealth service.",
        ],
      },
      {
        lesson: "Setting Up a Video Call",
        duration: "7 min",
        content: `
          <p>A smooth video call is essential for a successful telehealth consultation. This lesson walks you through the technical and practical aspects of setting up a video call.</p>
          <p><strong>Preparation:</strong> Ensure your device has a functioning camera and microphone, and that your internet connection is stable. Follow the app instructions to set up your call.</p>
        `,
        steps: [
          "Confirm that your device’s hardware (camera and microphone) is working properly.",
          "Download or update your telehealth app as needed.",
          "Follow the app's instructions to schedule and initiate a video call.",
          "Test your audio and video settings before the call begins.",
        ],
      },
      {
        lesson: "Managing Appointments",
        duration: "8 min",
        content: `
          <p>Managing your telehealth appointments efficiently ensures you receive timely care. This lesson explains how to schedule, modify, or cancel appointments using your telehealth platform.</p>
          <p><strong>Tips:</strong> Always double-check your appointment time and be aware of any cancellation policies the service may have.</p>
        `,
        steps: [
          "Navigate to the appointments section within your telehealth app.",
          "Select an available time slot to book a consultation.",
          "Learn how to modify or cancel appointments if your schedule changes.",
          "Use the communication features within the app to contact your provider if needed.",
        ],
      },
    ],
  },
  "calendar-reminders": {
    title: "Calendar & Reminders",
    description:
      "Digital calendars are essential tools for managing your daily tasks and appointments. This course teaches you how to effectively set up and use calendar apps, with tips tailored to the Kenyan context.",
    lessons: [
      {
        lesson: "Introduction to Digital Calendars",
        duration: "4 min",
        content: `
          <p>Digital calendars like Google Calendar or Microsoft Outlook have transformed time management. This lesson explains the advantages of using digital calendars, including setting reminders and integrating with other productivity tools.</p>
          <p><strong>Why Go Digital?</strong> They offer flexibility, easy sharing, and the ability to sync across devices—vital for busy professionals and students in Kenya.</p>
        `,
        steps: [
          "Understand the benefits of using digital calendars over traditional paper-based methods.",
          "Explore popular calendar apps and their main features.",
          "Learn how digital calendars help you manage both personal and professional commitments.",
        ],
      },
      {
        lesson: "Setting Up Reminders",
        duration: "6 min",
        content: `
          <p>Reminders help ensure you never miss an important event or deadline. In this lesson, you'll learn how to add and customize reminders on your digital calendar.</p>
          <p><strong>Customization:</strong> Tailor the reminder’s time, frequency, and notification style to fit your needs.</p>
        `,
        steps: [
          "Learn how to add a new reminder in your calendar app.",
          "Customize the reminder’s settings (time, frequency, notification style).",
          "Test the reminder to confirm it works as expected.",
        ],
      },
      {
        lesson: "Advanced Scheduling Features",
        duration: "7 min",
        content: `
          <p>Take full advantage of your digital calendar by exploring advanced features. This lesson covers setting recurring events, sharing calendars, and integrating with other productivity tools.</p>
          <p>These features are particularly useful for coordinating work schedules, family events, or academic deadlines.</p>
        `,
        steps: [
          "Set up recurring events for regular tasks (e.g., weekly meetings, exercise sessions).",
          "Learn how to share your calendar with colleagues, friends, or family.",
          "Explore how to integrate your calendar with other productivity apps for a centralized view of your schedule.",
        ],
      },
    ],
  },
};

export default function LessonDetailPage() {
  const params = useParams();
  const { slug: moduleSlug, lessonIndex: lessonIndexStr } = params as {
    slug: string;
    lessonIndex: string;
  };
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  if (!moduleSlug) {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </main>
    );
  }

  const moduleData = trainingData[moduleSlug];

  if (!moduleData) {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold">Module Not Found</h1>
        <Button onClick={() => router.push("/training")}>
          Back to Training Modules
        </Button>
      </main>
    );
  }

  const lessonIndex = parseInt(lessonIndexStr, 10);

  if (
    isNaN(lessonIndex) ||
    lessonIndex < 0 ||
    lessonIndex >= moduleData.lessons.length
  ) {
    return (
      <main className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold">Lesson Not Found</h1>
        <Button onClick={() => router.push(`/training/${moduleSlug}`)}>
          Back to Module
        </Button>
      </main>
    );
  }

  const lesson = moduleData.lessons[lessonIndex];

  return (
    <main className="min-h-screen bg-white p-6">
      {/* Header with back navigation */}
      <header className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.push(`/training/${moduleSlug}`)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{lesson.lesson}</h1>
          <p className="text-lg text-gray-500">Duration: {lesson.duration}</p>
        </div>
      </header>

      {/* Lesson Content and Detailed Steps */}
      <section className="mb-8">
        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          <h2>Steps to Follow:</h2>
          <ol className="list-decimal ml-6">
            {lesson.steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Interactive Teaching Experience */}
      <section className="mb-8">
        <div className="prose">
          {currentStep < lesson.steps.length ? (
            <>
              <h2>
                Interactive Teaching: Step {currentStep + 1} of{" "}
                {lesson.steps.length}
              </h2>
              <p>{lesson.steps[currentStep]}</p>
              <div className="flex space-x-4 mt-4">
                <Button
                  disabled={currentStep === 0}
                  onClick={() =>
                    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
                  }
                >
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    setCurrentStep((prev) =>
                      prev < lesson.steps.length - 1
                        ? prev + 1
                        : lesson.steps.length
                    )
                  }
                >
                  {currentStep < lesson.steps.length - 1
                    ? "Next Step"
                    : "Finish Lesson"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2>Lesson Completed</h2>
              <p>
                Great job! You have completed this lesson. You can review the
                material or explore other lessons in this module.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Back Button */}
      <Button onClick={() => router.push(`/training/${moduleSlug}`)}>
        Back to Module
      </Button>
    </main>
  );
}
