


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
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [visibleForms, setVisibleForms] = useState([]);

  
  const handleNext = () => {
    const currentIndex = visibleForms.indexOf(location.pathname);
    if (currentIndex < visibleForms.length - 1) {
      navigate(visibleForms[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = visibleForms.indexOf(location.pathname);
    if (currentIndex > 0) {
      navigate(visibleForms[currentIndex - 1]);
    }
  };

  const renderStep = () => {
    switch (location.pathname) {
      case "/form":
        return <PersonalInformation  />;
      case "/lt":
        return <LTInfo  />;
      case "/alt":
        return <ALTInfo  />;
      case "/hwb":
        return <HwbForm  />;
      case "/basic":
        return <BasicForm  />;
      case "/advanced":
        return <AdvancedForm  />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const course = ls.get("sectionq");
    console.log(course, "course");

    let forms = ["/form"]; // Always include personal form
    if (course === "LT") {
      forms.push("/lt", "/alt","/hwb",  "/basic","/advanced");
    } else if (course === "ALT") {
      forms.push("/alt", "/hwb","/basic", "/advanced");
    } else if (course === "HWB") {
      forms.push("/hwb", "/basic", "/advanced");
    }
    setVisibleForms(forms);
    // navigate(forms[0]); // Navigate to the first form
  }, [navigate]);

  const handleLogout = () => {
    toast.success("You have been logged out successfully!", {
      autoClose: 2000,
      style: { backgroundColor: "#28a745", color: "#fff" },
    });
    setTimeout(() => {
      ls.clear();
      navigate("/");
    }, 2000);
  };

  const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = ls.get("_id");
    
        if (!userId) {
          toast.error("User  ID not found. Please log in again.");
          return;
        }
    
        try {
          const apiEndpoints = [
            `${BASE_URL}/api/v1/advancedDetails`,
            `${BASE_URL}/api/v1/basicDetails`,
            `${BASE_URL}/api/v2/altinfo`,
            `${BASE_URL}/api/v2/ltinfo`,
          ];
    
          const responses = await Promise.all(
            apiEndpoints.map((endpoint) =>
              axios.get(`${endpoint}/${userId}`).then((res) => res.data)
            )
          );
    
          console.log(responses, "responses");
    
          // Check if any response array is empty
          const isAnyArrayEmpty = responses.some(
            (responseArray) => responseArray.length === 0
          );
          console.log(isAnyArrayEmpty, "isAnyArray");
          if (isAnyArrayEmpty) {
            toast.error("Please check One or more Form are empty.");
            return;
          }
    
          const personalResponse = await axios.get(
            `${BASE_URL}/api/v1/personaldetails/${userId}`
          );
          const personalDetails = personalResponse.data;
    
          // Check if personalDetails is empty or if the required fields are missing
          if (!personalDetails || !personalDetails.status) {
            toast.error(
              "Personal details are incomplete. Please fill in all required fields."
            );
            return;
          }
    
          // Check if all responses have isSubmitted set to true for each array
          const allSubmitted = responses.map((responseArray) => {
            // Check if the array is not empty and then check isSubmitted
            return (
              responseArray.length > 0 &&
              responseArray.every((data) => data?.isSubmitted === true)
            );
          });
    
          console.log(allSubmitted, "qwertyu");
    
          // Check if all arrays are true
          const allArraysSubmitted = allSubmitted.every(
            (submitted) => submitted === true
          );
          console.log(allArraysSubmitted, "allArraysSubmitted");
    
          if (allArraysSubmitted) {
            toast.success("Form Submitted successfully!", {
              autoClose: 2000, // Optional: Customize auto-close timing
              style: {
                backgroundColor: "#28a745", // Green background for success
                color: "#fff", // White text color
              },
            });
    
            // Delay navigation to allow the toast to be visible
            setTimeout(() => {
              ls.clear(); // Clear local storage
              navigate("/"); // Navigate after toast
            }, 5000); // Matches the autoClose timing of the toast
          } else {
            toast.error("Please ensure all form fields are completed.");
          }
        } catch (error) {
          console.error("Error fetching API data:", error);
          toast.error("An error occurred while fetching API data.");
        }
      };
    

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <ToastContainer />
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg mt-6 mb-20">
        <h1 className="text-3xl font-bold text-center text-[#1D56A5] mb-6 uppercase">
          Know Your Trainers
        </h1>
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full"
        >
          Logout
        </button>
        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          {renderStep()}
          <div className="flex justify-between">
            {location.pathname !== visibleForms[0] && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-10 py-2 rounded-md shadow"
              >
                Previous
              </button>
            )}
            {location.pathname !== visibleForms[visibleForms.length - 1] ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-yellow-500 text-white px-10 py-2 rounded-md shadow"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-10 py-2 rounded-md shadow font-medium"
              >
                Submit KYT
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;


