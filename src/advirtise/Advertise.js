import React, { useState } from "react";
import FirstAdvertise from "./FirstAdvertise";
import Stepper from "./Stepper";
import SecondAdvertise from "./SecondAdvertise";
import { useAuth } from "../AuthCheck";
import { useNavigate } from "react-router-dom";

const steps = ["Add", "Details"];

const Advertise = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOwner } = useAuth();
  if (isOwner === false) {
    navigate("/");
  }
  if (isAuthenticated === false) {
    navigate("/");
  }
  // console.log(isAuthenticated);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    floor: "",
    numRooms: "",
    numBeds: "",
    address: "",
    Apartment_Image: "",
  });
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/Apartment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit data");

      nextStep();
    } catch (error) {
      console.error("Error submitting ad:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FirstAdvertise
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <SecondAdvertise
            formData={formData}
            nextStep={handleSubmit}
            prevStep={prevStep}
          />
        );
      // case 2:
      //   return <SuccessMessage />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="border rounded-lg p-4 my-4">{renderStepContent()}</div>
      <div className="flex justify-between mt-4">
        {/* {currentStep !== 0 && (
          <button
            onClick={prevStep}
            className="bg-red-500 text-white p-2 px-4 rounded"
          >
            Previous
          </button>
        )}
        {currentStep === 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white p-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        ) : (
          currentStep !== steps.length - 1 && (
            <button
              onClick={nextStep}
              className="bg-red-500 text-white p-2 px-4 rounded"
            >
              Next
            </button>
          )
        )} */}
      </div>
    </div>
  );
};

export default Advertise;
