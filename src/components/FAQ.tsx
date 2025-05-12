// src/components/faq/FAQ.tsx
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      id: "what-is",
      question: "What is Nikahly?",
      answer: "Nikahly is a modern platform designed to help individuals find meaningful relationships with the goal of marriage. We provide a safe and respectful environment for Muslims to connect based on shared values and compatibility."
    },
    {
      id: "how-works",
      question: "How does Nikahly work?",
      answer: "Our platform uses a thoughtful matching algorithm to connect compatible individuals. After creating a profile and setting your preferences, you'll be able to browse potential matches, communicate through our secure messaging system, and take the next steps toward building a meaningful relationship."
    },
    // Add other FAQ items here...
  ]

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}