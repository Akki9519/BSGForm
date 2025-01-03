import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../constant/constant";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });

const PersonalInformation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState("");
  const [bsgUid, setBsgUid] = useState("");
  const [state, setState] = useState("");
  const [state1, setState1] = useState([]);
  const [valid, setValidTill] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsAppNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [revenueState, setRevenueState] = useState("");
  const [revenueState1, setRevenueState1] = useState([]);
  const [revenueDistrict, setRevenueDistrict] = useState("");
  const [revenueDistrict1, setRevenueDistrict1] = useState([]);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [revenuePincode, setRevenuePincode] = useState("");
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [uploadPhoto1, setUploadPhoto1] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [group, setGroup] = useState("");
  const [groupregisterform, setGroupRegisterForm] = useState(null);
  const [groupregisterform1, setGroupRegisterForm1] = useState(null);
  const [warrantNumber, setWarrantNumber] = useState("");
  const [warrantDate, setWarrantDate] = useState("");
  const [uploadWarrant, setWarrantUpload] = useState(null);
  const [uploadWarrant1, setWarrantUpload1] = useState(null);
  const [occupation, setOccupation] = useState("");
  const [qualification, setQualification] = useState("");
  const [highestqualification, setHighestQualification] = useState(null);
  const [highestqualification1, setHighestQualification1] = useState(null);
  const [fromDate1, setFromDate1] = useState("");
  const [toDate1, setToDate1] = useState("");
  const [place, setPlace] = useState("");
  const [courseDisable, setCourseDisable] = useState([]);
  const [states, setStates] = useState([]);
  const [status, setStatus] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fetchedData, setFetchedData] = useState("");

  const token = ls.get("kyttoken"); // Use secure-ls to get the token
  console.log(token, "token");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const functionDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const handleSameAddressChange = (e) => {
    setIsSameAddress(e.target.checked);
    if (e.target.checked) {
      setPermanentAddress(currentAddress); // Set permanent address to current address
    } else {
      setPermanentAddress(""); // Clear permanent address if unchecked
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      name === "" ||
      email === "" ||
      dob === "" ||
      bsgUid === "" ||
      state === "" ||
      aadharNumber === "" ||
      mobileNumber === "" ||
      whatsappNumber === "" ||
      currentAddress === "" ||
      permanentAddress === "" ||
      revenuePincode === "" ||
      valid === "" ||
      maritalStatus === "" ||
      gender === "" ||
      warrantDate === "" ||
      warrantNumber === "" ||
      uploadPhoto === "" ||
      occupation === "" ||
      qualification === "" ||
      highestqualification === "" ||
      place === "" ||
      fromDate1 === "" ||
      toDate1 === ""
    ) {
      toast.error("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("bsgUid", bsgUid);
    formData.append("state", state);
    formData.append("aadharNumber", aadharNumber);
    formData.append("mobileNumber", mobileNumber);
    formData.append("whatsappNumber", whatsappNumber);
    formData.append("currentAddress", currentAddress);
    formData.append("permanentAddress", permanentAddress);
    formData.append("revenueState", revenueState);
    formData.append("revenueDistrict", revenueDistrict);
    formData.append("revenuePincode", revenuePincode);
    formData.append("valid", valid);
    formData.append("maritalStatus", maritalStatus);
    formData.append("gender", gender);
    formData.append("group", group);
    formData.append("groupregisterform", groupregisterform);
    formData.append("warrantDate", warrantDate);
    formData.append("warrantNumber", warrantNumber);
    if (uploadPhoto) {
      formData.append("uploadPhoto", uploadPhoto);
    }
    if (uploadWarrant) {
      formData.append("uploadWarrant", uploadWarrant);
    }
    formData.append("occupation", occupation);
    formData.append("qualification", qualification);
    formData.append("highestqualification", highestqualification);
    formData.append("fromDate1", fromDate1);
    formData.append("toDate1", toDate1);
    formData.append("place", place);

    try {
      const userId = ls.get("_id"); // Use secure-ls to get the user ID
      // const userId = JSON.parse(storedIdString);



      const response = await axios.post(
        `${BASE_URL}/api/v1/personaldetails/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const responseMessage1 = response.data._id;
      ls.set("id", responseMessage1); // Store the ID securely
   
      toast.success("Form Submitted Successfully");
      setLoading(false);
      // getData();
    } catch (error) {
      console.error("Error:", error);
      toast("An error occurred during registration");
    }
  };

  useEffect(() => {
    getLocal();
  }, []);

  const getLocal = () => {
    const storedName = ls.get("name"); // Use secure-ls to get the name
    const storedEmail = ls.get("email"); // Use secure-ls to get the email
    const storedBsgUid = ls.get("bsgnumber"); // Use secure-ls to get the BSG UID

    setName(storedName);
    setEmail(storedEmail);
    setBsgUid(storedBsgUid);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userId = ls.get("_id");
      // console.log(storedIdString,"stored")// Use secure-ls to get the user ID
      // const userId = JSON.parse(storedIdString);
      console.log(userId, "storedId");

      const response = await axios.get(
        `${BASE_URL}/api/v1/personaldetails/${userId}`,
        axiosConfig
      )
      console.log(response.data, "personaldata");
      const personalDetails = response.data;
      if (personalDetails && personalDetails.status === true) {
        setIsSubmitted(true);
      }
      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
  };

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  useEffect(() => {
    getState();
    getRevenueState();
    // getRevenueDistrict();
  }, []);

  const getState = async () => {
    try {
      const userId = ls.get("_id"); // Use secure-ls to get the user ID
      // const userId = JSON.parse(storedIdString);

      // console.log(userId, "storedIdState");
      const response = await axios.get(`${BASE_URL}/api/v1/getstate/${userId}`);
      console.log(response, "responseState");
      console.log(response.data);
      setState1(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getRevenueState = async () => {
    try {
      const userId = ls.get("_id"); // Use secure-ls to get the user ID
      // const userId = JSON.parse(storedIdString);
      console.log(userId, "storedId");
      const response = await axios.get(
        `${BASE_URL}/api/v1/getrevenuestate/${userId}`
      );
      console.log(response, "response");
      console.log(response.data);
      setRevenueState1(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isSubmitted ? (
        <div className="mt-8 space-y-6">
          <div className="p-4 border border-gray-300 rounded mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
              <div>
                <strong>Name:</strong> {fetchedData.name}
              </div>
              <div>
                <strong>Aadhar Number:</strong> {fetchedData.aadharNumber}
              </div>
              <div>
                <strong>BSG UID:</strong> {fetchedData.bsgUid}
              </div>
              <div>
                <strong>Current Address:</strong> {fetchedData.currentAddress}
              </div>
              <div>
                <strong>Date of Birth:</strong> {functionDate(fetchedData.dob)}
              </div>
              <div>
                <strong>Email:</strong> {fetchedData.email}
              </div>
              <div>
                <strong>From Date:</strong>{" "}
                {functionDate(fetchedData.fromDate1)}
              </div>
              <div>
                <strong>Gender:</strong> {fetchedData.gender}
              </div>
              <div>
                <strong>Highest Qualification:</strong>
                <a
                  href={fetchedData.highestqualification}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate
                </a>
              </div>
              <div>
                <strong>Marital Status:</strong> {fetchedData.maritalStatus}
              </div>
              <div>
                <strong>Mobile Number:</strong> {fetchedData.mobileNumber}
              </div>
              <div>
                <strong>Occupation:</strong> {fetchedData.occupation}
              </div>
              <div>
                <strong>Permanent Address:</strong>{" "}
                {fetchedData.permanentAddress}
              </div>
              <div>
                <strong>Place:</strong> {fetchedData.place}
              </div>
              <div>
                <strong>Qualification:</strong> {fetchedData.qualification}
              </div>
              <div>
                <strong>Revenue District:</strong> {fetchedData.revenueDistrict}
              </div>
              <div>
                <strong>Revenue Pincode:</strong> {fetchedData.revenuePincode}
              </div>
              <div>
                <strong>Revenue State:</strong> {fetchedData.revenueState}
              </div>
              <div>
                <strong>State:</strong> {fetchedData.state}
              </div>
              <div>
                <strong>To Date:</strong> {functionDate(fetchedData.toDate1)}
              </div>
              <div>
                <strong>Upload Photo:</strong>
                <a
                  href={fetchedData.uploadPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Photo
                </a>
              </div>
              <div>
                <strong>Upload Warrant:</strong>
                <a
                  href={fetchedData.uploadWarrant}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Warrant
                </a>
              </div>
              <div>
                <strong>Valid Till:</strong> {functionDate(fetchedData.valid)}
              </div>
              <div>
                <strong>Warrant Date:</strong>{" "}
                {functionDate(fetchedData.warrantDate)}
              </div>
              <div>
                <strong>Warrant Number:</strong> {fetchedData.warrantNumber}
              </div>
              <div>
                <strong>WhatsApp Number:</strong> {fetchedData.whatsappNumber}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mb-8">
          <div className="pt-5 w-full rounded-lg shadow-md">
            <div className="px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">Name</label>
                  <input
                    type="text"
                    value={name}
                    disabled={courseDisable.length}
                    placeholder="Enter the Full Name"
                    onChange={(e) => setName(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-black">Email</label>
                  <input
                    type="text"
                    value={email}
                    disabled={courseDisable.length}
                    placeholder="Enter the Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`outline-none bg-white rounded-md px-3 py-1 border ${
                      isValidEmail(email) ? "border-gray-300" : "border-red-500"
                    } focus:border-indigo-500`}
                  />
                  {!isValidEmail(email) && (
                    <p className="text-red-500 text-sm mt-1">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">BSGUID </label>
                  <input
                    type="text"
                    value={bsgUid}
                    disabled={courseDisable.length}
                    placeholder="Enter the UID"
                    onChange={(e) => setBsgUid(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">DOB</label>
                  <input
                    type="date"
                    value={dob}
                    disabled={courseDisable.length}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Enter the Name"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 ">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    BSG State
                  </label>
                  <select
                    value={state}
                    disabled={courseDisable.length > 0}
                    onChange={(e) => setState(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select BSG State</option>
                    {state1.map((item, index) => (
                      <option key={index} value={item.state}>
                        {item.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    value={aadharNumber}
                    disabled={courseDisable.length}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    placeholder="Enter the Aadhar Number"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    disabled={courseDisable.length}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter the Mobile Number"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Whatsapp Number
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    disabled={courseDisable.length}
                    onChange={(e) => setWhatsAppNumber(e.target.value)}
                    placeholder="Enter the Whatsapp Number"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>

                {/* <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Current Address
                  </label>
                  <textarea
                    type="text"
                    value={currentAddress}
                    disabled={courseDisable.length}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    placeholder="Enter the Current Address"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Permanent Address
                  </label>
                  <textarea
                    type="text"
                    value={permanentAddress}
                    disabled={courseDisable.length}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    placeholder="Enter the Permanent Address"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div> */}
{/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10"> */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium text-black">
          Current Address
        </label>
        <textarea
          type="text"
          value={currentAddress}
          disabled={courseDisable.length}
          onChange={(e) => setCurrentAddress(e.target.value)}
          placeholder="Enter the Current Address"
className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium text-black">
          Permanent Address
        </label>
        <textarea
          type="text"
          value={permanentAddress}
          disabled={courseDisable.length}
          onChange={(e) => setPermanentAddress(e.target.value)}
          placeholder="Enter the Permanent Address"
className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
        />

        
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isSameAddress}
          onChange={handleSameAddressChange}
          className="mr-2"
        />
        <label className="font-medium text-black">
          Same as Current Address
        </label>
      </div>
      </div>

  

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Revenue State
                  </label>
                  <select
                    value={revenueState}
                    disabled={courseDisable.length > 0}
                    onChange={(e) => setRevenueState(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Revenue State</option>
                    {revenueState1.map((item, index) => (
                      <option key={index} value={item.revenuestate}>
                        {item.revenuestate}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Revenue Pincode
                  </label>
                  <input
                    type="text"
                    value={revenuePincode}
                    disabled={courseDisable.length}
                    onChange={(e) => setRevenuePincode(e.target.value)}
                    placeholder="Enter the Pincode"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>


                
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-black">
                    Uploaded Photo
                  </label>
                  {uploadPhoto1 && (
                    <img
                      src={uploadPhoto1}
                      alt="photo"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                  <input
                    type="file"
                    disabled={courseDisable.length}
                    name="avatar"
                    className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => setUploadPhoto(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Marital Status
                  </label>
                  <select
                    value={maritalStatus}
                    disabled={courseDisable.length}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">Gender</label>
                  <select
                    value={gender}
                    disabled={courseDisable.length}
                    onChange={(e) => setGender(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Occupation
                  </label>
                  <select
                    value={occupation}
                    disabled={courseDisable.length}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Occupation</option>
                    <option value="Salaries">Salaries</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Warrant Number
                  </label>
                  <input
                    type="text"
                    value={warrantNumber}
                    disabled={courseDisable.length}
                    onChange={(e) => setWarrantNumber(e.target.value)}
                    placeholder="Enter the Warrant Number"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Warrant Date
                  </label>
                  <input
                    type="date"
                    value={warrantDate}
                    disabled={courseDisable.length}
                    onChange={(e) => setWarrantDate(e.target.value)}
                    placeholder="Enter the Date"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Upload Warrant
                  </label>
                  {uploadWarrant1 && (
                    <iframe
                      src={uploadWarrant1}
                      width="100%"
                      height="150px"
                      title="PDF Viewer"
                    ></iframe>
                  )}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*,application/pdf"
                    disabled={courseDisable.length}
                    className="outline-none mb-3 mt-1 py-2  px-2 block border-gray-300 w-32 rounded-md shadow-sm"
                    style={{ width: "300px" }}
                    onChange={(e) => setWarrantUpload(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Warrant Valid till
                  </label>
                  <input
                    type="date"
                    disabled={courseDisable.length}
                    value={valid}
                    className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => setValidTill(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">Place</label>
                  <input
                    value={place}
                    disabled={courseDisable.length}
                    onChange={(e) => setPlace(e.target.value)}
                    type="text"
                    placeholder="Enter the Place"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black">
                    From Date
                  </label>
                  <input
                    type="date"
                    disabled={courseDisable.length}
                    value={fromDate1}
                    onChange={(e) => setFromDate1(e.target.value)}
                    className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div>
                  <label className="block text-sm font-bold text-black">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate1}
                    disabled={courseDisable.length}
                    onChange={(e) => setToDate1(e.target.value)}
                    className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Qualification
                  </label>
                  <select
                    value={qualification}
                    disabled={courseDisable.length}
                    onChange={(e) => setQualification(e.target.value)}
                    className="outline-none bg-white rounded-md mb-3 px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Qualification</option>
                    <option value="Primary Education">Primary Education</option>
                    <option value="Secondary Education">
                      Secondary Education
                    </option>
                    <option value="High school">High school</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Phd /Higher Education">
                      Phd /Higher Education
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black">
                    Upload Highest Qualification
                  </label>
                  {highestqualification1 && (
                    <iframe
                      src={highestqualification1}
                      width="100%"
                      height="150px"
                      title="PDF Viewer"
                    ></iframe>
                  )}
                  <input
                    type="file"
                    disabled={courseDisable.length}
                    onChange={(e) => setHighestQualification(e.target.files[0])}
                    className="outline-none mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div
                className="bg-[#1D56A5] rounded-md flex justify-center items-center  py-1 text-white font-medium my-5 cursor-pointer"
                onClick={handleSubmit}
              >
                  {loading ? "Submitting..." : "Submit"}
                <ToastContainer />
           
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalInformation;
