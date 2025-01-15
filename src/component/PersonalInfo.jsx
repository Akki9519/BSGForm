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
  const [idnumber, setIdNumber] = useState("");
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
  // const [showInput, setShowInput] = useState(false);

  const [showInput, setShowInput] = useState(""); // Tracks the selected option ("yes" or "no")
  const [inputValue, setInputValue] = useState("");
  // Error state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    dob: "",
    bsgUid: "",
    state: "",
    aadharNumber: "",
    mobileNumber: "",
    whatsappNumber: "",
    currentAddress: "",
    permanentAddress: "",
    revenuePincode: "",
    valid: "",
    maritalStatus: "",
    gender: "",
    warrantDate: "",
    warrantNumber: "",
    occupation: "",
    qualification: "",
    highestqualification: "",
   
  });

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

  const handleFileChange = (file, setFile) => {
    if (file.size > 200 * 1024) {
      // Check if file size exceeds 200 KB
      toast.error("File size must be less than 200 KB.");

      setFile(null); // Reset the file input
    } else {
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors

    // Check for empty fields and set error messages
    const newErrors = {};

    if (!uploadPhoto)
      newErrors.uploadPhoto =
        "Upload Photo is required!,File Size must be less than 200 KB";
    if (!uploadWarrant)
      newErrors.uploadWarrant =
        "Upload File is required!,File Size must be less than 200 KB";
    if (!highestqualification)
      newErrors.highestqualification =
        "Highest Qualification is required!,File Size must be less than 200 KB";
    if (name === "") newErrors.name = "Name is required.";
    if (email === "") newErrors.email = "Email is required.";
    if (dob === "") newErrors.dob = "Date of Birth is required.";
    if (bsgUid === "") newErrors.bsgUid = "BSG UID is required.";
    if (state === "") newErrors.state = "State is required.";
    if (aadharNumber === "")
      newErrors.aadharNumber = "Aadhar Number is required.";
    if (mobileNumber === "")
      newErrors.mobileNumber = "Mobile Number is required.";
    if (whatsappNumber === "")
      newErrors.whatsappNumber = "WhatsApp Number is required.";
    if (currentAddress === "")
      newErrors.currentAddress = "Current Address is required.";
    if (permanentAddress === "")
      newErrors.permanentAddress = "Permanent Address is required.";

    if (revenuePincode === "")
      newErrors.revenuePincode = "Revenue Pincode is required.";
    if (revenueState === "")
      newErrors.revenueState = "Revenue State is required.";
    if (valid === "") newErrors.valid = " date is required.";
    // if (idnumber === "") newErrors.idnumber = "Id number is required.";
    if (maritalStatus === "")
      newErrors.maritalStatus = "Marital Status is required.";
    if (gender === "") newErrors.gender = "Gender is required.";
    if (warrantDate === "") newErrors.warrantDate = "Warrant Date is required.";
    if (warrantNumber === "")
      newErrors.warrantNumber = "Number is required.";
    if (occupation === "") newErrors.occupation = "Occupation is required.";
    if (qualification === "")
      newErrors.qualification = "Qualification is required.";
    if (highestqualification === "")
      newErrors.highestqualification = "Highest Qualification is required.";

    // If there are errors, set the error state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      ls.set("id", responseMessage1);
      // Store the ID securely
      toast.success("Form Submitted Successfully! Now Click Next To Proceed");
      setLoading(false);
      getData();
    } catch (error) {
      console.error("Error:", error);
      toast("An error occurred during registration");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocal();
  }, []);

  const getLocal = () => {
    const storedName = ls.get("name"); // Use secure-ls to get the name
    const storedEmail = ls.get("email"); // Use secure-ls to get the email
    const storedBsgUid = ls.get("bsgnumber"); // Use secure-ls to get the BSG UID
    const storedBsgdob = ls.get("dob");
    console.log(storedBsgdob, "storedBsgdob");
    const storedMobile = ls.get("MOBILE");
    const storedAadhar = ls.get("AADHAR_NO");
    const storedState = ls.get("STATE");
    console.log(storedState, "statae");
    setName(storedName);
    setEmail(storedEmail);
    setBsgUid(storedBsgUid);
    setDob(storedBsgdob);
    setMobileNumber(storedMobile);
    setAadharNumber(storedAadhar);
    setState(storedState);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userId = ls.get("_id");
      const response = await axios.get(
        `${BASE_URL}/api/v1/personaldetails/${userId}`,
        axiosConfig
      );
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
  }, []);

  const getState = async () => {
    try {
      const userId = ls.get("_id"); // Use secure-ls to get the user ID
      const response = await axios.get(`${BASE_URL}/api/v1/getstate/${userId}`);
      setState1(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getRevenueState = async () => {
    try {
      const userId = ls.get("_id"); // Use secure-ls to get the user ID
      const response = await axios.get(
        `${BASE_URL}/api/v1/getrevenuestate/${userId}`
      );
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
                <strong>Qualification:</strong> {fetchedData.qualification}
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
                <strong>Upload Warrant/ID:</strong>
                <a
                  href={fetchedData.uploadWarrant}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Warrant
                </a>
              </div>
              <div>
                <strong>Warrant/ID Valid Till:</strong> {functionDate(fetchedData.valid)}
              </div>
              <div>
                <strong>Warrant/ID Date:</strong>{" "}
                {functionDate(fetchedData.warrantDate)}
              </div>
              <div>
                <strong>Warrant/ID Number:</strong> {fetchedData.warrantNumber}
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">Name<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={name}
                    disabled
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the Full Name"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-black">Email<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={email}
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the Email"
                    className={`outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">BSGUID<span className="text-red-500">*</span> </label>
                  <input
                    type="text"
                    value={bsgUid}
                    disabled
                    onChange={(e) => setBsgUid(e.target.value)}
                    placeholder="Enter the UID"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.bsgUid && (
                    <span className="text-red-500 text-sm">
                      {errors.bsgUid}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 ">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    BSG State<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select BSG State</option>
                    {state1
                      .slice() // Creates a shallow copy to avoid mutating the original array
                      .sort((a, b) => a.state.localeCompare(b.state)) // Sorts the array alphabetically
                      .map((item, index) => (
                        <option key={index} value={item.state}>
                          {item.state}
                        </option>
                      ))}
                  </select>

                  <input
                    type="text"
                    value={state}
                    disabled
                    onChange={(e) => setState(e.target.value)}
                    className="outline-none bg-red-300 rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500 my-3"
                  />
                  {errors.state && (
                    <span className="text-red-500 text-sm">{errors.state}</span>
                  )}
                </div>

                {/* <div className ></div> */}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Aadhar Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    placeholder="Enter the Aadhar Number"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.aadharNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.aadharNumber}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Mobile Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter the Mobile Number"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.mobileNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.mobileNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Whatsapp Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsAppNumber(e.target.value)}
                    placeholder="Enter the Whatsapp Number"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.whatsappNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.whatsappNumber}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Current Address<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    placeholder="Enter the Current Address"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.currentAddress && (
                    <span className="text-red-500 text-sm">
                      {errors.currentAddress}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Permanent Address<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={permanentAddress}
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
                      Same as Current Address<span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.permanentAddress && (
                    <span className="text-red-500 text-sm">
                      {errors.permanentAddress}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">

              <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">DOB<span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.dob && (
                    <span className="text-red-500 text-sm">{errors.dob}</span>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Revenue State<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={revenueState}
                    onChange={(e) => setRevenueState(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Revenue State</option>
                    {revenueState1
                      .slice() // Creates a shallow copy of the array
                      .sort((a, b) =>
                        a.revenuestate.localeCompare(b.revenuestate)
                      ) // Sorts alphabetically
                      .map((item, index) => (
                        <option key={index} value={item.revenuestate}>
                          {item.revenuestate}
                        </option>
                      ))}
                  </select>
                  {errors.revenueState && (
                    <span className="text-red-500 text-sm">
                      {errors.revenueState}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Revenue Pincode<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={revenuePincode}
                    onChange={(e) => setRevenuePincode(e.target.value)}
                    placeholder="Enter the Pincode"
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  />
                  {errors.revenuePincode && (
                    <span className="text-red-500 text-sm">
                      {errors.revenuePincode}
                    </span>
                  )}
                </div>

             
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Marital Status<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.maritalStatus && (
                    <span className="text-red-500 text-sm">
                      {errors.maritalStatus}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">Gender<span className="text-red-500">*</span></label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className="text-red-500 text-sm">
                      {errors.gender}
                    </span>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Occupation<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                  >
                    <option value="">Select Occupation</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.occupation && (
                    <span className="text-red-500 text-sm">
                      {errors.occupation}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10">

              <div className="flex flex-col">
                  <label className="mb-1 font-medium text-black">
                    Uploaded Photo<span className="text-red-500">*</span>
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
                    name="avatar"
                    accept="image/*" // Restricts file types to images only
                    className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const validImageTypes = [
                          "image/jpeg",
                          "image/png",
                          "image/gif",
                        ]; // Add allowed MIME types
                        if (!validImageTypes.includes(file.type)) {
                          toast.error(
                            "Only image files are allowed (JPEG, PNG, GIF)."
                          );
                          e.target.value = ""; // Reset the file input
                        } else {
                          handleFileChange(file, setUploadPhoto);
                        }
                      }
                    }}
                  />

                  {errors.uploadPhoto && (
                    <span className="text-red-500 text-sm">
                      {errors.uploadPhoto}
                    </span>
                  )}
                </div>
                

                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Qualification<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={qualification}
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
                  {errors.qualification && (
                    <span className="text-red-500 text-sm">
                      {errors.qualification}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-black">
                    Highest Education Qualification<span className="text-red-500">*</span>
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
                    name="highestQualification"
                    accept="application/pdf" // Restrict file types to PDF only
                    className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const validPdfTypes = ["application/pdf"]; // Allowed MIME type for PDF
                        if (!validPdfTypes.includes(file.type)) {
                          toast.error("Only PDF files are allowed.");
                          e.target.value = ""; // Reset the file input
                        } else {
                          handleFileChange(file, setHighestQualification); // Handle valid file upload
                        }
                      }
                    }}
                  />

                  {errors.highestqualification && (
                    <span className="text-red-500 text-sm">
                      {errors.highestqualification}
                    </span>
                  )}
                </div>
              </div>

              <div className="">
                <div className="flex flex-col mb-4">
                  <label className="mb-1 font-medium text-black">
                    Are you a District/State/National professional?<span className="text-red-500">*</span>
                  </label>
                  <label className="mr-2">
                    <input
                      type="radio"
                      name="warrantOption"
                      value="yes"
                      onChange={() => setShowInput("yes")}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="warrantOption"
                      value="no"
                      onChange={() => setShowInput("no")}
                      className="mr-1"
                    />
                    No
                  </label>

                  {/* Conditional rendering based on showInput */}
                  {showInput === "yes" && (
                    <>
                      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col mb-4">
                          <div className="font-semibold">
                            Enter the ID Number<span className="text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            value={warrantNumber}
                            onChange={(e) => setWarrantNumber(e.target.value)}
                            placeholder="Enter the ID Number"
                            className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500 mt-2"
                          />
                                                    {errors.warrantNumber && (
                            <span className="text-red-500 text-sm">
                              {errors.warrantNumber}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col mb-4">
                          <label className="mb-1 font-medium text-black">
                            Enter ID Date<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={warrantDate}
                            onChange={(e) => {
                              const selectedDate = new Date(e.target.value);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);

                              if (selectedDate >= today) {
                                toast.error(
                                  "The selected date must be less than today's date."
                                );
                                e.target.value = ""; // Reset the input value
                              } else {
                                setWarrantDate(e.target.value);
                              }
                            }}
                            className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                          />
                                                    {errors.valid && (
                            <span className="text-red-500 text-sm">
                              {errors.valid}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col mb-4">
                          <label className="mb-1 font-medium text-black">
                            ID Valid Till<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={valid}
                            className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => {
                              const selectedDate = new Date(e.target.value);
                              const warrantDateObj = new Date(warrantDate);

                              if (selectedDate <= warrantDateObj) {
                                toast.error(
                                  "The 'Id Valid Till' date must be less than the 'id Date'."
                                );
                                e.target.value = ""; // Reset the input
                              } else {
                                setValidTill(e.target.value); // Update the valid date state
                              }
                            }}
                          />
                          {errors.valid && (
                            <span className="text-red-500 text-sm">
                              {errors.valid}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col mb-4 -mt-10">
                          <label className="mb-1 font-medium text-black">
                            Upload ID<span className="text-red-500">*</span>
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
                            accept="application/pdf" // Restricts file types to PDFs only
                            className="outline-none mb-3 mt-1 py-2 px-2 block border-gray-300 w-32 rounded-md shadow-sm"
                            style={{ width: "300px" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.type !== "application/pdf") {
                                  toast.error("Only PDF files are allowed.");
                                  e.target.value = ""; // Reset the file input
                                } else {
                                  handleFileChange(
                                    file,
                                    setWarrantUpload,
                                    "warrant"
                                  ); // Handle valid PDF file upload
                                }
                              }
                            }}
                          />
                          {errors.uploadWarrant && (
                            <span className="text-red-500 text-sm">
                              {errors.uploadWarrant}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {showInput === "no" && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-3  gap-0 lg:gap-10">
                        <div className="flex flex-col mb-4">
                          <div className="font-semibold">
                            Enter the Warrant Number<span className="text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            value={warrantNumber}
                            onChange={(e) => setWarrantNumber(e.target.value)}
                            placeholder="Enter the ID Number"
                            className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500 mt-2"
                          />
                                                    {errors.warrantNumber && (
                            <span className="text-red-500 text-sm">
                              {errors.warrantNumber}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col mb-4">
                          <label className="mb-1 font-medium text-black">
                            Enter Warrant Date<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={warrantDate}
                            onChange={(e) => {
                              const selectedDate = new Date(e.target.value);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);

                              if (selectedDate >= today) {
                                toast.error(
                                  "The selected date must be less than today's date."
                                );
                                e.target.value = ""; // Reset the input value
                              } else {
                                setWarrantDate(e.target.value);
                              }
                            }}
                            className="outline-none bg-white rounded-md px-3 py-1 border border-gray-300 focus:border-indigo-500"
                          />
                                                    {errors.warrantDate && (
                            <span className="text-red-500 text-sm">
                              {errors.warrantDate}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col mb-4">
                          <label className="mb-1 font-medium text-black">
                            Warrant Valid Till<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={valid}
                            className="outline-none mb-3 mt-1 py-2 bg-slate-200 px-2 block w-full border-gray-300 rounded-md shadow-sm"
                            onChange={(e) => {
                              const selectedDate = new Date(e.target.value);
                              const warrantDateObj = new Date(warrantDate);

                              if (selectedDate <= warrantDateObj) {
                                toast.error(
                                  "The 'Warrant Valid Till' date must be less than the 'Warrant Date'."
                                );
                                e.target.value = ""; // Reset the input
                              } else {
                                setValidTill(e.target.value); // Update the valid date state
                              }
                            }}
                          />
                          {errors.valid && (
                            <span className="text-red-500 text-sm">
                              {errors.valid}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col -mt-10">
                          <label className="mb-1 font-medium text-black">
                            Upload Warrant<span className="text-red-500">*</span>
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
                            accept="application/pdf" // Restricts file types to PDFs only
                            className="outline-none mb-3 mt-1 py-2 px-2 block border-gray-300 w-32 rounded-md shadow-sm"
                            style={{ width: "300px" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.type !== "application/pdf") {
                                  toast.error("Only PDF files are allowed.");
                                  e.target.value = ""; // Reset the file input
                                } else {
                                  handleFileChange(
                                    file,
                                    setWarrantUpload,
                                    "warrant"
                                  ); // Handle valid PDF file upload
                                }
                              }
                            }}
                          />
                          {errors.uploadWarrant && (
                            <span className="text-red-500 text-sm">
                              {errors.uploadWarrant}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div
                className="bg-[#1D56A5] rounded-md flex justify-center items-center py-1 text-white font-medium my-5 cursor-pointer"
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
