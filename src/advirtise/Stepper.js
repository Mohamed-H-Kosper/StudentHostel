// Stepper.js
import React from "react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex-1">
          <div
            className={`text-center p-2 border-b-4 ${
              index <= currentStep ? "border-red-500" : "border-gray-300"
            }`}
          >
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
