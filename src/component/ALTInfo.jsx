import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });
const ALTInfo = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubWings, setSelectedSubWings] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [formData, setFormData] = useState({
    courseDate: "",
    trainToDate:"",
    place: "",
    leader: "",
    participants: "",
    courseFromDate: "",
    courseToDate: "",
    certificateNumber: "",
    certificateDate: "",
    honourableChargeNo: "",
    issuedDate: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subWingOptions = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger", "Cub", "Scout"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const functionDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
    const userId = ls.get("_id");
    const requiredFields = [
      selectedWing,
      selectedSubWings.length > 0,
      selectType,
      formData.courseDate,
      formData.place,
      formData.participants,
      formData.courseFromDate,
      formData.courseToDate,
      formData.certificateNumber,
      formData.certificateDate,
      formData.honourableChargeNo,
      formData.issuedDate
    ];
  
    if (requiredFields.includes("") || requiredFields.includes(false)) {
      toast.error("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }
  

    const data = {
      selectedWing,
      selectedSubWings,
      selectType,

      
      ...formData,
    };
console.log(data,"data")
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v2/altinfo/${userId}`,
        data
      );
      toast.success("ALT Form submitted successfully!,Now Click Next To Proceed");
      setLoading(false)
      fetchedData();
      console.log(response.data);
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = ls.get("_id");
        // const userId = storedIdString ? JSON.parse(storedIdString) : null;

        if (!userId) {
          toast.error("User ID not found. Please log in again.");
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/api/v2/altinfo/${userId}`
        );
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

    fetchData();
  }, []);


  const getLocal = async () => {
    const honourableChargeNo = ls.get("honourableNumber");
    const course =ls.get("sectionq") // Use secure-ls to get the honourable number
    console.log(honourableChargeNo, "hhhhhhhhhhhhh");
  
    // Update formData with the retrieved honourableChargeNo
    if (honourableChargeNo && course== "ALT") {
      setFormData((prevData) => ({
        ...prevData,
        honourableChargeNo: honourableChargeNo,
      }));
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        honourableChargeNo: "", // Set to empty if no value
      }));
    }
    
  };
  
  useEffect(() => {
    getLocal();
  }, []);
  return (
    <>
      <div>
        <ToastContainer />
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
                  {/* <div>
                    <strong>Wing:</strong> {course.selectedWing}
                  </div>
                  <div>
                    <strong>Section:</strong>{" "}
                    {course.selectedSubWings?.join(", ")}
                  </div> */}

                  <div>
                    <strong>Honourable No:</strong> {course.honourableChargeNo}
                  </div>
                  <div>
                    <strong>Issue Date:</strong> {functionDate(course.issuedDate)}
                  </div>
                  <div>
                    <strong>Training Type:</strong> {course.selectType}
                  </div>
                  <div>
                    <strong>Training Course From Date:</strong>{" "}
                    {functionDate(course.courseDate)}
                  </div>

                  <div>
                    <strong>Training Course To Date:</strong>
                    {functionDate(course.trainToDate)}
                  </div>

                  <div>
                    <strong>From Date:</strong>{" "}
                    {functionDate(course.courseFromDate)}
                  </div>

                  <div>
                    <strong>To Date:</strong>
                    {functionDate(course.courseToDate)}
                  </div>
                  <div>
                    <strong>Venue:</strong> {course.place}
                  </div>
                  <div>
                    <strong>Leader:</strong> {course.leader}
                  </div>
                  <div>
                    <strong>Certificate Number:</strong>{" "}
                    {course.certificateNumber}
                  </div>
                  <div>
                    <strong>Certificate Date:</strong>{" "}
                    {functionDate(course.certificateDate)}
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
            {/* Wing Selection */}
            {/* <div className="mb-2">
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
            </div> */}

            {/* Sub-Wing Selection */}
            {/* <div className="mb-2">
              <label className="block mb-2 font-bold text-black">
                Select Section
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
            </div> */}

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
      disabled={formData.honourableChargeNo !== ""}
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

            {/* Training Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">
                  Select Type
                </label>
                <select
                  name="selectType"
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
                <label className="block mb-2 font-bold text-black">
                  Course To Date
                </label>
                <input
                  type="date"
                  name="trainToDate"
                  value={formData.trainToDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 font-bold text-black">Place</label>
                <input
                  type="text"
                  name="place"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="mb-2">
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

                <div className="mb-2">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="mb-2">
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
                <div className="mb-2">
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
                </div>
              </div>

              <div
                className="bg-[#1D56A5] uppercase rounded-md flex justify-center items-center py-1 text-white font-medium my-5 cursor-pointer"
                onClick={handleSubmit}
              >
                   {loading ? "Submitting..." : "Submit ALT DETAILS"}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ALTInfo;
