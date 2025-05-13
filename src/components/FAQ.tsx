// src/components/faq/FAQ.tsx
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      id: "what-is",
      question: "What is Nikahly and how does it work?",
      answer: "Nikahly is a faith-centered Muslim matrimonial platform designed to help you find a righteous partner through a secure, respectful, and Shariah-compliant process. Our platform uses a thoughtful matching algorithm to connect compatible individuals. After creating a profile and setting your preferences, you'll be able to browse potential matches, communicate through our secure messaging system, and take the next steps toward building a meaningful relationship."
    },
    {
      id: "sub-details",
      question: "Is Nikahly free to use? What features are available in the other plans?",
      answer: {
        __html: "Nikahly offers Free, Monthly, and Lifetime subscription plans. Each comes with varying levels of access to features like profile visibility, priority matchmaking, and meeting tools. Our free plan allows users to create a profile, view basic matches, and use core features. Premium plans unlock advanced filters and communication options. Check out our <a href=\"/pricing\" className=\"text-primary hover:underline\">pricing page</a> for detailed information about our subscription plans and features."
      }
    },
    {
      id: "del-or-upgrade",
      question: "Can I delete my account or upgrade my subscription? Do you offer refunds?",
      answer: "Yes! Our free plan allows users to create a profile, view basic matches, and use core features. Premium plans unlock advanced filters and communication options."
    },
    {
      id: "monthly-lifetime",
      question: "What does a Wali do on Nikahly?",
      answer: "A Wali watches over the matchmaking process. They can approve or reject matches, message other walis, schedule meetings, and join any calls — all to keep things halal and respectful."
    },
    {
      id: "female-wali-docs",
      question: "Do female users need a Wali?",
      answer: "Yes. Nikahly is built around Islamic principles, and every female account must be linked to a verified Wali to make sure everything stays halal."
    },
    {
      id: "wali-dashboard",
      question: "Can I have both user and wali accounts on the same email and phone number?",
      answer: "No, A user cannot have both wali and user account on the same credentials. It is necessary to have separate for security measures."
    },
    {
      id: "refunds",
      question: "If I change my mind, will I get a refund?",
      answer: "Unfortunately, we cannot offer refunds once a subscription has been purchased."
    },
    {
      id: "ai-mod",
      question: "What does the AI moderator do?",
      answer: "The AI monitors conversations for inappropriate language, ensures guideline compliance, and alerts admins to investigate any suspicious or un-Islamic interactions"
    },
    {
      id: "free-use",
      question: " Can I use Nikahly without paying?",
      answer: "Yes! The Free plan lets you create a profile, explore basic matches, and use essential tools. Upgrading gives access to enhanced filters, communication options, and exclusive features."
    },
    // Add other FAQ items here...
  ]

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-md md:text-lg lg:text-xl font-medium text-primary">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-md md:text-lg lg:text-xl font-light">
              {typeof faq.answer === 'string' ? faq.answer : <div dangerouslySetInnerHTML={{ __html: faq.answer.__html }} />}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}