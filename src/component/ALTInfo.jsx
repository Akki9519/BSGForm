import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });
console.log(ls, "ls");
const ALTInfo = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubWings, setSelectedSubWings] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCourseFormVisible, setIsCourseFormVisible] = useState(false);
  const [formData, setFormData] = useState([
    {
      courseDate: "",
      courseToDate: "",
      place: "",
      leader: "",
      participants: "",
      courseFromDate: "",
      courseToDate: "",
      certificateNumber: "",
      certificateDate: "",
      courseLeader: "",
      coursePlace: "",
      honourableChargeNo: "", // New field
      issuedDate: "", // New field
    },
  ]);
  const [fetchedData, setFetchedData] = useState([]);
  const [course, setCourse] = useState("");

  const functionDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubWingChange = (subWing) => {
    setSelectedSubWings((prev) => {
      if (prev.includes(subWing)) {
        return prev.filter((sw) => sw !== subWing);
      } else {
        return [...prev, subWing];
      }
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const courseFromDate = new Date(formData.courseFromDate);
    const courseToDate = new Date(formData.courseToDate);
    const issuedDate = new Date(formData.issuedDate);
    const certificateDate = new Date(formData.certificateDate);
 

    if (courseFromDate > courseToDate) {
      toast.error("The 'Course From Date' must be less than or equal to the 'Course To Date'.");
      setLoading(false);
      return;
    }
  
    if (issuedDate >= new Date()) {
      toast.error("The 'Issued Date' must be less than today's date.");
      setLoading(false);
      return;
    }
  
    if (certificateDate <= courseToDate) {
      toast.error("The 'Certificate Date' must be greater than the 'Course To Date'.");
      setLoading(false);
      return;
    }
    const requiredFields = [
      formData.courseFromDate,
      formData.courseToDate,
      formData.certificateNumber,
      formData.certificateDate,
      formData.courseLeader,
      formData.coursePlace,
      formData.issuedDate,
    ];
    console.log(requiredFields, "requiredfilled");
    const allFieldsFilled = requiredFields.every(
      (field) => field !== "" && field !== undefined
    );

    if (!allFieldsFilled) {
      toast.error("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }

    // Prepare the data to be sent to the server
    const data = {
      wing: selectedWing,
      subWing: selectedSubWings,
      trainingType: selectType,
      courseDate: formData.courseDate,
      courseToDate: formData.courseToDate,
      place: formData.place,
      leader: selectType !== "conducted" ? formData.leader : undefined,
      participants: formData.participants,
      courseDetails: {
        fromDate: formData.courseFromDate,
        toDate: formData.courseToDate,
        certificateNumber: formData.certificateNumber,
        certificateDate: formData.certificateDate,
        courseLeader: formData.courseLeader,
        coursePlace: formData.coursePlace,
        honourableChargeNo: formData.honourableChargeNo, // New field
        issuedDate: formData.issuedDate, // New field
      },
      courses: courses.map((course) => ({
        selectType: course.selectType,
        courseDate: course.formData.courseDate,
        courseToDate: course.formData.courseToDate,
        place: course.formData.place,
        leader:
          course.selectType !== "conducted"
            ? course.formData.leader
            : undefined,
        participants: course.formData.participants,
      })),
    };

    console.log(data, "data");

    const userId = ls.get("_id"); // Corrected usage
    console.log(userId, "userId");

    if (!userId) {
      toast.error("User  ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v2/altinfo/${userId}`,
        data
      );
      toast.success(
        "ALT Form submitted successfully! Now Click Next To Proceed"
      );
      setLoading(false);
      fetchData();
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = ls.get("_id"); // Corrected usage
      // const userId =localStorage.getItem("userId")
      console.log(userId, "userId");
      if (!userId) {
        toast.error("User  ID not found. Please log in again.");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/kytuser/alt/${userId}`);
      console.log(response, "responseeeee");

      if (response.data.some((item) => item.isSubmitted === true)) {
        setIsSubmitted(true);
      }

      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
  };

  const handleAddCourse = () => {
    const newCourse = {
      id: formData.length + 1,
      courseDate: "",
      courseToDate: "",
      place: "",
      selectType: "",
      participants: "",
    };
    setFormData([...formData, newCourse]);
  };

  const getLocal = async () => {
    const honourableChargeNo = ls.get("honourableNumber");
    const course = ls.get("sectionq"); // Use secure-ls to get the honourable number
    console.log(honourableChargeNo, "hhhhhhhhhhhhh");

    // Update formData with the retrieved honourableChargeNo
    if (honourableChargeNo && course == "ALT") {
      setFormData((prevData) => ({
        ...prevData,
        honourableChargeNo: honourableChargeNo,
      }));
      setCourse(course);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        honourableChargeNo: "", // Set to empty if no value
      }));
    }
  };

  useEffect(() => {
    getLocal();
  }, []);

  const [courses, setCourses] = useState([
    { id: Date.now(), formData: {}, selectType: "" },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...courses];
    updatedCourses[index].formData[name] = value;
    setCourses(updatedCourses);
  };

  const handleSelectTypeChange = (index, e) => {
    const value = e.target.value;
    const updatedCourses = [...courses];
    updatedCourses[index].selectType = value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), formData: {}, selectType: "" }]);
  };

  const removeCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-center text-red-500 mb-2 uppercase">
          ALT Form
        </h2>

        {isSubmitted ? (
          <div className="mt-8 space-y-6">
            {fetchedData.map((course, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded mb-2"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
                  {/* Honourable Charge Number */}
                  <div>
                    <strong>Honourable No:</strong>{" "}
                    {course.courseDetails?.honourableChargeNo}
                  </div>

                  {/* Issue Date */}
                  <div>
                    <strong>Issue Date:</strong>{" "}
                    {functionDate(course.courseDetails?.issuedDate)}
                  </div>

                  <div>
                    <strong>ROT From Date:</strong>{" "}
                    {functionDate(course.courseDetails?.fromDate)}
                  </div>
                  <div>
                    <strong>ROT To Date:</strong>{" "}
                    {functionDate(course.courseDetails?.toDate)}
                  </div>

                  <div>
                    <strong>Certificate Date:</strong>{" "}
                    {functionDate(course.courseDetails.certificateDate)}
                  </div>

                  <div>
                    <strong>Certificate Number:</strong>{" "}
                    {course.courseDetails.certificateNumber}
                  </div>
                  <div>
                    <strong>Leader:</strong> {course.courseDetails.courseLeader}
                  </div>
                  <div>
                    <strong>Venue:</strong> {course.courseDetails?.coursePlace}
                  </div>

                  {/* Training Type: Iterate through each course */}
                  {course.courses?.map((subCourse, subIndex) => (
                    <div key={subIndex}>
                      <div>
                        <strong>Training Type {subIndex + 1}:</strong>{" "}
                        {subCourse.selectType}
                      </div>

                      {/* Training Course Date Range */}
                      <div>
                        <strong>Training Course From Date:</strong>{" "}
                        {functionDate(subCourse.courseDate)}
                      </div>
                      <div>
                        <strong>Training Course To Date:</strong>{" "}
                        {functionDate(subCourse.courseToDate)}
                      </div>

                      {/* ROT Date Range */}

                      {/* Venue and Place */}
                      <div>
                        <strong>Venue:</strong> {subCourse.place}
                      </div>

                      {/* Leader (only for "assisted" training type) */}
                      {subCourse.leader && (
                        <div>
                          <strong>Leader:</strong> {subCourse.leader}
                        </div>
                      )}

                      {/* Certificate Number */}
                      <div>
                        <strong>Certificate Number:</strong>{" "}
                        {course.courseDetails?.certificateNumber}
                      </div>

                      {/* Participants */}
                      <div>
                        <strong>Participants:</strong> {subCourse.participants}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border p-4 rounded">
            <ToastContainer />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">
                  Honourable Charge No<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="honourableChargeNo"
                  value={formData.honourableChargeNo}
                  onChange={handleInputChange1}
                  // disabled={formData.honourableChargeNo !== ""}
                  disabled={formData.honourableChargeNo && course} // Disable when both are available
                  placeholder="Honourable Charge No"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              {/* 
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">
                  Issued Date
                </label>
                <input
                  type="date"
                  name="issuedDate"
                  value={formData.issuedDate}
                  onChange={handleInputChange1}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div> */}
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">
                  Issued Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="issuedDate"
                  value={formData.issuedDate}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Remove time component for accurate comparison

                    if (selectedDate >= today) {
                      alert(
                        "The selected date must be less than today's date."
                      );
                      e.target.value = ""; // Reset the input value
                    } else {
                      handleInputChange1(e); // Update the form state
                    }
                  }}
                  max={new Date().toISOString().split("T")[0]} // Sets today's date as the maximum
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div>
              <h2 className="font-bold text-black text-lg mb-2">
                Training Courses Assisted/Conducted as ALT
              </h2>
              {courses.map((course, index) => (
                <div key={course.id} className="mb-4 border p-4 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div className="mb-2">
                      <label className="block mb-2 font-bold text-black">
                        Select Type
                      </label>
                      <select
                        value={course.selectType}
                        onChange={(e) => handleSelectTypeChange(index, e)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      >
                        <option value="">-- Select Type --</option>
                        <option value="conducted">Conducted</option>
                        <option value="assisted">Assisted</option>
                      </select>
                    </div>

                    {/* <div className="mb-2">
                      <label className="block mb-2 font-bold text-black">
                        Course From Date
                      </label>
                      <input
                        type="date"
                        name="courseDate"
                        value={course.formData.courseDate || ""}
                        onChange={(e) => handleInputChange(index, e)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div> */}
                    <div className="mb-2">
                      <label className="block mb-2 font-bold text-black">
                        Course From Date
                      </label>
                      <input
                        type="date"
                        name="courseDate"
                        value={course.formData.courseDate || ""}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const courseToDate = new Date(
                            course.formData.courseToDate
                          ); // Get courseToDate

                          if (selectedDate <= courseToDate) {
                            alert(
                              "The 'Course From Date' must be greater than the 'Course To Date'."
                            );
                            e.target.value = ""; // Reset the input value
                          } else {
                            handleInputChange(index, e); // Update state with valid date
                          }
                        }}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div className="mb-2">
                      <label className="block mb-2 font-bold text-black">
                        Course To Date
                      </label>
                      <input
                        type="date"
                        name="courseToDate"
                        value={course.formData.courseToDate || ""}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const courseDate = new Date(
                            course.formData.courseDate
                          ); // Get courseDate

                          if (selectedDate <= courseDate) {
                            toast.error(
                              "The 'Course To Date' must be greater than the 'Course Date'."
                            );
                            e.target.value = ""; // Reset the input value
                          } else {
                            handleInputChange(index, e); // Update state with valid date
                          }
                        }}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block mb-2 font-bold text-black">
                        Place
                      </label>
                      <input
                        type="text"
                        name="place"
                        value={course.formData.place || ""}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Place"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                      />
                    </div>

                    {course.selectType !== "conducted" && (
                      <div className="mb-2">
                        <label className="block mb-2 font-bold text-black">
                          Leader of the Course
                        </label>
                        <input
                          type="text"
                          name="leader"
                          value={course.formData.leader || ""}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="Leader of the Course"
                          className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                      </div>
                    )}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div className="mb-2">
                      <label className="block mb-2 font-bold text-black">
                        No. of Participants
                      </label>
                      <input
                        type="number"
                        name="participants"
                        value={course.formData.participants || ""}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="No. of Participants"
                        className="border border-gray-300 rounded px-3 py-2 w-96"
                      />
                    </div>
                  </div>
                  </div>
                 
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeCourse(index)}
                      className="bg-red-500 text-white rounded px-4 py-2 "
                    >
                      Close
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCourse}
                className="bg-[#1D56A5] text-white rounded px-4 py-2 "
              >
                Add Course
              </button>
            </div>

            <div className="space-y-4 mt-6">
              <div className="font-bold text-black">
                Details of Last ROT Attended
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block mb-2 font-bold text-black">
                    Course From Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="courseFromDate"
                    value={formData.courseFromDate}
                    onChange={(e) => {
                      const selectedFromDate = new Date(e.target.value);
                      const courseToDate = new Date(formData.courseToDate);

                      if (courseToDate && selectedFromDate > courseToDate) {
                        toast.error(
                          "The 'Course From Date' must be less than or equal to the 'Course To Date'."
                        );
                        e.target.value = ""; // Reset the input
                      } else {
                        handleInputChange1(e); // Update the form data with valid date
                      }
                    }}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-bold text-black">
                    Course To Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="courseToDate"
                    value={formData.courseToDate}
                    onChange={(e) => {
                      const selectedToDate = new Date(e.target.value);
                      const courseFromDate = new Date(formData.courseFromDate);

                      if (courseFromDate && selectedToDate <= courseFromDate) {
                        toast.error(
                          "The 'Course To Date' must be greater than the 'Course From Date'."
                        );
                        e.target.value = ""; // Reset the input value
                      } else {
                        handleInputChange1(e); // Update state with valid date
                      }
                    }}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Certificate Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleInputChange1}
                    placeholder="Certificate Number"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>

                {/* <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Certificate Date
                  </label>
                  <input
                    type="date"
                    name="certificateDate"
                    value={formData.certificateDate}
                    onChange={handleInputChange1}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div> */}
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Certificate Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="certificateDate"
                    value={formData.certificateDate}
                    onChange={(e) => {
                      const selectedCertificateDate = new Date(e.target.value);
                      const courseToDate = new Date(formData.courseToDate);

                      if (selectedCertificateDate <= courseToDate) {
                        toast.error(
                          "The 'Certificate Date' must be greater than the 'Course To Date'."
                        );
                        e.target.value = ""; // Reset the input value
                      } else {
                        handleInputChange1(e); // Update state with valid date
                      }
                    }}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Leader of the Course<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="courseLeader"
                    value={formData.courseLeader}
                    onChange={handleInputChange1}
                    placeholder="Leader of the Course"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Place<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="coursePlace"
                    value={formData.coursePlace}
                    onChange={handleInputChange1}
                    placeholder="Place"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
            </div>
            <div
              className="bg-[#1D56A5] uppercase rounded-md flex justify-center items-center py-1 text-white font-medium my-5 cursor-pointer"
              onClick={handleSubmit}
            >
              {loading ? "SUBMITTING..." : "Submit ALT DETAILS"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ALTInfo;

// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { BASE_URL } from "../constant/constant";
// import SecureLS from "secure-ls";

// const ls = new SecureLS({ encodingType: "aes", isCompression: false });

// const ALTInfo = () => {
//   const [selectedWing, setSelectedWing] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedSubWings, setSelectedSubWings] = useState([]);
//   const [selectType, setSelectType] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     courseDate: "",
//     courseToDate: "",
//     place: "",
//     leader: "",
//     participants: "",
//     courseFromDate: "",
//     certificateNumber: "",
//     certificateDate: "",
//     courseLeader: "",
//     coursePlace: "",
//     honourableChargeNo: "",
//     issuedDate: "",
//   });
//   const [fetchedData, setFetchedData] = useState([]);
//   const [courses, setCourses] = useState([{ id: Date.now(), formData: {}, selectType: "" }]);
//   const [errors, setErrors] = useState({}); // Error state

//   const functionDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleInputChange1 = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" }); // Clear error on change
//   };

//     const addCourse = () => {
//     setCourses([...courses, { id: Date.now(), formData: {}, selectType: "" }]);
//   };

//   const removeCourse = (index) => {
//     const updatedCourses = courses.filter((_, i) => i !== index);
//     setCourses(updatedCourses);
//   };
//   const handleInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedCourses = [...courses];
//     updatedCourses[index].formData[name] = value;
//     setCourses(updatedCourses);
//     setErrors({ ...errors, [`course-${index}-${name}`]: "" }); // Clear error on change
//   };

//   const handleSelectTypeChange = (index, e) => {
//     const value = e.target.value;
//     const updatedCourses = [...courses];
//     updatedCourses[index].selectType = value;
//     setCourses(updatedCourses);
//     setErrors({ ...errors, [`course-${index}-selectType`]: "" }); // Clear error on change
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({}); // Reset errors

//     const requiredFields = [
//       "courseToDate",
//       "courseFromDate",

//       "certificateNumber",
//       "certificateDate",
//       "courseLeader",
//       "coursePlace",
//       "honourableChargeNo",
//       "issuedDate",
//     ];

//     const newErrors = {};
//     requiredFields.forEach((field) => {
//       if (!formData[field]) {
//         newErrors[field] = "This field is required.";
//       }
//     });

//     // Check for course fields
//     courses.forEach((course, index) => {
//       if (!course.formData.courseDate) {
//         newErrors[`course-${index}-courseDate`] = "This field is required.";
//       }
//       if (!course.formData.courseToDate) {
//         newErrors[`course-${index}-courseToDate`] = "This field is required.";
//       }
//       if (!course.formData.place) {
//         newErrors[`course-${index}-place`] = "This field is required.";
//       }
//       if (course.selectType !== "conducted" && !course.formData.leader) {
//         newErrors[`course-${index}-leader`] = "This field is required.";
//       }
//       if (!course.formData.participants) {
//         newErrors[`course-${index}-participants`] = "This field is required.";
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       toast.error("Please fill out all fields before submitting.");
//       setLoading(false);
//       return;
//     }

//     // Prepare the data to be sent to the server
//     const data = {
//       wing: selectedWing,
//       subWing: selectedSubWings,
//       trainingType: selectType,
//       courseDate: formData.courseDate,
//       courseToDate: formData.courseToDate,
//       place: formData.place,
//       leader: selectType !== "conducted" ? formData.leader : undefined,
//       participants: formData.participants,
//       courseDetails: {
//         fromDate: formData.courseFromDate,
//         toDate: formData.courseToDate,
//         certificateNumber: formData.certificateNumber,
//         certificateDate: formData.certificateDate,
//         courseLeader: formData.courseLeader,
//         coursePlace: formData.coursePlace,
//         honourableChargeNo: formData.honourableChargeNo,
//         issuedDate: formData.issuedDate,
//       },
//       courses: courses.map(course => ({
//         selectType: course.selectType,
//         courseDate: course.formData.courseDate,
//         courseToDate: course.formData.courseToDate,
//         place: course.formData.place,
//         leader: course.selectType !== "conducted" ? course.formData.leader : undefined,
//         participants: course.formData.participants,
//       })),
//     };

//     const userId = ls.get("_id");
//     if (!userId) {
//       toast.error("User  ID not found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${BASE_URL}/api/v2/altinfo/${userId}`, data);
//       toast.success("LT Form submitted successfully! Now Click Next To Proceed");
//       setLoading(false);
//       // fetchData();
//     } catch (error) {
//       toast.error("An error occurred while submitting the form. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div>
//         <h2 className="text-2xl font-bold text-center text-red-500 mb-2 uppercase">ALT Form</h2>
//         <ToastContainer />
//         <div className="border p-4 rounded">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//             <div className="mb-2">
//               <label className="block mb-2 font-bold text-black">Honourable Charge No</label>
//               <input
//                 type="text"
//                 name="honourableChargeNo"
//                 value={formData.honourableChargeNo}
//                 onChange={handleInputChange1}
//                 className={`border ${errors.honourableChargeNo ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//               />
//               {errors.honourableChargeNo && <p className="text-red-500">{errors.honourableChargeNo}</p>}
//             </div>
//             <div className="mb-2">
//               <label className="block mb-2 font-bold text-black">Issued Date</label>
//               <input
//                 type="date"
//                 name="issuedDate"
//                 value={formData.issuedDate}
//                 onChange={handleInputChange1}
//                 className={`border ${errors.issuedDate ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//               />
//               {errors.issuedDate && <p className="text-red-500">{errors.issuedDate}</p>}
//             </div>
//           </div>
//           {/* Additional form fields and courses handling */}

//           <div className="space-y-4 mt-6">
//         <div>Training Courses Assisted/Conducted in Last Year</div>
//             {courses.map((course, index) => (
//               <div key={course.id} className="mb-4 border p-4 rounded">
//                 <div
//                   className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//                   <div className="mb-2">
//                     <label className="block mb-2 font-bold text-black">Select Type</label>
//                     <select
//                       value={course.selectType}
//                       onChange={(e) => handleSelectTypeChange(index, e)}
//                       className={`border ${errors[`course-${index}-selectType`] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                     >
//                       <option value="">-- Select Type --</option>
//                       <option value="conducted">Conducted</option>
//                       <option value="assisted">Assisted</option>
//                     </select>
//                     {errors[`course-${index}-selectType`] && <p className="text-red-500">{errors[`course-${index}-selectType`]}</p>}
//                   </div>
//                   <div className="mb-2">
//                     <label className="block mb-2 font-bold text-black">Course From Date</label>
//                     <input
//                       type="date"
//                       name="courseDate"
//                       value={course.formData.courseDate || ""}
//                       onChange={(e) => handleInputChange(index, e)}
//                       className={`border ${errors[`course-${index}-courseDate`] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                     />
//                     {errors[`course-${index}-courseDate`] && <p className="text-red-500">{errors[`course-${index}-courseDate`]}</p>}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//                   <div className="mb-2">
//                     <label className="block mb-2 font-bold text-black">Course To Date</label>
//                     <input
//                       type="date"
//                       name="courseToDate"
//                       value={course.formData.courseToDate || ""}
//                       onChange={(e) => handleInputChange(index, e)}
//                       className={`border ${errors[`course-${index}-courseToDate`] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                     />
//                     {errors[`course-${index}-courseToDate`] && <p className="text-red-500">{errors[`course-${index}-courseToDate`]}</p>}
//                   </div>
//                   <div className="mb-2">
//                     <label className="block mb-2 font-bold text-black">Place</label>
//                     <input
//                       type="text"
//                       name="place"
//                       value={course.formData.place || ""}
//                       onChange={(e) => handleInputChange(index, e)}
//                       className={`border ${errors[`course-${index}-place`] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                     />
//                     {errors[`course-${index}-place`] && <p className="text-red-500">{errors[`course-${index}-place`]}</p>}
//                   </div>
//                   {course.selectType !== "conducted" && (
//                     <div className="mb-2">
//                       <label className="block mb-2 font-bold text-black">Leader of the Course</label>
//                       <input
//                         type="text"
//                         name="leader"
//                         value={course.formData.leader || ""}
//                         onChange={(e) => handleInputChange(index, e)}
//                         className={`border ${errors[`course-${index}-leader`] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                       />
//                       {errors[`course-${index}-leader`] && <p className="text-red-500">{errors[`course-${index}-leader`]}</p>}
//                     </div>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//                   <div className="mb-2">
//                     <label className="block mb-2 font-bold text-black">No. of Participants</label>
//                     <input
//                       type="number"
//                       name="participants"
//                       value={course.formData.participants || ""}
//                       onChange={(e) => handleInputChange(index, e)}
//                       className={`border ${errors[`course-${index}-participants`] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                     />
//                     {errors[`course-${index}-participants`] && <p className="text-red-500">{errors[`course-${index}-participants`]}</ p>}
//                   </div>
//                 </div>
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => removeCourse(index)}
//                     className="bg-red-500 text-white rounded px-4 py-2"
//                   >
//                     Close
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addCourse}
//               className="bg-[#1D56A5] text-white rounded px-4 py-2"
//             >
//               Add Course
//             </button>
//           </div>
//           <div className="space-y-4 mt-6">
//             <div className="font-bold text-black">Details of Last ROT Attended</div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//               <div>
//                 <label className="block mb-2 font-bold text-black">Course From Date</label>
//                 <input
//                   type="date"
//                   name="courseFromDate"
//                   value={formData.courseFromDate}
//                   onChange={handleInputChange1}
//                   className={`border ${errors.courseFromDate ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                 />
//                 {errors.courseFromDate && <p className="text-red-500">{errors.courseFromDate}</p>}
//               </div>
//               <div>
//                 <label className="block mb-2 font-bold text-black">Course To Date</label>
//                 <input
//                   type="date"
//                   name="courseToDate"
//                   value={formData.courseToDate}
//                   onChange={handleInputChange1}
//                   className={`border ${errors.courseToDate ? 'border-red-500' : 'border-gray-300'} rounded px- 3 py-2 w-full`}
//                 />
//                 {errors.courseToDate && <p className="text-red-500">{errors.courseToDate}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//               <div className="mb-2">
//                 <label className="block mb-2 font-bold text-black">Certificate Number</label>
//                 <input
//                   type="text"
//                   name="certificateNumber"
//                   value={formData.certificateNumber}
//                   onChange={handleInputChange1}
//                   className={`border ${errors.certificateNumber ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                 />
//                 {errors.certificateNumber && <p className="text-red-500">{errors.certificateNumber}</p>}
//               </div>
//               <div className="mb-2">
//                 <label className="block mb-2 font-bold text-black">Certificate Date</label>
//                 <input
//                   type="date"
//                   name="certificateDate"
//                   value={formData.certificateDate}
//                   onChange={handleInputChange1}
//                   className={`border ${errors.certificateDate ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                 />
//                 {errors.certificateDate && <p className="text-red-500">{errors.certificateDate}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//               <div className="mb-2">
//                 <label className="block mb-2 font-bold text-black">Leader of the Course</label>
//                 <input
//                   type="text"
//                   name="courseLeader"
//                   value={formData.courseLeader}
//                   onChange={handleInputChange1}
//                   className={`border ${errors.courseLeader ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                 />
//                 {errors.courseLeader && <p className="text-red-500">{errors.courseLeader}</p>}
//               </div>
//               <div className="mb-2">
//                 <label className="block mb-2 font-bold text-black">Place</label>
//                 <input
//                   type="text"
//                   name="coursePlace"
//                   value={formData.coursePlace}
//                   onChange={handleInputChange1}
//                   className={`border ${errors.coursePlace ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
//                 />
//                 {errors.coursePlace && <p className="text-red-500">{errors.coursePlace}</p>}
//               </div>
//             </div>
//             <div
//               className="bg-[#1D56A5] uppercase rounded-md flex justify-center items-center py-1 text-white font-medium my-5 cursor-pointer"
//               onClick={handleSubmit}
//             >
//               {loading ? "SUBMITTING..." : "Submit ALT DETAILS"}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ALTInfo;
