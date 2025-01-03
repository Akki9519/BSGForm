import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });
console.log(ls, "ls");
const LTInfo = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubWings, setSelectedSubWings] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    courseDate: "",
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
  });
  const [fetchedData, setFetchedData] = useState([]);

  const subWingOptions = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger", "Cub", "Scout"],
  };

  const functionDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleInputChange = (e) => {
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

  const handleSelectTypeChange = (e) => {
    setSelectType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const requiredFields = [
      selectedWing,
      selectedSubWings.length > 0,
      selectType,
      formData.courseDate,
      formData.place,
      selectType !== "conducted" ? formData.leader : true, // Only check leader if not conducted
      formData.participants,
      formData.courseFromDate,
      formData.courseToDate,
      formData.certificateNumber,
      formData.certificateDate,
      formData.courseLeader,
      formData.coursePlace,
      formData.honourableChargeNo,
      formData.issuedDate
    ];
  
    if (requiredFields.includes("") || requiredFields.includes(false)) {
      toast.error("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }
    const data = {
      wing: selectedWing,
      subWing: selectedSubWings,
      trainingType: selectType,
      courseDate: formData.courseDate,
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
    };
console.log(data,"data")
    if (!data.wing || !data.subWing.length) {
      toast.error("Please select a wing and at least one sub-wing.");
      return;
    }

    const userId = ls.get("_id"); // Corrected usage
    console.log(userId, "userId");

    if (!userId) {
      toast.error("User  ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v2/ltinfo/${userId}`,
        data
      );
      toast.success("LT Form submitted successfully!");
      setLoading(false)
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userId = await ls.get("_id");
  //       console.log(userId,"userId")
  //       // const userId = storedIdString ? JSON.parse(storedIdString) : null;

  //       if (!userId) {
  //         toast.error("User ID not found. Please log in again.");
  //         return;
  //       }

  //       const response = await axios.get(`${BASE_URL}/api/v2/ltinfo/${userId}`);
  //       console.log(response.data, "response");

  //       if (response.data.some((item) => item.isSubmitted === true)) {
  //         setIsSubmitted(true);
  //       }

  //       setFetchedData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       toast.error("Failed to fetch data.");
  //     }
  //   };

  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const userId = ls.get("_id"); // Corrected usage
      console.log(userId, "userId");
      if (!userId) {
        toast.error("User  ID not found. Please log in again.");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/v2/ltinfo/${userId}`);
      console.log(response.data, "response");

      if (response.data.some((item) => item.isSubmitted === true)) {
        setIsSubmitted(true);
      }

      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
  };
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-2 uppercase">
          LT Form
        </h2>

        {isSubmitted ? (
          <div className="mt-8 space-y-6">
            {fetchedData.map((course, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded mb-2"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
                  <div>
                    <strong>Wing:</strong> {course.wing}
                  </div>
                  <div>
                    <strong>Section:</strong> {course.subWing?.join(", ")}
                  </div>
                  <div>
                    <strong>Honourable No:</strong> {course.courseDetails?.honourableChargeNo}
                  </div>
                  <div>
                    <strong>Issue Date:</strong> {functionDate(course.courseDetails.issuedDate)}
                  </div>

                  <div>
                    <strong>Training Type:</strong> {course.trainingType}
                  </div>
                  <div>
                    <strong>From Date:</strong>{" "}
                    {functionDate(course.courseDetails?.fromDate)}
                  </div>
                  <div>
                    <strong>To Date:</strong>{" "}
                    {functionDate(course.courseDetails?.toDate)}
                  </div>
                  <div>
                    <strong>Venue:</strong> {course.place}
                  </div>
                  <div>
                    <strong>Leader:</strong> {course.courseDetails?.courseLeader}
                  </div>
                  <div>
                    <strong>Certificate Number:</strong>{" "}
                    {course.courseDetails?.certificateNumber}
                  </div>
                  <div>
                    <strong>Participants:</strong> {course.participants}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border p-4 rounded">
            <ToastContainer />
            <h2 className="font-bold text-black text-lg mb-2">
              Wing and Sub-Wing Selection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div className="mb-2">
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
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">
                  Select Sub-Wing
                </label>
                {selectedWing &&
                  subWingOptions[selectedWing]?.map((subWing) => (
                    <div key={subWing} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={subWing}
                        checked={selectedSubWings.includes(subWing)}
                        onChange={() => handleSubWingChange(subWing)}
                        className="mr-2"
                      />
                      <label htmlFor={subWing} className="text-black">
                        {subWing}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
  <div className="mb-2">
    <label className="block mb-2 font-bold text-black">
      Honourable Charge No
    </label>
    <input
      type="text"
      name="honourableChargeNo"
      value={formData.honourableChargeNo}
      onChange={handleInputChange}
      placeholder="Honourable Charge No"
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
  </div>

  <div className="mb-2">
    <label className="block mb-2 font-bold text-black">
      Issued Date
    </label>
    <input
      type="date"
      name="issuedDate"
      value={formData.issuedDate}
      onChange={handleInputChange}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
  </div>
</div>


            <h2 className="font-bold text-black text-lg mb-2">
              Training Courses Assisted/Conducted in Last Year
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div className="mb-2">
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

              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">
                  Course Date
                </label>
                <input
                  type="date"
                  name="courseDate"
                  value={formData.courseDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">Place</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  placeholder="Place"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              {selectType !== "conducted" && (
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Leader of the Course
                  </label>
                  <input
                    type="text"
                    name="leader"
                    value={formData.leader}
                    onChange={handleInputChange}
                    placeholder="Leader of the Course"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">
                  No. of Participants
                </label>
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  placeholder="No. of Participants"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <div className="font-bold text-black">
                Details of Last ROT Attended
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block mb-2 font-bold text-black">
                    Course From Date
                  </label>
                  <input
                    type="date"
                    name="courseFromDate"
                    value={formData.courseFromDate}
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
                    value={formData.courseToDate}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleInputChange}
                    placeholder="Certificate Number"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>

                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Certificate Date
                  </label>
                  <input
                    type="date"
                    name="certificateDate"
                    value={formData.certificateDate}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Leader of the Course
                  </label>
                  <input
                    type="text"
                    name="courseLeader"
                    value={formData.courseLeader}
                    onChange={handleInputChange}
                    placeholder="Leader of the Course"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 font-bold text-black">
                    Place
                  </label>
                  <input
                    type="text"
                    name="coursePlace"
                    value={formData.coursePlace}
                    onChange={handleInputChange}
                    placeholder="Place"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
            </div>
            <div
              className="bg-[#1D56A5] rounded-md flex justify-center items-center py-1 text-white font-medium my-5 cursor-pointer"
              onClick={handleSubmit}
            >
               {loading ? "Submitting..." : "Submit"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LTInfo;
