import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constant/constant";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
const Form = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [selectedSubWing, setSelectedSubWing] = useState("");
  const [formData, setFormData] = useState({
    currentAddress: "",
    permanentAddress: "",
    education: [""],
    sameAddress: false,
    
  });
  const [selectType, setSelectType] = useState("");
  const [currentStep, setCurrentStep] = useState(0); // New state for current step


  const subWingOptions = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger", "Cub", "Scout"],
  };
  const subWingOptions1 = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger"],
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSelectTypeChange = (e) => {
    setSelectType(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit logic here
    console.log("Final Data to Submit:", formData);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/formpost`,
        formData
      );
      console.log(response.data, "response");
      if (response.data) {
        alert("Form submitted successfully");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2>LT Form</h2>
            {/* LT Form Fields */}
            <div className="border p-4 rounded bg-gray-100">

<h2 className="font-bold text-black text-lg mb-4">
  Wing and Sub-Wing Selection
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div className="mb-4">
    <label className="block mb-2 font-bold text-black">
      Select Wing
    </label>
    <select
      className="border border-gray-300 rounded px-3 py-2 w-full"
      value={selectedWing}
      onChange={(e) => setSelectedWing(e.target.value)}
    >
      <option value="">-- Select Wing --</option>
      <option value="Scout">Scout</option>
      <option value="Guide">Guide</option>
    </select>
  </div>
  <div className="mb-4">
    <label className="block mb-2 font-bold text-black">
      Select Sub-Wing
    </label>
    <select
      className="border border-gray-300 rounded px-3 py-2 w-full"
      value={selectedSubWing}
      onChange={(e) => setSelectedSubWing(e.target.value)}
      disabled={!selectedWing}
    >
      <option value="">-- Select Sub-Wing --</option>
      {selectedWing &&
        subWingOptions[selectedWing]?.map((subWing) => (
          <option key={subWing} value={subWing}>
            {subWing}
          </option>
        ))}
    </select>
  </div>{" "}
</div>

<h2 className="font-bold text-black text-lg mb-4">
  Training Courses Assisted/Conducted in Last Year
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div className="mb-4">
    <label className="block mb-2 font-bold text-black">
      Select Type
    </label>
    <select
      value={selectType}
      onChange={handleSelectTypeChange}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    >
      <option value="">-- Select Type --</option>
      <option value="conducted">Conducted</option>
      <option value="assisted">Assisted</option>
    </select>
  </div>

  <div className="mb-4">
    <label className="block mb-2 font-bold text-black">
      Course Date
    </label>
    <input
      type="date"
      name="courseDate"
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
  </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div className="mb-4">
    <label className="block mb-2 font-bold text-black">
      Place
    </label>
    <input
      type="text"
      name="place"
      placeholder="Place"
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
  </div>
  {selectType !== "conducted" && (
    <div className="mb-4">
      <label className="block mb-2 font-bold text-black">
        Leader of the Course
      </label>
      <input
        type="text"
        name="leader"
        placeholder="Leader of the Course"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>
  )}
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div className="mb-4">
    <label className="block mb-2 font-bold text-black">
      No. of Participants
    </label>
    <input
      type="number"
      name="participants"
      placeholder="No. of Participants"
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
  </div>
</div>
<div className="space-y-4 mt-6">
  <div className="font-bold text-black">
    Details of Last ROT Attended
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block mb-2 font-bold text-black">
        Course From Date
      </label>
      <input
        type="date"
        name="courseFromDate"
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>

    <div>
      <label className="block mb-2 font-bold text-black">
        Course To Date
      </label>
      <input
        type="date"
        name="courseToDate"
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="mb-4">
      <label className="block mb-2 font-bold text-black">
        Certificate Number
      </label>
      <input
        type="text"
        name="certificateNumber"
        onChange={handleInputChange}
        placeholder="Certificate Number"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>

    <div className="mb-4">
      <label className="block mb-2 font-bold text-black">
        Certificate Date
      </label>
      <input
        type="date"
        name="certificateDate"
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="mb-4">
      <label className="block mb-2 font-bold text-black">
        Leader of the Course
      </label>
      <input
        type="text"
        name="leader"
        onChange={handleInputChange}
        placeholder="Leader of the Course"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-bold text-black">
        Place
      </label>
      <input
        type="text"
        name="place"
        onChange={handleInputChange}
        placeholder="Place"
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>{" "}
  </div>
</div>

</div>
            
          </div>
        );
      case 1:
        return (
          <div>
            <h2>ALT Form</h2>
           
<div className="border p-4 rounded bg-gray-100">
                <h2 className="font-bold text-black text-lg mb-4">
                  Wing and Sub-Wing Selection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">
                      Select Wing
                    </label>
                    <select
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      value={selectedWing}
                      onChange={(e) => setSelectedWing(e.target.value)}
                    >
                      <option value="">-- Select Wing --</option>
                      <option value="Scout">Scout</option>
                      <option value="Guide">Guide</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">
                      Select Sub-Wing
                    </label>
                    <select
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                      value={selectedSubWing}
                      onChange={(e) => setSelectedSubWing(e.target.value)}
                      disabled={!selectedWing}
                    >
                      <option value="">-- Select Sub-Wing --</option>
                      {selectedWing &&
                        subWingOptions[selectedWing]?.map((subWing) => (
                          <option key={subWing} value={subWing}>
                            {subWing}
                          </option>
                        ))}
                    </select>
                  </div>{" "}
                </div>

                <h2 className="font-bold text-black text-lg mb-4">
                  Training Courses Assisted/Conducted in Last Year
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">
                      Select Type
                    </label>
                    <select
                      value={selectType}
                      onChange={handleSelectTypeChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                      <option value="">-- Select Type --</option>
                      <option value="conducted">Conducted</option>
                      <option value="assisted">Assisted</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">
                      Course Date
                    </label>
                    <input
                      type="date"
                      name="courseDate"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">
                      Place
                    </label>
                    <input
                      type="text"
                      name="place"
                      placeholder="Place"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  {selectType !== "conducted" && (
                    <div className="mb-4">
                      <label className="block mb-2 font-bold text-black">
                        Leader of the Course
                      </label>
                      <input
                        type="text"
                        name="leader"
                        placeholder="Leader of the Course"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">
                      No. of Participants
                    </label>
                    <input
                      type="number"
                      name="participants"
                      placeholder="No. of Participants"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="font-bold text-black">
                    Details of Last ROT Attended
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-2 font-bold text-black">
                        Course From Date
                      </label>
                      <input
                        type="date"
                        name="courseFromDate"
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-bold text-black">
                        Course To Date
                      </label>
                      <input
                        type="date"
                        name="courseToDate"
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label className="block mb-2 font-bold text-black">
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        name="certificateNumber"
                        onChange={handleInputChange}
                        placeholder="Certificate Number"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 font-bold text-black">
                        Certificate Date
                      </label>
                      <input
                        type="date"
                        name="certificateDate"
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label className="block mb-2 font-bold text-black">
                        Leader of the Course
                      </label>
                      <input
                        type="text"
                        name="leader"
                        onChange={handleInputChange}
                        placeholder="Leader of the Course"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 font-bold text-black">
                        Place
                      </label>
                      <input
                        type="text"
                        name="place"
                        onChange={handleInputChange}
                        placeholder="Place"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>{" "}
                  </div>
                </div>
             
              </div>


            {/* Add other ALT fields here */}
          </div>
        );
      case 2:
        return (
          <div>
            <h2>HWB Form</h2>
            {/* HWB Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Select Wing
                    </label>
                    <select
                      className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                      value={selectedWing}
                      onChange={(e) => {
                        setSelectedWing(e.target.value);
                      }}
                    >
                      <option value="">-- Select Wing --</option>
                      <option value="Scout">Scout</option>
                      <option value="Guide">Guide</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Select Sub-Wing
                    </label>
                    <select
                      className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                      value={selectedSubWing}
                      onChange={(e) => setSelectedSubWing(e.target.value)}
                      disabled={!selectedWing}
                    >
                      <option value="">-- Select Sub-Wing --</option>
                      {selectedWing &&
                        subWingOptions1[selectedWing]?.map((subWing) => (
                          <option key={subWing} value={subWing}>
                            {subWing}
                          </option>
                        ))}
                    </select>
                  </div>
                  </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Parchment Date
                    </label>
                    <input
                      type="date"
                      name="parchmentDate"
                      onChange={handleInputChange}
                      className="input-field w-full rounded-md px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Parchment Number
                    </label>
                    <input
                      type="text"
                      name="parchmentNumber"
                      placeholder="Enter Parchment Number"
                      onChange={handleInputChange}
                      className="input-field w-full rounded-md px-2 py-1"
                    />
                  </div>{" "}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Course From Date
                    </label>
                    <input
                      type="date"
                      name="courseFromDate"
                      onChange={handleInputChange}
                      className="input-field w-full rounded-md px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Course To Date
                    </label>
                    <input
                      type="date"
                      name="courseToDate"
                      onChange={handleInputChange}
                      className="input-field w-full rounded-md px-2 py-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Certificate Number
                    </label>
                    <input
                      type="text"
                      name="certificateNumber"
                      placeholder="Enter Certificate Number"
                      onChange={handleInputChange}
                      className="input-field w-full rounded-md px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-black">
                      Certificate Date
                    </label>
                    <input
                      type="date"
                      name="certificateDate"
                      onChange={handleInputChange}
                      className="input-field w-full rounded-md px-2 py-1"
                    />
                    <div></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-bold text-black">
                        Leader of the Course
                      </label>
                      <input
                        type="text"
                        name="leader"
                        placeholder="Enter Leader's Name"
                        onChange={handleInputChange}
                        className="input-field w-full rounded-md px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-bold text-black">
                        Place
                      </label>
                      <input
                        type="text"
                        name="place"
                        placeholder="Enter Place"
                        onChange={handleInputChange}
                        className="input-field w-full rounded-md px-2 py-1"
                      />
                    </div>
                  </div>
                </div>
               
              </div>



            

            
           
       
        );
        case 3:
          return (
            <div className="max-w-5xl mx-auto">
            <ToastContainer />
            <div className="text-center font-bold py-5 text-2xl">BASIC COURSE</div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="p-4 border border-gray-300 rounded mb-4"
                >
                  <div className="flex justify-end mb-2">
                    {courses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCourse(course.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
      
                  <div className="grid grid-cols-2 gap-x-20 gap-y-5">
                    <div className="flex flex-col mb-4">
                      <label className="mb-1 font-medium text-gray-700">Wing</label>
                      <select
                        value={course.wing}
                        disabled={
                          index < courseDisable.length && courseDisable[index]
                        }
                        onChange={(e) => handleChange(index, "wing", e.target.value)}
                        className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                      >
                        <option value="">Select Wing</option>
                        <option value="Scout">Scout</option>
                        <option value="Guide">Guide</option>  
                      </select>
                    </div>
      
                    {course.wing && (
                      <div className="mt-2 flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">
                          Section
                        </label>
                        <select
                          value={course.subwing}
                          disabled={
                            index < courseDisable.length && courseDisable[index]
                          }
                          onChange={(e) =>
                            handleChange(index, "subwing", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                        >
                          <option value="">Select Section</option>
                          {subWingOptions[course.wing].map((option) => (
                            <option
                              key={option}
                              value={option}
                              disabled={
                                // Disable if the option is already selected in another course
                                courses.some(
                                  (c, idx) => idx !== index && c.subwing === option
                                )
                              }
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
      
                    <div>
                      <label className="block text-sm font-bold text-black">
                        From Date
                      </label>
                      <input
                        type="date"
                        value={course.fromDate}
                        disabled={
                          index < courseDisable.length && courseDisable[index]
                        }
                        onChange={(e) =>
                          handleChange(index, "fromDate", e.target.value)
                        }
                        className="outline-none mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black">
                        To Date
                      </label>
                      <input
                        type="date"
                        value={course.toDate}
                        disabled={
                          index < courseDisable.length && courseDisable[index]
                        }
                        onChange={(e) =>
                          handleChange(index, "toDate", e.target.value)
                        }
                        className="outline-none mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black">
                        Venue
                      </label>
                      <input
                        type="text"
                        placeholder="Enter the Venue"
                        value={course.venue}
                        disabled={
                          index < courseDisable.length && courseDisable[index]
                        }
                        onChange={(e) => handleChange(index, "venue", e.target.value)}
                        className="mt-1 outline-none py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black">
                        Leader
                      </label>
                      <input
                        type="text"
                        placeholder="Enter the Leader"
                        value={course.leader}
                        disabled={
                          index < courseDisable.length && courseDisable[index]
                        }
                        onChange={(e) =>
                          handleChange(index, "leader", e.target.value)
                        }
                        className="mt-1 outline-none py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black">
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter the Certificate Number"
                        value={course.certificateNumber}
                        disabled={
                          index < courseDisable.length && courseDisable[index]
                        }
                        onChange={(e) =>
                          handleChange(index, "certificateNumber", e.target.value)
                        }
                        className="mt-1 py-2 outline-none bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black">
                        Certificate Date
                      </label>
                      <input
                        type="date"
                        value={course.certificateDate}
                        disabled={
                          index < courseDisable.length && courseDisable[index]
                        }
                        onChange={(e) =>
                          handleChange(index, "certificateDate", e.target.value)
                        }
                        className="mt-1 py-2 outline-none bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
      
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addCourse}
                  className="py-2 px-4 outline-none border border-transparent text-sm font-bold rounded-md text-white bg-[#1D56A5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Course
                </button>
              </div>
      
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#1D56A5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          );
          case 3:
            return (

              <div className="max-w-5xl mx-auto">
              <ToastContainer />
              <div className="text-center font-bold py-5 text-2xl">
                ADVANCE COURSE
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="p-4 border border-gray-300 rounded mb-4"
                  >
                    <div className="flex justify-end mb-2">
                      {courses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCourse(course.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
      
                    <div className="grid grid-cols-2 gap-x-20 gap-y-5">
                      <div className="flex flex-col mb-4">
                        <label className="mb-1 font-medium text-gray-700">Wing</label>
                        <select
                          value={course.wing}
                          disabled={
                            index < courseDisable.length && courseDisable[index]
                          }
                          onChange={(e) =>
                            handleChange(index, "wing", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                        >
                          <option value="">Select Wing</option>
                          <option value="Scout">Scout</option>
                          <option value="Guide">Guide</option>
                        </select>
                      </div>
      
                      {course.wing && (
                        <div className="mt-2 flex flex-col">
                          <label className="mb-1 font-medium text-gray-700">
                            Section
                          </label>
                          <select
                            value={course.subwing}
                            disabled={
                              index < courseDisable.length && courseDisable[index]
                            }
                            onChange={(e) =>
                              handleChange(index, "subwing", e.target.value)
                            }
                            className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                          >
                            <option value="">Select Section</option>
                            {subWingOptions[course.wing].map((option) => (
                              <option
                                key={option}
                                value={option}
                                disabled={courses.some(
                                  (c, idx) => idx !== index && c.subwing === option
                                )}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
      
                      <div className="flex flex-col mb-4">
                        <label className="mb-1 font-medium text-gray-700">
                          From Date
                        </label>
                        <input
                          type="date"
                          value={course.fromDate}
                          onChange={(e) =>
                            handleChange(index, "fromDate", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                        />
                      </div>
      
                      <div className="flex flex-col mb-4">
                        <label className="mb-1 font-medium text-gray-700">
                          To Date
                        </label>
                        <input
                          type="date"
                          value={course.toDate}
                          onChange={(e) =>
                            handleChange(index, "toDate", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                        />
                      </div>
      
                      <div className="flex flex-col mb-4">
                        <label className="mb-1 font-medium text-gray-700">
                          Venue
                        </label>
                        <input
                          type="text"
                          value={course.venue}
                          onChange={(e) =>
                            handleChange(index, "venue", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                          placeholder="Enter venue"
                        />
                      </div>
      
                      <div className="flex flex-col mb-4">
                        <label className="mb-1 font-medium text-gray-700">
                          Leader
                        </label>
                        <input
                          type="text"
                          value={course.leader}
                          onChange={(e) =>
                            handleChange(index, "leader", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                          placeholder="Enter leader name"
                        />
                      </div>
      
                      <div className="flex flex-col mb-4">
                        <label className="mb-1 font-medium text-gray-700">
                          Certificate Number
                        </label>
                        <input
                          type="text"
                          value={course.certificateNumber}
                          onChange={(e) =>
                            handleChange(index, "certificateNumber", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                          placeholder="Enter certificate number"
                        />
                      </div>
      
                      <div className="flex flex-col mb-4">
                        <label className="mb-1 font-medium text-gray-700">
                          Certificate Date
                        </label>
                        <input
                          type="date"
                          value={course.certificateDate}
                          onChange={(e) =>
                            handleChange(index, "certificateDate", e.target.value)
                          }
                          className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addCourse}
                    className="text-white hover:text-blue-700 font-bold bg-blue-600 px-4 py-2 rounded-md"
                  >
                    Add Course
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            );
      default:
        return null;
    }
  };

  return (
    <div className="p-14">
      <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1D56A5] uppercase">
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
                className="bg-yellow -500 text-white rounded-md px-4 py-2"
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