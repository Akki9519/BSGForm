import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State for error messages
  const [course, setCourse] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const subWingOptions = {
    Scout: ["HWB-Cub", "HWB-Scout", "HWB-Rover"],
    Guide: ["HWB-Bulbul", "HWB-Guide", "HWB-Ranger"],
  };

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
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const handleChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);

    // Clear error for the specific field when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: { ...prevErrors[index], [field]: "" },
    }));
  };

  const functionDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    courses.forEach((course, index) => {
      newErrors[index] = {};

      // Validate Wing
      if (!course.wing) {
        newErrors[index].wing = "Wing is required.";
        isValid = false;
      }

      // Validate Sub-Wing
      if (!course.subwing) {
        newErrors[index].subwing = "Sub-Wing is required.";
        isValid = false;
      }

      // Validate From Date
      if (!course.fromDate) {
        newErrors[index].fromDate = "From Date is required.";
        isValid = false;
      }

      // Validate To Date
      if (!course.toDate) {
        newErrors[index].toDate = "To Date is required.";
        isValid = false;
      }

      // Validate certificate date
      if (!course.certificateDate) {
        newErrors[index].certificateDate = "Certificate Date is required.";
        isValid = false;
      }

      // Validate Parchment Number
      if (!course.parchmentNumber) {
        newErrors[index].parchmentNumber = "Parchment Number is required.";
        isValid = false;
      }

      // Validate Parchment Date
      if (!course.parchmentDate) {
        newErrors[index].parchmentDate = "Parchment Date is required.";
        isValid = false;
      }

      if (!course.venue) {
        newErrors[index].venue = "Venue is required.";
        isValid = false;
      }
      if (!course.certificateNumber) {
        newErrors[index].certificateNumber = " Certificate Number is required.";
        isValid = false;
      }
      // Date logic validations
      if (course.fromDate && course.toDate) {
        const fromDate = new Date(course.fromDate);
        const toDate = new Date(course.toDate);
        if (fromDate >= toDate) {
          newErrors[index].fromDate = "From Date must be less than To Date.";
          newErrors[index].toDate = "To Date must be greater than From Date.";
          isValid = false;
        }
      }

      if (course.toDate && course.certificateDate) {
        const toDate = new Date(course.toDate);
        const certificateDate = new Date(course.certificateDate);
        if (certificateDate <= toDate) {
          newErrors[index].certificateDate = "Certificate Date must be greater than To Date.";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      toast.error("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }

    try {
      const userId = ls.get("_id");
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
          formData.append("uploadCertificate", newCourses[i].uploadCertificate[0]);
        }
        if (newCourses[i].uploadparchment) {
          formData.append("uploadparchment", newCourses[i].uploadparchment[0]);
        }

        await axios.post(`${BASE_URL}/api/v1/hwbDetails/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("Hwb Form Submitted Successfully! Now Click Next To Proceed");
      fetchData();
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
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      const userId = ls.get("_id");
      const response = await axios.get(`${BASE_URL}/api/v1/hwbDetails/${userId}`);

      if (response.data.some((item) => item.isSubmitted === true)) {
        setIsSubmitted(true);
      }
      if (response.data && response.data.length > 0) {
        setFetchedData(response.data);
      }
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getLocal = async () => {
    const parchmentNumber = ls.get("parchmentNumber");
    const course = ls.get("sectionq"); // Use secure-ls to get the honourable number
    console.log(parchmentNumber, "hhhhhhhhhhhhh");

    // Update formData with the retrieved honourableChargeNo
    if (parchmentNumber && course === "HWB") {
      setCourses((prevCourses) =>
        prevCourses.map((c) => ({
          ...c,
          parchmentNumber: c.parchmentNumber || parchmentNumber, // Update only if parchmentNumber is not already set
        }))
      );
      setCourse(course);
    } else {
      setCourses((prevCourses) => prevCourses.map((c) => ({
        ...c,
        parchmentNumber: "", // Set to empty if no value
      })));
    }
  };

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <ToastContainer />
        <div className="text-center font-bold text-2xl text-red-500">
          HWB COURSE
        </div>

        {isSubmitted ? (
          <div className="mt-8 space-y-6">
            {fetchedData.map((course) => (
              <div
                key={course.id}
                className="p-4 border border-gray-300 rounded mb-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
                  <div>
                    <strong>Wing:</strong> {course.wing}
                  </div>
                  <div>
                    <strong>Section:</strong> {course.subwing}
                  </div>
                  <div>
                    <strong>From Date:</strong> {functionDate(course.fromDate)}
                  </div>
                  <div>
                    <strong>To Date:</strong> {functionDate(course.toDate)}
                  </div>
                  <div>
                    <strong>Venue:</strong> {course.venue}
                  </div>
                  <div>
                    <strong>Certificate Number:</strong> {course.certificateNumber}
                  </div>
                  <div>
                    <strong>Certificate Date:</strong> {functionDate(course.certificateDate)}
                  </div>
                  <div>
                    <strong>Parchment Number:</strong> {course.parchmentNumber}
                  </div>
                  <div>
                    <strong>Parchment Date:</strong> {functionDate(course.parchmentDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {Array.isArray(courses) && courses.map((cours, index) => (
              <div
                key={cours.id}
                className="p-4 border border-gray-300 rounded mb-4"
              >
                <div className="flex justify-end mb-2">
                  {courses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCourse(cours.id)}
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
                    <label className="mb-1 font-medium text-black">Wing<span className="text-red-500">*</span></label>
                    <select
                      value={cours.wing}
                      onChange={(e) =>
                        handleChange(index, "wing", e.target.value)
                      }
                      className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                    >
                      <option value="">Select Wing</option>
                      <option value="Scout">Scout</option>
                      <option value="Guide">Guide</option>
                    </select>
                    {errors[index]?.wing && (
                      <span className="text-red-500 text-sm">{errors[index].wing}</span>
                    )}
                  </div>
                  {cours.wing && (
                    <div className="mt-2 flex flex-col">
                      <label className="mb-1 font-medium text-black">Section<span className="text-red-500">*</span></label>
                      <select
                        value={cours.subwing}
                        onChange={(e) =>
                          handleChange(index, "subwing", e.target.value)
                        }
                        className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                      >
                        <option value="">Select Section</option>
                        {subWingOptions[cours.wing].map((option) => (
                          <option
                            key={option}
                            value={option}
                            disabled={
                              courses.some(
                                (c, idx) =>
                                  idx !== index && c.subwing === option
                              )
                            }
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[index]?.subwing && (
                        <span className="text-red-500 text-sm">{errors[index].subwing}</span>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-black">Course From Date<span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={cours.fromDate}
                      onChange={(e) =>
                        handleChange(index, "fromDate", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {errors[index]?.fromDate && (
                      <span className="text-red-500 text-sm">{errors[index].fromDate}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black">Course To Date<span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={cours.toDate}
                      onChange={(e) =>
                        handleChange(index, "toDate", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {errors[index]?.toDate && (
                      <span className="text-red-500 text-sm">{errors[index].toDate}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black">Venue<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={cours.venue}
                      placeholder="Enter The Venue"
                      onChange={(e) =>
                        handleChange(index, "venue", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {errors[index]?.venue && (
                      <span className="text-red-500 text-sm">{errors[index].venue}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black">Certificate Number<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={cours.certificateNumber}
                      placeholder="Enter The Certificate Number"
                      onChange={(e) =>
                        handleChange(index, "certificateNumber", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {errors[index]?.certificateNumber && (
                      <span className="text-red-500 text-sm">{errors[index].certificateNumber}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black">Certificate Date<span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={cours.certificateDate}
                      onChange={(e) =>
                        handleChange(index, "certificateDate", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {errors[index]?.certificateDate && (
                      <span className="text-red-500 text-sm">{errors[index].certificateDate}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black">Parchment Number<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={cours.parchmentNumber}
                      disabled={cours.parchmentNumber && course}
                      placeholder="Enter The Parchment Number"
                      onChange={(e) =>
                        handleChange(index, "parchmentNumber", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {errors[index]?.parchmentNumber && (
                      <span className="text-red-500 text-sm">{errors[index].parchmentNumber}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black">Parchment Date<span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={cours.parchmentDate}
                      onChange={(e) =>
                        handleChange(index, "parchmentDate", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    {errors[index]?.parchmentDate && (
                      <span className="text-red-500 text-sm">{errors[index].parchmentDate}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCourse}
              className="px-4 py-2 uppercase bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Course
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 uppercase text-white rounded hover:bg-blue-600 ml-5"
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Submit HWB Details"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HwbForm;