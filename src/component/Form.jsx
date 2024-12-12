
// import React, { useState } from "react";

// const RegistrationForm = () => {

//   const [selectedWing, setSelectedWing] = useState('');
//   const [formData, setFormData] = useState({
//     currentAddress: "",
//     permanentAddress: "",
//     education: [""],
//     sameAddress: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCheckboxChange = () => {
//     setFormData({
//       ...formData,
//       sameAddress: !formData.sameAddress,
//       permanentAddress: formData.sameAddress ? "" : formData.currentAddress,
//     });
//   };

//   const handleAddEducation = () => {
//     setFormData({ ...formData, education: [...formData.education, ""] });
//   };

//   const handleEducationChange = (index, value) => {
//     const updatedEducation = [...formData.education];
//     updatedEducation[index] = value;
//     setFormData({ ...formData, education: updatedEducation });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
//       <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Registration Form</h1>
//       <form className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="bsguid"
//             placeholder="BSG UID"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="date"
//             name="dob"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="bsgState"
//             placeholder="BSG State"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="revenueState"
//             placeholder="Revenue State"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="revenueDistrict"
//             placeholder="Revenue District"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="pincode"
//             placeholder="Pincode"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <select
//             name="maritalStatus"
//             onChange={handleInputChange}
//             className="input-field"
//           >
//             <option value="">Marital Status</option>
//             <option value="single">Single</option>
//             <option value="married">Married</option>
//             <option value="other">Other</option>
//           </select>
//           <select
//             name="gender"
//             onChange={handleInputChange}
//             className="input-field"
//           >
//             <option value="">Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <select
//             name="occupation"
//             onChange={handleInputChange}
//             className="input-field"
//           >
//             <option value="">Occupation</option>
//             <option value="business">Business</option>
//             <option value="salaried">Salaried</option>
//             <option value="other">Other</option>
//           </select>
//           <input
//             type="text"
//             name="warrantNumber"
//             placeholder="Warrant Number"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="date"
//             name="warrantDate"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="date"
//             name="warrantTillDate"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="aadharNumber"
//             placeholder="Aadhar Number"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="contactNumber"
//             placeholder="Contact Number"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <input
//             type="text"
//             name="whatsappNumber"
//             placeholder="WhatsApp Number"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <textarea
//             name="currentAddress"
//             placeholder="Current Address"
//             onChange={handleInputChange}
//             className="input-field"
//           />
//           <div className="col-span-1 md:col-span-2">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={formData.sameAddress}
//                 onChange={handleCheckboxChange}
//               />
//               <span>Same as Current Address</span>
//             </label>
//             <textarea
//               name="permanentAddress"
//               placeholder="Permanent Address"
//               value={formData.sameAddress ? formData.currentAddress : formData.permanentAddress}
//               onChange={handleInputChange}
//               disabled={formData.sameAddress}
//               className="input-field"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <h2 className="font-medium">Education Qualifications</h2>
//           {formData.education.map((edu, index) => (
//             <input
//               key={index}
//               type="text"
//               value={edu}
//               onChange={(e) => handleEducationChange(index, e.target.value)}
//               placeholder="Qualification"
//               className="input-field"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={handleAddEducation}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           >
//             Add Qualification
//           </button>
//         </div>


//         <div className="p-4">
//       {/* Dropdown */}
//       <label className="block mb-2 font-bold text-gray-700">Select Wing</label>
//       <select
//         className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
//         value={selectedWing}
//         onChange={(e) => setSelectedWing(e.target.value)}
//       >
//         <option value="">-- Select Wing --</option>
//         <option value="LT">LT</option>
//         <option value="ALT">ALT</option>
//         <option value="PRE-ALT">PRE-Alt</option>
//         <option value="HWB">HWB</option>
//         <option value="Advanced">Advanced</option>
//         <option value="Basic">Basic</option>
//         <option value="ROT Details">ROT Details</option>
//       </select>

//       {/* Conditionally Render Form */}
//       {selectedWing && (
//         <div className="border p-4 rounded bg-gray-100">
//           <h2 className="text-lg font-bold mb-4">Form for {selectedWing}</h2>
//           <form>
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-700">Name</label>
//               <input
//                 type="text"
//                 className="border border-gray-300 rounded px-3 py-2 w-full"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-700">Details</label>
//               <textarea
//                 className="border border-gray-300 rounded px-3 py-2 w-full"
//                 placeholder={`Enter details for ${selectedWing}`}
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       )}
//     </div>


//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;

// // Tailwind CSS Classes for Input Fields
// const inputField = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";


import React, { useState } from "react";

const RegistrationForm = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [selectedSubWing, setSelectedSubWing] = useState("");
  const [formData, setFormData] = useState({
    currentAddress: "",
    permanentAddress: "",
    education: [""],
    sameAddress: false,
  });

  const subWingOptions = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      sameAddress: !formData.sameAddress,
      permanentAddress: formData.sameAddress ? "" : formData.currentAddress,
    });
  };

  const handleAddEducation = () => {
    setFormData({ ...formData, education: [...formData.education, ""] });
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Registration Form
      </h1>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            className="input-field"
          />
          <textarea
            name="currentAddress"
            placeholder="Current Address"
            onChange={handleInputChange}
            className="input-field"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.sameAddress}
              onChange={handleCheckboxChange}
            />
            <span>Same as Current Address</span>
          </label>
          <textarea
            name="permanentAddress"
            placeholder="Permanent Address"
            value={
              formData.sameAddress ? formData.currentAddress : formData.permanentAddress
            }
            onChange={handleInputChange}
            disabled={formData.sameAddress}
            className="input-field"
          />
        </div>

        {/* Wing Dropdown */}
        <div className="space-y-2">
          <label className="block mb-2 font-bold text-gray-700">Select Wing</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
            value={selectedWing}
            onChange={(e) => {
              setSelectedWing(e.target.value);
              setSelectedSubWing("");
            }}
          >
            <option value="">-- Select Wing --</option>
            <option value="Scout">Scout</option>
            <option value="Guide">Guide</option>
          </select>
        </div>

        {/* SubWing Dropdown */}
        {selectedWing && (
          <div className="space-y-2">
            <label className="block mb-2 font-bold text-gray-700">
              Select Sub-Wing
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
              value={selectedSubWing}
              onChange={(e) => setSelectedSubWing(e.target.value)}
            >
              <option value="">-- Select Sub-Wing --</option>
              {subWingOptions[selectedWing].map((subWing) => (
                <option key={subWing} value={subWing}>
                  {subWing}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Honourable Charge and Other Fields */}
        {selectedWing && (
          <div className="space-y-4">
            <input
              type="text"
              name="honourableChargeNumber"
              placeholder="Honourable Charge Number"
              className="input-field"
            />
            <input type="date" name="issueDate" className="input-field" />
            <input type="date" name="fromDate" className="input-field" />
            <input type="date" name="toDate" className="input-field" />
            <input
              type="text"
              name="certificateNumber"
              placeholder="Certificate Number"
              className="input-field"
            />
            <input type="date" name="certificateDate" className="input-field" />
          </div>
        )}

        {/* Training Courses */}
        {selectedWing && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-700">Training Courses</h2>
            <label className="block mb-2 text-gray-700">Conducted / Assisted</label>
            <select className="input-field">
              <option value="">-- Select Type --</option>
              <option value="conducted">Conducted</option>
              <option value="assisted">Assisted</option>
            </select>
            <input type="date" name="courseDate" className="input-field" />
            <input
              type="text"
              name="place"
              placeholder="Place"
              className="input-field"
            />
            <input
              type="text"
              name="leader"
              placeholder="Leader of the Course"
              className="input-field"
            />
            <input
              type="number"
              name="participants"
              placeholder="No. of Participants"
              className="input-field"
            />
            <select className="input-field">
              <option value="">-- Result --</option>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
              <option value="withheld">Withheld</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
