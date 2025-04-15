// ContactForm.js
import React from "react";

const ContactForm = ({ nextStep, prevStep }) => {
  return (
    <div className="max-w-full mx-auto p-8 bg-gray-50 shadow-md rounded-lg">
      <form className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name / Surname"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
