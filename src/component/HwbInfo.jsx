import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";

const HwbForm = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      wing: "",
      subwing: "",
      fromDate: "",
      toDate: "",
      venue: "",
      certificateNumber: "",
      certificateDate: "",
      parchmentDate: "",
      parchmentNumber: "",
      uploadCertificate: "",
      uploadparchment: "",
      new: true, // mark this course as new
    },
  ]);

  const [subWingOptions, setSubWingOptions] = useState({
    Scout: ["HWB-Cub", "HWB-Scout", "HWB-Rover"],
    Guide: ["HWB-Bulbul", "HWB-Guide", "HWB-Ranger"],
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
      certificateNumber: "",
      certificateDate: "",
      parchmentNumber: "",
      parchmentDate: "",
      uploadCertificate: "",
      uploadparchment: "",
      new: true, // mark this course as new
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storedIdString = localStorage.getItem("_id");
      const userId = JSON.parse(storedIdString);

      const newCourses = courses.filter((course) => course.new);

      for (let i = 0; i < newCourses.length; i++) {
        const formData = new FormData();

        formData.append("wing", newCourses[i].wing);
        formData.append("subwing", newCourses[i].subwing);
        formData.append("fromDate", newCourses[i].fromDate);
        formData.append("toDate", newCourses[i].toDate);
        formData.append("venue", newCourses[i].venue);
        formData.append("certificateNumber", newCourses[i].certificateNumber);
        formData.append("certificateDate", newCourses[i].certificateDate);
        formData.append("parchmentNumber", newCourses[i].parchmentNumber);
        formData.append("parchmentDate", newCourses[i].parchmentDate);

        if (newCourses[i].uploadCertificate) {
          formData.append(
            "uploadCertificate",
            newCourses[i].uploadCertificate[0]
          );
        }
        if (newCourses[i].uploadparchment) {
          formData.append("uploadparchment", newCourses[i].uploadparchment[0]);
        }

        const response = await axios.post(
          `${BASE_URL}/api/v1/hwbDetails/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const responseMessage1 = response.data._id;
        localStorage.setItem("id", responseMessage1);
      }

      toast.success("Form Submitted Successfully");

      // Reset only the new courses after submission
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.new
            ? {
                id: course.id,
                wing: "",
                subwing: "",
                fromDate: "",
                toDate: "",
                venue: "",
                certificateNumber: "",
                certificateDate: "",
                parchmentDate: "",
                parchmentNumber: "",
                uploadCertificate: "",
                uploadparchment: "",
                new: true,
              }
            : course
        )
      );
      setSelectedSubWings([]);
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
          `${BASE_URL}/api/v1/hwbDetails/${userId}`
        );

        const hwbDetails = response.data.map((course) => ({
          id: course.id,
          wing: course.wing,
          subwing: course.subwing,
          fromDate: course.fromDate,
          toDate: course.toDate,
          venue: course.venue,
          certificateNumber: course.certificateNumber,
          certificateDate: course.certificateDate,
          parchmentNumber: course.parchmentNumber,
          parchmentDate: course.parchmentDate,
          uploadCertificate: course.uploadCertificate,
          uploadparchment: course.uploadparchment,
          new: false, // mark fetched courses as not new
        }));
        console.log(hwbDetails, "hwbDetails");

        if (hwbDetails[0]) {
          setCourseDisable(new Array(hwbDetails.length).fill(true));
          setCourses(hwbDetails);
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
      <div className="text-center font-bold py-5 text-2xl">HWB COURSE</div>
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

            <div className="grid grid-cols-1 lg:grid-cols-2gap-x-20 gap-y-5">
              <div className="flex flex-col mb-4">
                <label className="mb-1 font-medium text-black">Wing</label>
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
                  <label className="mb-1 font-medium text-black">
                    Sub-Wing
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
                    <option value="">Select Sub-Wing</option>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black">
                  Venue
                </label>
                <input
                  type="text"
                  value={course.venue}
                  disabled={
                    index < courseDisable.length && courseDisable[index]
                  }
                  onChange={(e) => handleChange(index, "venue", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black">
                  Certificate Number
                </label>
                <input
                  type="text"
                  value={course.certificateNumber}
                  disabled={
                    index < courseDisable.length && courseDisable[index]
                  }
                  onChange={(e) =>
                    handleChange(index, "certificateNumber", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black">
                  Parchment Number
                </label>
                <input
                  type="text"
                  value={course.parchmentNumber}
                  disabled={
                    index < courseDisable.length && courseDisable[index]
                  }
                  onChange={(e) =>
                    handleChange(index, "parchmentNumber", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black">
                  Parchment Date
                </label>
                <input
                  type="date"
                  value={course.parchmentDate}
                  disabled={
                    index < courseDisable.length && courseDisable[index]
                  }
                  onChange={(e) =>
                    handleChange(index, "parchmentDate", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black">
                  Upload Certificate
                </label>
                {course.uploadCertificate && (
                  <iframe
                    src={course.uploadCertificate}
                    width="100%"
                    height="150px"
                    title="PDF Viewer"
                  ></iframe>
                )}{" "}
                <input
                  type="file"
                  onChange={(e) =>
                    handleChange(index, "uploadCertificate", e.target.files)
                  }
                  disabled={
                    index < courseDisable.length && courseDisable[index]
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black">
                  Upload Parchment
                </label>

                <div className="mt-2">
                  <iframe
                    src={course.uploadparchment}
                    width="100%"
                    height="150px"
                    title="PDF Viewer"
                  ></iframe>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleChange(index, "uploadparchment", e.target.files)
                    }
                    disabled={
                      index < courseDisable.length && courseDisable[index]
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addCourse}
            className="px-6 py-2 bg-[#1D56A5] text-white rounded-md "
          >
            Add Course
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#1D56A5] text-white rounded-md "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default HwbForm;