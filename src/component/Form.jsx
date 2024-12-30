import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constant/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalInformation from "./PersonalInfo";
import LTInfo from "./LTInfo";
import ALTInfo from "./ALTInfo";
import AdvancedForm from "./AdvancedInfo";
import BasicForm from "./BasicInfo";
import HwbForm from "./HwbInfo";
const Form = () => {
 

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/formpost`,
      
      );
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
    switch (currentStep) {
      case 0:
        return (
          <div>
            <PersonalInformation />
          </div>
        );
      case 1:
        return (
          <div>
            <LTInfo />
          </div>
        );
      case 2:
        return (
          <div>
            <ALTInfo />
          </div>
        );
      case 3:
        return <HwbForm />;
      case 5:
        return (
          <div>
            <BasicForm />
          </div>
        );
      case 4:
        return <AdvancedForm />;

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div
        className="max-w 
      -5xl mx-auto p-6 shadow-lg rounded-md"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400 uppercase">
          Know your Trainers
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {renderStep()}
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                className="bg-gray-500 text-white rounded-md px-4 py-2"
              >
                Previous
              </button>
            )}
            {currentStep < 5 ? (
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


// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../constant/constant";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PersonalInformation from "./PersonalInfo";
// import LTInfo from "./LTInfo";
// import ALTInfo from "./ALTInfo";
// import AdvancedForm from "./AdvancedInfo";
// import BasicForm from "./BasicInfo";
// import HwbForm from "./HwbInfo";

// const Form = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     personalInfo: {},
//     ltInfo: {},
//     altInfo: {},
//     hwbInfo: {},
//     basicInfo: {},
//     advancedInfo: {},
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   const validateStep = () => {
//     const errors = {};
//     switch (currentStep) {
//       case 0:
//         if (!formData.personalInfo.name || !formData.personalInfo.email) {
//           errors.personalInfo = "Please fill out name and email.";
//         }
//         break;
//       case 1:
//         if (!formData.ltInfo.someField) {
//           errors.ltInfo = "Please complete LT Info.";
//         }
//         break;
//       case 2:
//         if (!formData.altInfo.someField) {
//           errors.altInfo = "Please complete ALT Info.";
//         }
//         break;
//       case 3:
//         if (!formData.hwbInfo.someField) {
//           errors.hwbInfo = "Please complete HWB Info.";
//         }
//         break;
//       case 4:
//         if (!formData.advancedInfo.someField) {
//           errors.advancedInfo = "Please complete Advanced Info.";
//         }
//         break;
//       case 5:
//         if (!formData.basicInfo.someField) {
//           errors.basicInfo = "Please complete Basic Info.";
//         }
//         break;
//       default:
//         break;
//     }
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       setCurrentStep((prevStep) => prevStep + 1);
//     } else {
//       toast.error("Please fill out all required fields for this step.");
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateStep()) {
//       toast.error("Please fill out all required fields.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${BASE_URL}/api/v1/formpost`, formData);
//       console.log(response.data, "response");
//       if (response.data) {
//         toast.success("Form submitted successfully");
//       }
//     } catch (error) {
//       console.error("There was an error submitting the form!", error);
//       toast.error("Error submitting the form!");
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return <BasicForm formData={formData} setFormData={setFormData} />;
//       case 1:
//         return <LTInfo formData={formData} setFormData={setFormData} />;
//       case 2:
//         return <ALTInfo formData={formData} setFormData={setFormData} />;
//       case 3:
//         return <HwbForm formData={formData} setFormData={setFormData} />;
//       case 4:
//         return <AdvancedForm formData={formData} setFormData={setFormData} />;
//       case 5:
//         return <PersonalInformation formData={formData} setFormData={setFormData} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="max-w-5xl mx-auto p-6 shadow-lg rounded-md">
//         <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400 uppercase">
//           Know your Trainers
//         </h1>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {renderStep()}
//           <div className="flex justify-between">
//             {currentStep > 0 && (
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
//                 className="bg-gray-500 text-white rounded-md px-4 py-2"
//               >
//                 Previous
//               </button>
//             )}
//             {currentStep < 5 ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="bg-yellow-500 text-white rounded-md px-4 py-2"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="bg-yellow-500 text-white rounded-md px-4 py-2"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Form;
