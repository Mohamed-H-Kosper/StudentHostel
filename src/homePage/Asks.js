import React, { useState } from "react";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is the purpose of this website?",
      answer:
        "The purpose of this website is to connect landlords who have apartments for rent with university students looking for housing near their campuses.",
    },
    {
      question: "How can I register as a landlord or a student?",
      answer:
        "You can register by clicking on the 'Sign Up' button, selecting your role as either a landlord or a student, and filling out the required information.",
    },
    {
      question: "Is it free to use the platform?",
      answer:
        "Yes, registering on the platform is free. However, landlords may have the option to pay for premium features to promote their listings.",
    },
    {
      question: "How can I search for apartments?",
      answer:
        "Students can search for apartments by using the search bar, applying filters such as location, price range, or apartment size, and viewing detailed listings.",
    },
    {
      question: "Can I contact landlords directly?",
      answer:
        "Yes, once you find an apartment you are interested in, you can contact the landlord directly through the platform's messaging system to inquire or arrange a booking.",
    },
    {
      question: "How are landlords and students verified?",
      answer:
        "We use a verification system where landlords and students need to verify their email addresses and provide additional details to ensure a trustworthy environment.",
    },
    {
      question: "What should I do if I encounter an issue?",
      answer:
        "If you encounter any problems, you can contact our support team through the 'Help' section or by sending an email to support@example.com.",
    },
    {
      question: "Are there options for short-term rentals?",
      answer:
        "Yes, landlords can specify whether their apartments are available for short-term or long-term rentals in the listing details.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div data-aos="fade-up" className="max-w-2xl mx-auto p-4 mb-10">
      <h1 data-aos="fade-right" className="text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${
              activeIndex === index ? "bg-blue-50" : "bg-green-50"
            }`}
          >
            <button
              className="w-full text-left flex justify-between items-center font-semibold"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="ml-2">
                {activeIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </button>
            {activeIndex === index && (
              <p className="mt-4 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
