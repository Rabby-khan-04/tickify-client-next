"use client";

import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { useState } from "react";
import FaqItem from "./FaqItem";
import MainSectionTitle from "@/components/shared/mainSectionTitle/MainSectionTitle";

const faqs = [
  {
    question: "How do I book a movie ticket?",
    answer:
      "Simply browse our movies, select your preferred showtime, choose your seats, and proceed to payment. The whole process takes under 2 minutes.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel your booking up to 2 hours before the showtime from the My Bookings page. Refunds are processed within 5–7 business days.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards via Stripe. Your payment information is encrypted and never stored on our servers.",
  },
  {
    question: "How do I receive my ticket?",
    answer:
      "After successful payment, your ticket is instantly available in the My Bookings section. You can show the QR code at the theater entrance.",
  },
  {
    question: "What happens if a show is cancelled?",
    answer:
      "In the rare event of a cancellation, you will receive a full refund automatically within 3–5 business days and an email notification.",
  },
  {
    question: "Can I book tickets for multiple seats?",
    answer:
      "Absolutely! During seat selection you can pick as many available seats as you need in one booking.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="p-top relative z-30 overflow-x-hidden">
      <BlurCircle top="100px" right="-200px" />
      <div className="container-fluid">
        <div className="relative">
          <MainSectionTitle
            subtitle="Help Center"
            title="Got Questions We Have All Answers"
            description="We’ve answered the most frequently asked questions to help you book tickets easily, understand our process, and enjoy a hassle-free cinema experience."
          />
        </div>

        <div className="mt-10 max-w-4xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
