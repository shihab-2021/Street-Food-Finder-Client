"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const FAQ = () => {
  const faqs = [
    {
      question: "What is Street Food?",
      answer:
        "Street Food is a platform that connects food enthusiasts with authentic street food vendors across different cities. Our mission is to help people discover, share, and enjoy the diverse world of street food while supporting local vendors.",
      category: "general",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button in the top-right corner of the homepage. Fill in your details including name, email address, and password. Verify your email address through the link we send you, and you're all set to start exploring street food spots!",
      category: "account",
    },
    {
      question: "Is Street Food available in my city?",
      answer:
        "Street Food is constantly expanding to cover more cities around the world. You can check if your city is covered by searching for it in the search bar on our homepage. If your city isn't listed yet, you can still create an account and submit requests for us to add it.",
      category: "general",
    },
    {
      question: "How do I post a review?",
      answer:
        "To post a review, navigate to the street food spot's page and click on the 'Write a Review' button. You'll need to be logged in to submit a review. Rate your experience from 1-5 stars, write your review, and optionally add photos of the food or location.",
      category: "usage",
    },
    {
      question: "What's the difference between a Normal and Premium user?",
      answer:
        "Normal users can browse street food spots, post reviews, and save favorites. Premium users enjoy additional benefits like advanced filters, access to exclusive vendor deals, priority customer support, and the ability to download offline maps of food spots for travel.",
      category: "account",
    },
  ];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 container mx-auto px-4 sm:px-6 lg:px-8 font-sansita">
      <h1 className="text-4xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full text-left px-6 py-4 bg-white flex justify-between items-center focus:outline-none cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-lg text-gray-900">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="h-5 w-5 text-orange-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
