import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constant/constant";
import axios from "axios";
const Form = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubWing, setSelectedSubWing] = useState("");
  const [courses,setCourses]=useState([])
  const [formData, setFormData] = useState({
    currentAddress: "",
    permanentAddress: "",
    education: [""],
    sameAddress: false,
  });
  const [selectType, setSelectType] = useState("");

  const handleSelectTypeChange = (e) => {
    setSelectType(e.target.value);
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
  const handleRemoveEducation = (index) => {
    const updatedEducation = formData.education.filter(
      (_, idx) => idx !== index
    );
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleAddEducation = () => {
    setFormData({ ...formData, education: [...formData.education, ""] });
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const subWingOptions = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger", "Cub", "Scout"],
  };
  const subWingOptions1 = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger"],
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); 
  

    const dataToSubmit = {
      ...formData,
      selectedWing,
      selectedCourse,
      selectedSubWing,
      selectType,
      courses: [] 
    };
  
    console.log("Data to Submit:", dataToSubmit);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/formpost`,
        dataToSubmit
      );
      console.log(response.data, "response"); 
      if (response.data) {
        alert("Form submitted successfully");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };
  

  

  
  
  useEffect(() => {

    if (typeof localStorage !== "undefined") {
      const course = localStorage.getItem("sectionq");
      setSelectedCourse(course);
      if (course) {
        console.log(course, "course");
      } else {
        console.log("No course found in localStorage");
      }
    } else {
      console.error("localStorage is not available in this environment");
    }
  }, []);

  return (
    <div className=" p-14">
      <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-md ">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1D56A5] uppercase">
          Know your Trainers
        </h1>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold text-black">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">BSG UID</label>
              <input
                type="text"
                name="bsguid"
                placeholder="Enter your BSG UID"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                BSG State
              </label>
              <select
                name="bsgState"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              >
                <option value="central-railway">CENTRAL RAILWAY</option>
                <option value="chandigarh">CHANDIGARH (U.T.)</option>
                <option value="chhattisgarh">CHHATTISGARH</option>
                <option value="dadar-nagar-haveli">DADAR NAGAR HAVELI</option>
                <option value="eastern-railway">EASTERN RAILWAY</option>
                <option value="east-central-railway">
                  EAST CENTRAL RAILWAY
                </option>
                <option value="east-coast-railway">EAST COAST RAILWAY</option>
                <option value="dav-college-managing-committee">
                  DAV COLLEGE MANAGING COMMITTEE
                </option>
                <option value="national-district-associations">
                  NATIONAL DISTRICT ASSOCIATIONS
                </option>
                <option value="ut-of-daman-and-diu">
                  U.T. OF DAMAN AND DIU
                </option>
                <option value="west-central-railway">
                  WEST CENTRAL RAILWAY
                </option>
                <option value="western-railway">WESTERN RAILWAY</option>
                <option value="west-bengal">WEST BENGAL</option>
                <option value="uttarakhand">UTTARAKHAND</option>
                <option value="tripura">TRIPURA</option>
                <option value="tamil-nadu">TAMIL NADU</option>
                <option value="south-western-railway">
                  SOUTH WESTERN RAILWAY
                </option>
                <option value="south-east-central-railway">
                  SOUTH EAST CENTRAL RAILWAY
                </option>
                <option value="south-eastern-railway">
                  SOUTH EASTERN RAILWAY
                </option>
                <option value="south-central-railway">
                  SOUTH CENTRAL RAILWAY
                </option>
                <option value="southern-railway">SOUTHERN RAILWAY</option>
                <option value="sikkim">SIKKIM</option>
                <option value="rajasthan">RAJASTHAN</option>
                <option value="punjab">PUNJAB</option>
                <option value="puducherry">PUDUCHERRY</option>
                <option value="odisha">ODISHA</option>
                <option value="north-western-railway">
                  NORTH WESTERN RAILWAY
                </option>
                <option value="north-east-frontier-railway">
                  NORTH EAST FRONTIER RAILWAY
                </option>
                <option value="north-eastern-railway">
                  NORTH EASTERN RAILWAY
                </option>
                <option value="north-central-railway">
                  NORTH CENTRAL RAILWAY
                </option>
                <option value="northern-railway">NORTHERN RAILWAY</option>
                <option value="navodaya-vidyalaya-samiti">
                  NAVODAYA VIDYALAYA SAMITI
                </option>
                <option value="nagaland">NAGALAND</option>
                <option value="mizoram">MIZORAM</option>
                <option value="meghalaya">MEGHALAYA</option>
                <option value="manipur">MANIPUR</option>
                <option value="maharashtra">MAHARASHTRA</option>
                <option value="madhya-pradesh">MADHYA PRADESH</option>
                <option value="kendriya-vidyalaya-sangathan">
                  KENDRIYA VIDYALAYA SANGATHAN
                </option>
                <option value="karnataka">KARNATAKA</option>
                <option value="jharkhand">JHARKHAND</option>
                <option value="jammu-kashmir">JAMMU & KASHMIR</option>
                <option value="himachal-pradesh">HIMACHAL PRADESH</option>
                <option value="haryana">HARYANA</option>
                <option value="gujarat">GUJARAT</option>
                <option value="goa">GOA</option>
                <option value="assam">ASSAM</option>
                <option value="kerala">KERALA</option>
                <option value="uttar-pradesh">UTTAR PRADESH</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-bold text-black">
                Revenue State
              </label>
              <input
                type="text"
                name="revenueState"
                placeholder="Enter your Revenue State"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Revenue District
              </label>
              <input
                type="text"
                name="revenueDistrict"
                placeholder="Enter your Revenue District"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter your Pincode"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">Gender</label>
              <select
                name="gender"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Occupation
              </label>
              <select
                name="occupation"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              >
                <option value="">Select Occupation</option>
                <option value="business">Business</option>
                <option value="salaried">Salaried</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Warrant Number
              </label>
              <input
                type="text"
                name="warrantNumber"
                placeholder="Enter Warrant Number"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Warrant Date
              </label>
              <input
                type="date"
                name="warrantDate"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Warrant Till Date
              </label>
              <input
                type="date"
                name="warrantTillDate"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadharNumber"
                placeholder="Enter Aadhar Number"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                placeholder="Enter Contact Number"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsappNumber"
                placeholder="Enter WhatsApp Number"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-bold text-black">
                Current Address
              </label>
              <textarea
                name="currentAddress"
                placeholder="Enter Current Address"
                onChange={handleInputChange}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.sameAddress}
                  onChange={handleCheckboxChange}
                />
                <span className="font-semibold">Same as Current Address</span>
              </label>
              <textarea
                name="permanentAddress"
                placeholder="Permanent Address"
                value={
                  formData.sameAddress
                    ? formData.currentAddress
                    : formData.permanentAddress
                }
                onChange={handleInputChange}
                disabled={formData.sameAddress}
                className="input-field w-full rounded-md px-2 py-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-medium text-[#1D56A5]">
              Education Qualifications
            </h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={edu}
                  onChange={(e) => handleEducationChange(index, e.target.value)}
                  placeholder="Enter Qualification"
                  className="input-field w-full rounded-md px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEducation}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Add Qualification
            </button>
          </div>

          {selectedCourse == "LT" ? (
            <>
              <div className="font-medium text-red-500">LT Form</div>
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

              <div className="font-medium text-red-500">ALT Form</div>
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

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">HWB Course Details</h2>
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

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">
                  Advanced Course Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
               
              </div>

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">Basic Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              
              </div>
            </>
          ) : (
            ""
          )}

          {selectedCourse == "ALT" ? (
            <>
              <div className="font-bold text-red-500">ALT FORM</div>
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

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">HWB Course Details</h2>
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

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">
                  Advanced Course Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">Basic Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {selectedCourse == "HWB" ? (
            <>
              <div className="space-y-4">
                <h2 className="font-bold text-red-500">HWB Course Details</h2>
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

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">
                  Advanced Course Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-bold text-red-500">Basic Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <button
            className="flex justify-center text-center bg-yellow-500 text-white rounded-md px-4 py-2 hover:bg-yellow-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;





