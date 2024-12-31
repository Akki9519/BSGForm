

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";

const BasicForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [courses, setCourses] = useState([
    {
      id: 1,
      wing: "",
      subwing: "",
      fromDate: "",
      toDate: "",
      venue: "",
      leader: "",
      certificateNumber: "",
      certificateDate: "",
    },
  ]);

  const [subWingOptions, setSubWingOptions] = useState({
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger"],
  });
  const [selectedSubWings, setSelectedSubWings] = useState([]);
  const [courseDisable, setCourseDisable] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      wing: "",
      subwing: "",
      fromDate: "",
      toDate: "",
      venue: "",
      leader: "",
      certificateNumber: "",
      certificateDate: "",
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id) => {
    const courseToRemove = courses.find((course) => course.id === id);
    if (courseToRemove.subwing) {
      setSelectedSubWings(
        selectedSubWings.filter((subwing) => subwing !== courseToRemove.subwing)
      );
    }
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const handleChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);

    if (field === "subwing") {
      setSelectedSubWings([...selectedSubWings, value]);
    }
  };

  const validateForm = () => {
    return courses.every(
      (course) =>
        course.wing &&
        course.subwing &&
        course.fromDate &&
        course.toDate &&
        course.venue &&
        course.leader &&
        course.certificateNumber &&
        course.certificateDate
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    try {
      const storedIdString = localStorage.getItem("_id");
      const userId = storedIdString ? JSON.parse(storedIdString) : null;

      for (let i = 0; i < courses.length; i++) {
        if (courses[i]._id) {
          continue;
        }
        try {
          const response = await axios.post(
            `${BASE_URL}/api/v1/advancedDetails/${userId}`,
            courses[i],
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          localStorage.setItem("id", response.data._id);
          toast.success("Advance Form Submitted Successfully");
        } catch (error) {
          console.log(error, i, "data");
        }
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedIdString = localStorage.getItem("_id");
        const userId = JSON.parse(storedIdString);

        const response = await axios.get(
          `${BASE_URL}/api/v1/advancedDetails/${userId}`
        );
        if (response.data.some((item) => item.isSubmitted === true)) {
          setIsSubmitted(true);
        }

        if (response.data && response.data.length > 0) {
          setCourses(response.data);
          setCourseDisable(new Array(response.data.length).fill(true));
        }
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <ToastContainer />
        <div className="text-center font-bold py-5 text-2xl">ADVANCE COURSE</div>
        {isSubmitted ? (
          <div className="mt-8 space-y-6">
            {courses.map((course) => (
              <div key={course._id} className="p-4 border border-gray-300 rounded mb-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
                  <div><strong>Wing:</strong> {course.wing}</div>
                  <div><strong>Section:</strong> {course.subwing}</div>
                  <div><strong>From Date:</strong> {course.fromDate}</div>
                  <div><strong>To Date:</strong> {course.toDate}</div>
                  <div><strong>Venue:</strong> {course.venue}</div>
                  <div><strong>Leader:</strong> {course.leader}</div>
                  <div><strong>Certificate Number:</strong> {course.certificateNumber}</div>
                  <div><strong>Certificate Date:</strong> {course.certificateDate}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div onSubmit={handleSubmit} className="mt-8 space-y-6">
            {courses.map((course, index) => (
              <div key={course.id} className="p-4 border border-gray-300 rounded mb-4">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
                  {/* Form fields */}
                  {/* Include Wing, Section, From Date, To Date, Venue, Leader, Certificate Number, Certificate Date */}
                  <div className="flex flex-col mb-4">
                     <label className="mb-1 font-medium text-gray-700">Wing</label>
                     <select
                      value={course.wing}
                      disabled={index < courseDisable.length && courseDisable[index]}
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
                      <label className="mb-1 font-medium text-gray-700">Section</label>
                      <select
                        value={course.subwing}
                        disabled={index < courseDisable.length && courseDisable[index]}
                        onChange={(e) => handleChange(index, "subwing", e.target.value)}
                        className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                      >
                        <option value="">Select Section</option>
                        {subWingOptions[course.wing].map((option) => (
                          <option
                            key={option}
                            value={option}
                            disabled={courses.some((c, idx) => idx !== index && c.subwing === option)}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-bold text-black">From Date</label>
                    <input
                      type="date"
                      value={course.fromDate}
                      disabled={index < courseDisable.length && courseDisable[index]}
                      onChange={(e) => handleChange(index, "fromDate", e.target.value)}
                      className="outline-none mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black">To Date</label>
                    <input
                      type="date"
                      value={course.toDate}
                      disabled={index < courseDisable.length && courseDisable[index]}
                      onChange={(e) => handleChange(index, "toDate", e.target.value)}
                      className="outline-none mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black">Venue</label>
                    <input
                      type="text"
                      placeholder="Enter the Venue"
                      value={course.venue}
                      disabled={index < courseDisable.length && courseDisable[index]}
                      onChange={(e) => handleChange(index, "venue", e.target.value)}
                      className="mt-1 outline-none py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black">Leader</label>
                    <input
                      type="text"
                      placeholder="Enter the Leader"
                      value={course.leader}
                      disabled={index < courseDisable.length && courseDisable[index]}
                      onChange={(e) => handleChange(index, "leader", e.target.value)}
                      className="mt-1 outline-none py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black">Certificate Number</label>
                    <input
                      type="text"
                      placeholder="Enter the Certificate Number"
                      value={course.certificateNumber}
                      disabled={index < courseDisable.length && courseDisable[index]}
                      onChange={(e) => handleChange(index, "certificateNumber", e.target.value)}
                      className="mt-1 py-2 outline-none bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black">Certificate Date</label>
                    <input
                      type="date"
                      value={course.certificateDate}
                      disabled={index < courseDisable.length && courseDisable[index]}
                      onChange={(e) => handleChange(index, "certificateDate", e.target.value)}
                      className="mt-1 py-2 outline-none bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                </div>
          
            ))}
            <button
              type="button"
              onClick={addCourse}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Course
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BasicForm;
