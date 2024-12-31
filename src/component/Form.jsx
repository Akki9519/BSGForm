

import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constant/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import PersonalInformation from "./PersonalInfo";
import LTInfo from "./LTInfo";
import ALTInfo from "./ALTInfo";
import AdvancedForm from "./AdvancedInfo";
import BasicForm from "./BasicInfo";
import HwbForm from "./HwbInfo";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    personalInfo: {},
    ltInfo: {},
    altInfo: {},
    hwbInfo: {},
    basicInfo: {},
    advancedInfo: {},
  });

  const handleFormDataChange = (stepData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/v2/formpost`, formData);
  //     console.log(response.data, "response");
  //     if (response.data) {
  //       toast.success("Form submitted successfully");
  //     }
  //   } catch (error) {
  //     console.error("There was an error submitting the form!", error);
  //     toast.error("Error submitting the form!");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if all form sections are filled
    const isFormComplete = Object.values(formData).every(
      (section) => Object.keys(section).length > 0
    );
  
    if (!isFormComplete) {
      toast.error("Please complete all sections before submitting!");
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/api/v2/formpost`, formData);
      console.log(response.data, "response");
      if (response.data) {
        toast.success("Form submitted successfully");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("Error submitting the form!");
    }
  };
  
  const renderStep = () => {
    switch (location.pathname) {
      case "/form":
        return <PersonalInformation onChange={handleFormDataChange} />;
      case "/lt":
        return <LTInfo onChange={handleFormDataChange} />;
      case "/alt":
        return <ALTInfo onChange={handleFormDataChange} />;
      case "/hwb":
        return <HwbForm onChange={handleFormDataChange} />;
      case "/basic":
        return <BasicForm onChange={handleFormDataChange} />;
      case "/advanced":
        return <AdvancedForm onChange={handleFormDataChange} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const nextPaths = {
      "/form": "/lt",
      "/lt": "/alt",
      "/alt": "/hwb",
      "/hwb": "/basic",
      "/basic": "/advanced",
      "/advanced": null, // No next step after advance
    };
    const nextPath = nextPaths[location.pathname];
    if (nextPath) {
      navigate(nextPath);
    }
  };

  const handlePrevious = () => {
    const previousPaths = {
      "/lt": "/form",
      "/alt": "/lt",
      "/hwb": "/alt",
      "/basic": "/hwb",
      "/advanced": "/basic",
    };
    const previousPath = previousPaths[location.pathname];
    if (previousPath) {
      navigate(previousPath);
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="max-w-5xl mx-auto p-6 shadow-lg rounded-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400 uppercase">
          Know your Trainers
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {renderStep()}
          <div className="flex justify-between">
            {location.pathname !== "/form" && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 text-white rounded-md px-4 py-2"
              >
                Previous
              </button>
            )}
            {location.pathname !== "/advanced" ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-yellow-500 text-white rounded-md px-4 py-2"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-yellow-500 text-white rounded-md px-4 py-2"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;