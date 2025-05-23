"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // FAQ Data
  const faqData: FAQItem[] = [
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
    {
      question: "How do I upgrade to a Premium account?",
      answer:
        "To upgrade to a Premium account, go to your profile and click on 'Upgrade to Premium'. You'll be directed to our subscription page where you can view different plans and complete your purchase using your preferred payment method.",
      category: "billing",
    },
    {
      question: "Can I add a street food vendor that isn't listed?",
      answer:
        "Yes! We encourage users to help us grow our database. Click on the 'Add a Spot' button in the navigation menu, fill in the details about the vendor including location, type of food, operating hours, and photos if available.",
      category: "usage",
    },
    {
      question: "How do I report inaccurate information?",
      answer:
        "If you notice any inaccurate information about a street food spot, please use the 'Report' button on the vendor's page. Provide details about what information needs correction, and our team will review and update it as soon as possible.",
      category: "usage",
    },
    {
      question: "Can I get a refund for my Premium subscription?",
      answer:
        "Refund policies vary depending on your subscription plan. Generally, we offer a 14-day money-back guarantee for annual subscriptions. Monthly subscriptions can be canceled anytime but are not eligible for partial refunds. Please contact our support team for specific inquiries.",
      category: "billing",
    },
    {
      question: "How do I become a verified vendor?",
      answer:
        "If you're a street food vendor interested in being featured on our platform, click on 'For Vendors' in the footer menu. Complete the application form providing details about your business. Our team will review your application and guide you through the verification process.",
      category: "vendors",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store. The mobile app offers all the features of the website plus location-based recommendations and offline access to saved spots.",
      category: "general",
    },
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on 'Login', then select 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password. Make sure to check your spam folder if you don't see the email in your inbox.",
      category: "account",
    },
  ];

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "account", name: "Account" },
    { id: "usage", name: "Using the Platform" },
    { id: "billing", name: "Billing & Subscriptions" },
    { id: "vendors", name: "For Vendors" },
  ];

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen font-sansita">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Find answers to common questions about using Street Food to
              discover and explore street food spots
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.id
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-4 bg-white flex justify-between items-center focus:outline-none"
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
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 text-orange-500 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Still Have Questions Section */}
      <div className="bg-orange-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h2>
                <p className="text-gray-600 mb-6">
                  Our support team is here to help. Reach out to us with any
                  questions not covered in our FAQ.
                </p>
                <div className="space-y-4">
                  <a
                    href="/contact"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 px-6 rounded-lg font-medium"
                  >
                    Contact Support
                  </a>
                  <a
                    href="#"
                    className="block w-full bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50 text-center py-3 px-6 rounded-lg font-medium"
                  >
                    Live Chat
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-100 p-8 md:p-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Popular Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-orange-500 hover:text-orange-700"
                    >
                      <span className="mr-2">→</span>
                      <span>Guide to Finding the Best Street Food</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-orange-500 hover:text-orange-700"
                    >
                      <span className="mr-2">→</span>
                      <span>Tips for Writing Helpful Reviews</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-orange-500 hover:text-orange-700"
                    >
                      <span className="mr-2">→</span>
                      <span>Street Food Safety Guidelines</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-orange-500 hover:text-orange-700"
                    >
                      <span className="mr-2">→</span>
                      <span>Vendor Registration Tutorial</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-orange-500 hover:text-orange-700"
                    >
                      <span className="mr-2">→</span>
                      <span>Community Guidelines</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
