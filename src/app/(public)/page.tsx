import Link from "next/link"
import {
  BookOpen,
  BriefcaseBusiness,
  MapPin,
  Search,
  Send,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const featuredTuitions = [
  {
    title: "Home Tutor Needed for Class 8",
    subject: "Math & Science",
    location: "Dhanmondi, Dhaka",
    salary: "BDT 10,000/month",
    description:
      "Looking for a patient tutor for evening sessions, 4 days a week.",
  },
  {
    title: "English Medium Tutor for O-Level",
    subject: "Physics",
    location: "Uttara, Dhaka",
    salary: "BDT 15,000/month",
    description:
      "Female tutor preferred with prior O-Level teaching experience.",
  },
  {
    title: "HSC Admission Test Mentor",
    subject: "Chemistry",
    location: "Chattogram",
    salary: "BDT 12,000/month",
    description:
      "Need a focused mentor for weekly prep and exam strategy guidance.",
  },
  {
    title: "Primary Student Tuition",
    subject: "Bangla & English",
    location: "Rajshahi",
    salary: "BDT 7,500/month",
    description:
      "Support needed for foundational learning and homework completion.",
  },
  {
    title: "Remote Spoken English Coach",
    subject: "Spoken English",
    location: "Online",
    salary: "BDT 8,000/month",
    description:
      "Weekend-focused online sessions for a college-level student.",
  },
  {
    title: "ICT Tutor for Class 10",
    subject: "ICT",
    location: "Sylhet",
    salary: "BDT 9,000/month",
    description:
      "Hands-on support for practicals, assignments, and board preparation.",
  },
]

const steps = [
  {
    title: "Post or Find Tuition",
    description: "Students post tuition needs, tutors explore relevant matches.",
    icon: Search,
  },
  {
    title: "Apply / Get Applications",
    description: "Tutors apply quickly while guardians review ideal profiles.",
    icon: Send,
  },
  {
    title: "Start Learning",
    description: "Finalize and begin consistent, goal-focused learning sessions.",
    icon: BookOpen,
  },
]

const stats = [
  { label: "Total Tutors", value: "12,000+" },
  { label: "Total Students", value: "8,500+" },
  { label: "Tuitions Posted", value: "25,000+" },
  { label: "Cities Covered", value: "40+" },
]

const faqs = [
  {
    question: "How do I post a tuition request?",
    answer:
      "Create an account, click Post Tuition, add your subject, location, and budget, then publish.",
  },
  {
    question: "Can tutors apply to multiple tuition jobs?",
    answer:
      "Yes. Tutors can apply to multiple relevant tuition posts that match their subject and location preferences.",
  },
  {
    question: "Is eTuitionBD free to use?",
    answer:
      "Core browsing and application features are free. Optional premium features may be introduced later.",
  },
  {
    question: "How are tutors verified?",
    answer:
      "We encourage profile completeness with academic background, experience, and identity details for safer matching.",
  },
  {
    question: "Can I find online tuition opportunities?",
    answer:
      "Yes. Many listings support online classes, and you can filter by location or remote-only options.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            eTuitionBD
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="#explore"
                className="text-muted-foreground text-sm transition-opacity hover:opacity-80"
              >
                Explore
              </Link>
              <Link
                href="#how-it-works"
                className="text-muted-foreground text-sm transition-opacity hover:opacity-80"
              >
                How it Works
              </Link>
              <Link
                href="#faq"
                className="text-muted-foreground text-sm transition-opacity hover:opacity-80"
              >
                FAQ
              </Link>
            </div>
            <Button variant="outline" size="lg">
              Login
            </Button>
            <Button size="lg">Post Tuition</Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="border-b">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Connecting students with trusted tutors across Bangladesh
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base sm:text-lg">
              Discover quality tutors, post tuition opportunities, and start
              learning with confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg">Find Tuition</Button>
              <Button variant="outline" size="lg">
                Become a Tutor
              </Button>
            </div>
            <div className="mt-8 flex w-full max-w-2xl flex-col gap-2 sm:flex-row">
              <Input
                aria-label="Search by location or subject"
                placeholder="Search by location or subject"
                className="h-11"
              />
              <Button size="lg" className="h-11 sm:px-6">
                Search
              </Button>
            </div>
          </div>
        </section>

        <section id="explore" className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Featured Tuitions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Fresh opportunities curated for tutors and students.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTuitions.map((tuition) => (
                <Card
                  key={tuition.title}
                  className="transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>{tuition.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <BookOpen className="size-4" />
                      {tuition.subject}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="size-4" />
                      {tuition.location}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <BriefcaseBusiness className="size-4" />
                      {tuition.salary}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tuition.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y bg-muted/40 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-2 text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                How It Works
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Three simple steps to start your tuition journey.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon

                return (
                  <Card key={step.title} className="shadow-none">
                    <CardContent className="space-y-3 pt-6">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                        <Icon className="size-5" />
                      </div>
                      <p className="text-xs font-medium tracking-wide">
                        STEP {index + 1}
                      </p>
                      <h3 className="text-base font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="space-y-2 text-center sm:text-left">
                  <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-secondary/40 py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Start your tuition journey today
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Join thousands of tutors and students already learning on
                eTuitionBD.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              <Button size="lg">Post Tuition</Button>
              <Button variant="outline" size="lg">
                Join as Tutor
              </Button>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-2 text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Quick answers for both students and tutors.
              </p>
            </div>
            <Accordion defaultValue={["item-1"]}>
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm">
            Copyright {new Date().getFullYear()} eTuitionBD. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-muted-foreground text-sm transition-opacity hover:opacity-80"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-muted-foreground text-sm transition-opacity hover:opacity-80"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground text-sm transition-opacity hover:opacity-80"
            >
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
