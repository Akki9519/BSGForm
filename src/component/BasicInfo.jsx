import React, { useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";
const BasicForm = () => {
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

//   const validateForm = () => {
//     return courses.every(
//       (course) =>
//         course.wing &&
//         course.subwing &&
//         course.fromDate &&
//         course.toDate &&
//         course.venue &&
//         course.leader &&
//         course.certificateNumber &&
//         course.certificateDate
//     );
//   };
// console.log(validateForm,"validateForm")
  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!validateForm()) {
    //   toast.error("Please fill out all fields before submitting.");
    //   return;
    // }
    console.log(courses, "courses");
    try {
      const storedIdString = localStorage.getItem("_id");
      const userId = JSON.parse(storedIdString);

      for (let i = 0; i < courses.length; i++) {
        if (courses[i]._id) {
          continue;
        }
        try {
          const response = await axios.post(
            `${BASE_URL}/api/v1/basicDetails/${userId}`,
            courses[i],
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response, "response");
          console.log(response.data, "basicDetals");
          const responseMessage1 = response.data._id;
          console.log(responseMessage1, "responseMessage");
          localStorage.setItem("id", responseMessage1);

          console.log("Response:", response);
          toast.success("Form Submitted Successfully");
        } catch (error) {
          console.log(error, i, "data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration");
    }
  };



  return (
<>

    <div className="max-w-5xl mx-auto">
      <ToastContainer />
      <div className="text-center font-bold py-5 text-2xl">BASIC COURSE</div>
      <div onSubmit={handleSubmit} className="mt-8 space-y-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
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
      </div>
    </div>
    </>
  );
};

export default BasicForm;