// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { BASE_URL } from "../../constant/constant";
// // const CourseForm = () => {
// //   const [courses, setCourses] = useState([
// //     {
// //       id: 1,
// //       wing: "",
// //       subwing: "",
// //       fromDate: "",
// //       toDate: "",
// //       venue: "",
// //       leader: "",
// //       certificateNumber: "",
// //       certificateDate: "",
// //     },
// //   ]);

// //   const [subWingOptions, setSubWingOptions] = useState({
// //     Scout: ["Cub", "Scout", "Rover"],
// //     Guide: ["Bulbul", "Guide", "Ranger"],
// //   });
// //   const [selectedSubWings, setSelectedSubWings] = useState([]);
// //   const [courseDisable, setCourseDisable] = useState([]);

// //   const addCourse = () => {
// //     const newCourse = {
// //       id: courses.length + 1,
// //       wing: "",
// //       subwing: "",
// //       fromDate: "",
// //       toDate: "",
// //       venue: "",
// //       leader: "",
// //       certificateNumber: "",
// //       certificateDate: "",
// //     };
// //     setCourses([...courses, newCourse]);

// //   };

// //   const removeCourse = (id) => {
// //     const courseToRemove = courses.find((course) => course.id === id);
// //     if (courseToRemove.subwing) {
// //       setSelectedSubWings(
// //         selectedSubWings.filter((subwing) => subwing !== courseToRemove.subwing)
// //       );
// //     }
// //     const updatedCourses = courses.filter((course) => course.id !== id);
// //     setCourses(updatedCourses);
// //   };

// //   const handleChange = (index, field, value) => {
// //     const updatedCourses = [...courses];
// //     updatedCourses[index][field] = value;
// //     setCourses(updatedCourses);

// //     if (field === "subwing") {
// //       setSelectedSubWings([...selectedSubWings, value]);
// //     }
// //   };

// //   const validateForm = () => {
// //     return courses.every(
// //       (course) =>
// //         course.wing &&
// //         course.subwing &&
// //         course.fromDate &&
// //         course.toDate &&
// //         course.venue &&
// //         course.leader &&
// //         course.certificateNumber &&
// //         course.certificateDate
// //     );
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// // const response=await axios.get('${BASE_URL}/api/v1/basicDetails/${userId}');
// // console.log(response.data,"response");
// // if(response.data.subwing===subwing){
// // console.log("error free")
// // }
// // else{
// //   console.log("error",error)
// //   Toast.success("error")
// // }

// //     if (!validateForm()) {
// //       toast.error("Please fill out all fields before submitting.");
// //       return;
// //     }
// //     console.log(courses, "courses");
// //     try {
// //       const storedIdString = localStorage.getItem("_id");
// //       const userId = JSON.parse(storedIdString);
// //       for (let i = 0; i < courses.length; i++) {
// //         if (courses[i]._id) {
// //           continue;
// //         }
// //         try {
// //           const response = await axios.post(
// //             `${BASE_URL}/api/v1/advancedDetails/${userId}`,
// //             courses[i],
// //             {
// //               headers: {
// //                 "Content-Type": "application/json",
// //               },
// //             }
// //           );
// //           console.log(response, "response");
// //           console.log(response.data, "basicDetals");
// //           const responseMessage1 = response.data._id;
// //           console.log(responseMessage1, "responseMessage");
// //           localStorage.setItem("id", responseMessage1);

// //           console.log("Response:", response);
// //           toast.success("Form Submitted Successfully");
// //         } catch (error) {
// //           console.log(error, i, "data");
// //         }
// //       }

// //       setCourses([
// //         {
// //           id: 1,
// //           wing: "",
// //           subwing: "",
// //           fromDate: "",
// //           toDate: "",
// //           venue: "",
// //           leader: "",
// //           certificateNumber: "",
// //           certificateDate: "",
// //         },
// //       ]);
// //       setSelectedSubWings([]);
// //     } catch (error) {
// //       console.error("Error:", error);
// //       toast.error("An error occurred during registration");
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const storedIdString = localStorage.getItem("_id");
// //         const userId = JSON.parse(storedIdString);

// //         const response = await axios.get(
// //           `${BASE_URL}/api/v1/advancedDetails/${userId}`
// //         );
// //         console.log(response.data, "advancedDetails");

// //         const advancedDetails = response.data[0];
// //         console.log(advancedDetails, "advance");
// //         if (advancedDetails) {
// //           setCourses(response.data);
// //           setCourseDisable(new Array(advancedDetails.length).fill(true));

// //         }
// //       } catch (error) {
// //         console.error("Error fetching personal details:", error);

// //       }
// //     };

// //     fetchData();
// //   }, []);
// //   return (
// //     <>
// //     <div className="bg-blue-100 border-l-4 border-blue-500 p-2 rounded-md shadow-lg -mt-4">
// //     <div className="flex items-start">
// //       <svg
// //         className="h-6 w-6 text-blue-500 mt-0.5 mr-2"
// //         fill="none"
// //         viewBox="0 0 24 24"
// //         stroke="currentColor"
// //       >
// //         <path
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //           strokeWidth="2"
// //           d="M13 16h-1v-4h-1m0-4h.01M12 4v4m-6 8h12v2H6v-2z"
// //         />
// //       </svg>
// //       <div className="text-blue-800">
// //         <span className="font-semibold text-red-600">Disclaimer:</span>
// //         Once you submit this form, you will not be able to make any changes to the information provided. Please review your entries carefully before submitting, as this submission is final and cannot be edited or resubmitted.
// //       </div>
// //     </div>
// //   </div>

// //     <div className="max-w-5xl mx-auto">
// //       <ToastContainer />
// //       <div className="text-center font-bold py-5 text-2xl">ADVANCE COURSE</div>
// //       <form onSubmit={handleSubmit} className="mt-8 space-y-6">
// //         {courses.map((course, index) => (
// //           <div
// //             key={course.id}
// //             className="p-4 border border-gray-300 rounded mb-4"
// //           >
// //             <div className="flex justify-end mb-2">
// //               {courses.length > 1 && (
// //                 <button
// //                   type="button"
// //                   onClick={() => removeCourse(course.id)}
// //                   className="text-red-600 hover:text-red-700"
// //                 >
// //                   <svg
// //                     className="h-5 w-5"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth="2"
// //                       d="M6 18L18 6M6 6l12 12"
// //                     />
// //                   </svg>
// //                 </button>
// //               )}
// //             </div>

// //             <div className="grid grid-cols-2 gap-x-20 gap-y-5">
// //               <div className="flex flex-col mb-4">
// //                 <label className="mb-1 font-medium text-gray-700">Wing</label>
// //                 <select
// //                   value={course.wing}
// //                   disabled={
// //                     index < courseDisable.length && courseDisable[index]
// //                   }
// //                   onChange={(e) => handleChange(index, "wing", e.target.value)}
// //                   className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
// //                 >
// //                   <option value="">Select Wing</option>
// //                   <option value="Scout">Scout</option>
// //                   <option value="Guide">Guide</option>
// //                 </select>
// //               </div>

// //               {course.wing && (
// //                 <div className="mt-2 flex flex-col">
// //                   <label className="mb-1 font-medium text-gray-700">
// //                     Section
// //                   </label>
// //                   <select
// //                     value={course.subwing}
// //                     disabled={
// //                       index < courseDisable.length && courseDisable[index]
// //                     }
// //                     onChange={(e) =>
// //                       handleChange(index, "subwing", e.target.value)
// //                     }
// //                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
// //                   >
// //                     <option value="">Select Section</option>
// //                     {subWingOptions[course.wing].map((option) => (
// //                       <option
// //                         key={option}
// //                         value={option}
// //                         disabled={
// //                           // Disable if the option is already selected in another course
// //                           courses.some(
// //                             (c, idx) => idx !== index && c.subwing === option
// //                           )
// //                         }
// //                       >
// //                         {option}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               )}

// //               <div>
// //                 <label className="block text-sm font-bold text-black">
// //                   From Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   value={course.fromDate}
// //                   disabled={
// //                     index < courseDisable.length && courseDisable[index]
// //                   }
// //                   onChange={(e) =>
// //                     handleChange(index, "fromDate", e.target.value)
// //                   }
// //                   className="outline-none mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-bold text-black">
// //                   To Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   value={course.toDate}
// //                   disabled={
// //                     index < courseDisable.length && courseDisable[index]
// //                   }
// //                   onChange={(e) =>
// //                     handleChange(index, "toDate", e.target.value)
// //                   }
// //                   className="outline-none mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-bold text-black">
// //                   Venue
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter the Venue"
// //                   value={course.venue}
// //                   disabled={
// //                     index < courseDisable.length && courseDisable[index]
// //                   }
// //                   onChange={(e) => handleChange(index, "venue", e.target.value)}
// //                   className="mt-1 outline-none py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-bold text-black">
// //                   Leader
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter the Leader"
// //                   value={course.leader}
// //                   disabled={
// //                     index < courseDisable.length && courseDisable[index]
// //                   }
// //                   onChange={(e) =>
// //                     handleChange(index, "leader", e.target.value)
// //                   }
// //                   className="mt-1 outline-none py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-bold text-black">
// //                   Certificate Number
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter the Certificate"
// //                   value={course.certificateNumber}
// //                   disabled={
// //                     index < courseDisable.length && courseDisable[index]
// //                   }
// //                   onChange={(e) =>
// //                     handleChange(index, "certificateNumber", e.target.value)
// //                   }
// //                   className="mt-1 py-2 outline-none bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-bold text-black">
// //                   Certificate Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   value={course.certificateDate}
// //                   disabled={
// //                     index < courseDisable.length && courseDisable[index]
// //                   }
// //                   onChange={(e) =>
// //                     handleChange(index, "certificateDate", e.target.value)
// //                   }
// //                   className="mt-1 py-2 outline-none bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         ))}

// //         <div className="flex justify-end">
// //           <button
// //             type="button"
// //             onClick={addCourse}
// //             className="py-2 px-4 outline-none border border-transparent text-sm font-bold rounded-md text-white bg-[#1D56A5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //           >
// //             Add Course
// //           </button>
// //         </div>

// //         <div className="flex justify-end">
// //           <button
// //             type="submit"
// //             className="py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#1D56A5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //           >
// //             Submit
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //     </>
// //   );
// // };

// // export default CourseForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";

const AdvancedForm = () => {
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

  const [subWingOptions] = useState({
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger"],
  });
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
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const handleChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;

    if (field === "subwing") {
      const existingSubwings = updatedCourses
        .filter((course, idx) => idx !== index)
        .map((course) => course.subwing);
      if (!existingSubwings.includes(value)) {
        updatedCourses[index][field] = value;
      }
    }

    setCourses(updatedCourses);
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
      const userId = JSON.parse(storedIdString);

      const response = await axios.get(
        `${BASE_URL}/api/v1/basicDetails/${userId}`
      );
      console.log(response.data, "response");

      // Ensure there's no error based on subwing selection
      const allSubwings = courses.map((course) => course.subwing);
      console.log(allSubwings, "AllSubwings");

      // Check if response contains any value from allSubwings
      const isValidSubwing = allSubwings.some((subwing) =>
        response.data.includes(subwing)
      );
      console.log(isValidSubwing, "dsjbs");
      if (isValidSubwing) {
        // Proceed with the code if a valid subwing is found
        console.log("Valid subwing found. Proceeding...");
        // Your code here...
      } else {
        // Show error if no valid subwing is found
        console.error(
          "Error: The response does not contain any valid subwing."
        );
        // Display an error message to the user
      }

      for (const course of courses) {
        if (course._id) {
          continue; // Skip if course already has an ID
        }
        try {
          const postResponse = await axios.post(
            `${BASE_URL}/api/v1/advancedDetails/${userId}`,
            course,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(postResponse.data, "submitted course");
          localStorage.setItem("id", postResponse.data._id);
          toast.success("Form Submitted Successfully");
        } catch (error) {
          console.error("Submission error:", error);
          toast.error("An error occurred while submitting the course.");
        }
      }

      // Reset form fields
      setCourses([
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
        console.log(response.data, "advancedDetails");

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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
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
    </>
  );
};

export default AdvancedForm;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BASE_URL } from "../../constant/constant";

// const CourseForm = () => {
//   const [courses, setCourses] = useState([createEmptyCourse()]);
//   const [subWingOptions] = useState({
//     Scout: ["Cub", "Scout", "Rover"],
//     Guide: ["Bulbul", "Guide", "Ranger"],
//   });
//   const [courseDisable, setCourseDisable] = useState([]);

//   function createEmptyCourse() {
//     return {
//       id: Date.now(), // Use timestamp for unique ID
//       wing: "",
//       subwing: "",
//       fromDate: "",
//       toDate: "",
//       venue: "",
//       leader: "",
//       certificateNumber: "",
//       certificateDate: "",
//     };
//   }

//   const addCourse = () => {
//     setCourses([...courses, createEmptyCourse()]);
//   };

//   const removeCourse = (id) => {
//     const updatedCourses = courses.filter((course) => course.id !== id);
//     setCourses(updatedCourses);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedCourses = [...courses];
//     updatedCourses[index][field] = value;

//     // Only update subwing if it's a valid selection
//     if (field === "subwing") {
//       const existingSubwings = updatedCourses
//         .filter((course, idx) => idx !== index)
//         .map((course) => course.subwing);
//       if (!existingSubwings.includes(value)) {
//         updatedCourses[index][field] = value;
//       }
//     }

//     setCourses(updatedCourses);
//   };

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

  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (!validateForm()) {
//       toast.error("Please fill out all fields before submitting.");
//       return;
//     }
  
//     try {
//       const storedIdString = localStorage.getItem("_id");
//       const userId = JSON.parse(storedIdString);
//       const response = await axios.get(
//         `${BASE_URL}/api/v1/basicDetails/${userId}`
//       );
//       console.log(response.data, "response");
  
//       // Submit each course
//       for (const course of courses) {
//         const selectedSubwing = course.subwing; // Get the subwing of the current course being processed
  
//         console.log(`Current selected subwing: ${selectedSubwing}`); // Log the current selected subwing
  
//         // Check if the current selected subwing is valid by comparing it with the response data
//         const isValidSubwing = response.data.some((item) => {
//           const match = item.subwing === selectedSubwing; // Check if the subwing matches the current course subwing
//           console.log(
//             `Checking item.subwing: ${item.subwing}, Match: ${match}`
//           ); // Log the item and whether it matches
//           return match;
//         });
  
//         console.log(`Is valid subwing for course: ${isValidSubwing}`); // Log the result for the current course
  
//         if (!isValidSubwing) {
//           toast.error(`No valid subwing found for subwing: ${selectedSubwing}`);
//           return;
//         }
  
//         if (course._id) continue; // Skip if course already has an ID
  
//         try {
//           const postResponse = await axios.post(
//             `${BASE_URL}/api/v1/advancedDetails/${userId}`,
//             course,
//             { headers: { "Content-Type": "application/json" } }
//           );
//           console.log(postResponse.data, "Post response");
//           toast.success("Form Submitted Successfully");
//         } catch (error) {
//           console.error("Submission error:", error);
//           toast.error("An error occurred while submitting the course.");
//         }
//       }
  
//       // Reset form fields
//       setCourses([createEmptyCourse()]);
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred during registration");
//     }
//   };
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedIdString = localStorage.getItem("_id");
//         const userId = JSON.parse(storedIdString);
//         const response = await axios.get(
//           `${BASE_URL}/api/v1/advancedDetails/${userId}`
//         );

//         if (response.data && response.data.length > 0) {
//           setCourses(response.data);
//           setCourseDisable(new Array(response.data.length).fill(true));
//         }
//       } catch (error) {
//         console.error("Error fetching personal details:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="bg-blue-100 border-l-4 border-blue-500 p-2 rounded-md shadow-lg -mt-4">
//         <div className="flex items-start">
//           <svg
//             className="h-6 w-6 text-blue-500 mt-0.5 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M13 16h-1v-4h-1m0-4h.01M12 4v4m-6 8h12v2H6v-2z"
//             />
//           </svg>
//           <div className="text-blue-800">
//             <span className="font-semibold text-red-600">Disclaimer:</span>
//             Once you submit this form, you will not be able to make any changes
//             to the information provided. Please review your entries carefully
//             before submitting, as this submission is final and cannot be edited
//             or resubmitted.
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto">
//         <ToastContainer />
//         <div className="text-center font-bold py-5 text-2xl">
//           ADVANCE COURSE
//         </div>
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           {courses.map((course, index) => (
//             <div
//               key={course.id}
//               className="p-4 border border-gray-300 rounded mb-4"
//             >
//               <div className="flex justify-end mb-2">
//                 {courses.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeCourse(course.id)}
//                     className="text-red-600 hover:text-red-700"
//                   >
//                     <svg
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-x-20 gap-y-5">
//                 <div className="flex flex-col mb-4">
//                   <label className="mb-1 font-medium text-gray-700">Wing</label>
//                   <select
//                     value={course.wing}
//                     disabled={
//                       index < courseDisable.length && courseDisable[index]
//                     }
//                     onChange={(e) =>
//                       handleChange(index, "wing", e.target.value)
//                     }
//                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                   >
//                     <option value="">Select Wing</option>
//                     <option value="Scout">Scout</option>
//                     <option value="Guide">Guide</option>
//                   </select>
//                 </div>

//                 {course.wing && (
//                   <div className="mt-2 flex flex-col">
//                     <label className="mb-1 font-medium text-gray-700">
//                       Section
//                     </label>
//                     <select
//                       value={course.subwing}
//                       disabled={
//                         index < courseDisable.length && courseDisable[index]
//                       }
//                       onChange={(e) =>
//                         handleChange(index, "subwing", e.target.value)
//                       }
//                       className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                     >
//                       <option value="">Select Section</option>
//                       {subWingOptions[course.wing].map((option) => (
//                         <option
//                           key={option}
//                           value={option}
//                           disabled={courses.some(
//                             (c, idx) => idx !== index && c.subwing === option
//                           )}
//                         >
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 <div className="flex flex-col mb-4">
//                   <label className="mb-1 font-medium text-gray-700">
//                     From Date
//                   </label>
//                   <input
//                     type="date"
//                     value={course.fromDate}
//                     onChange={(e) =>
//                       handleChange(index, "fromDate", e.target.value)
//                     }
//                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div className="flex flex-col mb-4">
//                   <label className="mb-1 font-medium text-gray-700">
//                     To Date
//                   </label>
//                   <input
//                     type="date"
//                     value={course.toDate}
//                     onChange={(e) =>
//                       handleChange(index, "toDate", e.target.value)
//                     }
//                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div className="flex flex-col mb-4">
//                   <label className="mb-1 font-medium text-gray-700">
//                     Venue
//                   </label>
//                   <input
//                     type="text"
//                     value={course.venue}
//                     onChange={(e) =>
//                       handleChange(index, "venue", e.target.value)
//                     }
//                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                     placeholder="Venue"
//                   />
//                 </div>

//                 <div className="flex flex-col mb-4">
//                   <label className="mb-1 font-medium text-gray-700">
//                     Leader
//                   </label>
//                   <input
//                     type="text"
//                     value={course.leader}
//                     onChange={(e) =>
//                       handleChange(index, "leader", e.target.value)
//                     }
//                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                     placeholder="Leader Name"
//                   />
//                 </div>

//                 <div className="flex flex-col mb-4">
//                   <label className="mb-1 font-medium text-gray-700">
//                     Certificate Number
//                   </label>
//                   <input
//                     type="text"
//                     value={course.certificateNumber}
//                     onChange={(e) =>
//                       handleChange(index, "certificateNumber", e.target.value)
//                     }
//                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                     placeholder="Certificate Number"
//                   />
//                 </div>

//                 <div className="flex flex-col mb-4">
//                   <label className="mb-1 font-medium text-gray-700">
//                     Certificate Date
//                   </label>
//                   <input
//                     type="date"
//                     value={course.certificateDate}
//                     onChange={(e) =>
//                       handleChange(index, "certificateDate", e.target.value)
//                     }
//                     className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addCourse}
//             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             Add Course
//           </button>
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CourseForm;
