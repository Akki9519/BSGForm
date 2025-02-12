import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import sampleVideo from "../assets/BSG-KytForm - 23 January 2025 (1).mp4";
import { Link } from "react-router-dom";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });

const convertDateFormat = (dateString) => {
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  }
  return dateString; // Return original if format is incorrect
};
// console.log(convertDateFormat,"convertDateFormat")

const Login = () => {
  const [email, setEmail] = useState("");
  const [savedName, setSavedName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [honourableNumber, setHonourableNumber] = useState("");
  const [bsgnumber, setBsgNumber] = useState("");
  const [parchmentNumber, setParchmentNumber] = useState("");
  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [emailUpdating, setEmailUpdating] = useState(false);
  const [bsgUpdating, setBsgUpdating] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [uidInput, setUidInput] = useState("");
  const [dob, setDob] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.email !== "NA") {
      setEmailVerified(userData.emailVerified || false);
    }
  }, [userData]);

  const handleVerifyEmail = async (email, honourableNumber) => {
    console.log("Honourable Number:", honourableNumber);
    setVerifyingEmail(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/v2/verify-email`, {
        email,
        honourableNumber,
      });

      console.log("Response Data:", response.data);
      console.log("Response Status  1:", response.data.mesage);
      console.log("Response Status w:", response.data.success);

      if (
        response.data.message ===
        "Verification email sent! Please check your inbox."
      ) {
        setMessage("Verification email sent! Please check your inbox.");
      } else if (response.data?.success === true) {
        setEmailVerified(true);
      }
    } catch (error) {
      console.error("Error during email verification:", error);

      if (error.response?.data?.message === "Email is already verified.") {
        setMessage("Email is already verified.");
      } else {
        setMessage("Error during email verification. Please try again.");
      }
    } finally {
      setVerifyingEmail(false);
    }
  };



  const handleUpdateEmail = async (userId) => {
    if (!userEmail) {
      setErrors((prev) => ({
        ...prev,
        userEmail: "Please enter a valid email to update.",
      }));
      return;
    }
    setEmailUpdating(true);
    try {
      const response = await axios.put(`${BASE_URL}/api/v2/ltuser/${userId}`, {
        email: userEmail,
        userId: userId,
      });
      setMessage("Email updated successfully.");
      setUserData((prevData) => ({ ...prevData, email: userEmail }));
    } catch (error) {
      setMessage("Error updating email. Please try again.");
    } finally {
      setEmailUpdating(false);
    }
  };

  const handleUpdateBsgNumber = async (userId) => {
    if (!bsgnumber) {
      setErrors((prev) => ({
        ...prev,
        bsgnumber: "Please enter a valid BSG Number.",
      }));
      return;
    }

    setBsgUpdating(true);
    try {
      const response = await axios.put(`${BASE_URL}/api/v2/ltuser/${userId}`, {
        bsgNumber: bsgnumber,
        userId: userId,
      });
      setMessage("BSG Number updated successfully.");
      setUserData((prevData) => ({ ...prevData, bsgUid: bsgnumber }));
    } catch (error) {
      setMessage("Error updating BSG Number. Please try again.");
    } finally {
      setBsgUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrors({}); // Reset errors
    setMessage(""); // Reset message

    // Validate input based on selected course
    if (selectedCourse === "LT" || selectedCourse === "ALT") {
      if (!honourableNumber) {
        setErrors((prev) => ({
          ...prev,
          honourableNumber: "Please enter the Honourable Number.",
        }));
        setLoading(false);
        return;
      }
    }

    if (selectedCourse === "HWB") {
      if (!parchmentNumber) {
        setErrors((prev) => ({
          ...prev,
          parchmentNumber: "Please enter the Parchment Number.",
        }));
        setLoading(false);
        return;
      }
    }

    // Prepare login data
    const loginData = {
      email,
      bsgNumber: bsgnumber,
      course: selectedCourse,
      ...(selectedCourse !== "HWB" && { honourableNumber }), // Only include if not HWB
      ...(selectedCourse === "HWB" && { parchmentNumber }), // Only include if HWB
    };

    try {
      const loginResponse = await axios.post(
        `${BASE_URL}/api/v2/login`,
        loginData
      );
      console.log(loginResponse, "loginResponse");
      if (loginResponse.data) {
        setSubmitted(true);
        const { user, token, _id } = loginResponse.data;
        const sectionq = user.course;

        // Store tokens and IDs in local storage
        ls.set("sectionq", sectionq);
        ls.set("kyttoken", token);
        ls.set("_id", _id);

        const userDetails =
          loginResponse.data.ltuser ||
          loginResponse.data.altuser ||
          loginResponse.data.hwbuser;
        console.log(userDetails, "userDetails");
        if (userDetails) {
          const {
            name,
            email,
            bsgUid,
            HONOURABLE_CHARGE_NO,
            PARCHMENT_NO,
            dob,
            MOBILE,
            STATE,
            AADHAR_NO,
          } = userDetails;
          console.log(userDetails.dob, "userDetailsDob");
          setUidInput(userDetails.bsgUid);

          const formattedDob = convertDateFormat(userDetails.dob);
          console.log(formattedDob, "formatted");
          setDob(formattedDob);

          // Store user details in local storage
          ls.set("MOBILE", MOBILE);
          ls.set("name", name);
          ls.set("email", email);
          ls.set("bsgnumber", bsgUid);
          ls.set("honourableNumber", HONOURABLE_CHARGE_NO);
          ls.set("parchmentNumber", PARCHMENT_NO);
          ls.set("dob", dob);
          ls.set("STATE", STATE);
          ls.set("AADHAR_NO", AADHAR_NO);
setSavedName(name)
          setMessage("Login successful!");
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          login: "No data returned from the server.",
        }));
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (
        error.response.data.message ===
        "No related data found for the given details"
      ) {
        setMessage("No related data found for the given details");
      }
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  const handleCombinedSubmit = async (e) => {
    e.preventDefault();
    setLoading1(true);
    setMessage(""); // Reset message
    setErrors({}); // Reset errors

    const formattedDob = convertDateFormat(dob);

    if (!uidInput) {
      setErrors((prev) => ({ ...prev, uidInput: "Please enter your BsgUid." }));
      setLoading1(false);
      return;
    }

    // Validate the formatted DOB
    if (!formattedDob) {
      setErrors("Please enter your date of birth.");
      setLoading1(false);
      return;
    }

    // Additional validation to check if DOB is a valid date
    const dobDate = new Date(formattedDob);
    const today = new Date();
    if (dobDate > today) {
      setMessage("Date of birth cannot be in the future.");
      setLoading1(false);
      return;
    }

    const uidData = {
      UID: uidInput,
      formattedDob: formattedDob,
    };
    console.log(uidData, "uidData");
    try {
      const uidResponse = await axios.post(
        "https://oymsapi.bsgindia.org/get-uid",
        uidData,
        {
          headers: {
            "x-api-key": "aba92403-4435-46ce-bb47-9b04941134b3",
          },
        }
      );

      if (uidResponse.data) {
        if (uidResponse.data.dob === formattedDob) {
          setUserData(uidResponse.data);
          ls.set("oymsuid", uidInput);
          ls.set("oymsdob", formattedDob);
          setMessage("Verification successful. Proceeding...");
        } else {
          setMessage("Incorrect Data");
        }
      } else {
        setMessage((prev) => ({
          ...prev,
          uid: "No data returned from the server.",
        }));
      }
    } catch (error) {
      setMessage((prev) => ({
        ...prev,
        uid: "Error fetching UID data. Please try again.",
      }));
    } finally {
      setLoading1(false);
    }
  };

  return (
    <>
    <div className="max-w-3xl mx-auto p-4 rounded-xl mt-10 text-center">
      <h2 className=" font-bold text-gray-800 mb-2 uppercase text-md">Disclaimer</h2>
      <p className="text-black mb-3">
        Use the following abbreviations when writing your <strong>Honourable Charge Number:
        </strong>:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">R - Rover</span>
        <span className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">Ra - Ranger</span>
        <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">S - Scout</span>
        <span className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">C - Cub</span>
        <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">B - Bulbul</span>
        <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">G - Guide</span>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center mt-5 ">
    <p className="text-lg text-gray-800 font-medium mb-4 text-center">
    📢 Please watch the video before submitting the <span className="font-semibold text-blue-600">KYT form.</span>
  </p>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-[#1D56A5] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
      🎥 Watch Video
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
            
            <button
              onClick={() => setIsOpen(false)}
              className=" bg-red-600 text-white px-1.5 py-.5 rounded-full hover:bg-red-700 transition"
            >
              ✕
            </button> 
            <video src={sampleVideo} controls className="w-full rounded-lg" />
          </div>
        </div>
      )}
    </div>




      <div className="p-4 max-w-md mx-auto border rounded shadow-md mb-32 mt-10">
        <h1 className="text-2xl font-bold mb-4 uppercase text-center text-[#1D56A5]">
          The Bharat Scouts and Guides
        </h1>
        <h2 className="text-xl font-bold mb-4 uppercase text-center text-[#1D56A5]">
          Trainer's Portal-Know Your Trainer's
        </h2>

        <div className="mb-4">
          <label htmlFor="course" className="block mb-2 font-medium">
            You Are:
          </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setMessage("");
              setHonourableNumber("");
              setParchmentNumber("");
              setErrors({}); // Reset errors when course changes
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">You Are</option>
            <option value="LT">LT</option>
            <option value="ALT">ALT</option>
            {/* <option value="HWB">HWB</option> */}
          </select>
        </div>

        {(selectedCourse === "LT" || selectedCourse === "ALT") && (
          <div className="mb-4">
            <label
              htmlFor="honourableNumber"
              className="block mb-2 font-medium"
            >
              Honourable Charge Number:
            </label>
            <input
              type="text"
              id="honourableNumber"
              value={honourableNumber}
              onChange={(e) => setHonourableNumber(e.target.value)}
              placeholder="Enter Honourable Number"
              className={`w-full border rounded px-3 py-2 ${
                errors.honourableNumber ? "border-red-500" : ""
              }`}
            />
            {errors.honourableNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.honourableNumber}
              </p>
            )}
          </div>
        )}

        {selectedCourse === "HWB" && (
          <div className="mb-4">
            <label htmlFor="parchmentNumber" className="block mb-2 font-medium">
              Parchment Number:
            </label>
            <input
              type="text"
              id="parchmentNumber"
              value={parchmentNumber}
              onChange={(e) => setParchmentNumber(e.target.value)}
              placeholder="Enter Parchment Number"
              className={`w-full border rounded px-3 py-2 ${
                errors.parchmentNumber ? "border-red-500" : ""
              }`}
            />
            {errors.parchmentNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.parchmentNumber}
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {savedName && (
  <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg shadow-sm">
    <p className="font-semibold text-lg">✅ Users related with this name:</p>
    <p className="text-xl text-red-500 font-bold">{savedName}</p>
  </div>
)}

        {message && (
          <div
            className={`my-4 p-3 rounded ${
              message.includes("successful")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {submitted ? (
          <>
            <div className="mb-4">
              <label htmlFor="uidInput" className="block mb-2 font-medium">
                Enter BSG UID:
              </label>
              <input
                type="text"
                id="uidInput"
                value={uidInput}
                onChange={(e) => setUidInput(e.target.value)}
                placeholder="Enter BSG UID"
                className={`w-full border rounded px-3 py-2 ${
                  errors.uidInput ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.uidInput && (
                <p className="text-red-500 text-sm mt-1">{errors.uidInput}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="dobInput" className="block mb-2 font-medium">
                Enter DOB (DD-MM-YYYY):
              </label>
              <input
                type="date" // Custom input for DD-MM-YYYY
                id="dobInput"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Enter DOB (DD-MM-YYYY)"
                className={`w-full border rounded px-3 py-2 ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            <button
              onClick={handleCombinedSubmit}
              disabled={loading1}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              {loading1 ? "Verifying..." : "Verify Data"}
            </button>
          </>
        ) : null}

        {userData && (
          <div className="mt-4 p-4 border rounded shadow">
            <h3 className="text-lg font-bold mb-2">User Details:</h3>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>State:</strong> {userData.state_name}
            </p>

            <p>
              <strong>Email:</strong> {userData.email_id}
            </p>

            {userData.email_id === "NA" && (
              <div className="mb-4">
                <label htmlFor="userEmail" className="block mb-2 font-medium">
                  Enter New Email for Verification:
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full border rounded px-3 py-2 ${
                    errors.userEmail ? "border-red-500" : ""
                  }`}
                />
                {errors.userEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userEmail}
                  </p>
                )}
                <button
                  onClick={() => handleUpdateEmail(userData._id)}
                  disabled={emailUpdating}
                  className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mt-4"
                >
                  {emailUpdating ? "Updating..." : "Update Email"}
                </button>
              </div>
            )}

            {userData.email !== "NA" && (
              <div className="mt-4">
                {!emailVerified ? (
                  <button
                    onClick={() =>
                      handleVerifyEmail(userData.email_id, honourableNumber)
                    }
                    disabled={verifyingEmail}
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                  >
                    {verifyingEmail ? "Verifying..." : "Verify Email"}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/form")}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                  >
                    Proceed
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* <div className="my-4 absolute bottom-0 p-3 rounded bg-blue-100 text-blue-800">
      <p>If you have any issues, please <Link to="/feedback" className="text-red-600 hover:text-red-800">click here</Link> to go to the feedback page.</p>
    </div> */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-blue-100 text-blue-800">
        <p className="text-center">
          If you have any issues, please{" "}
          <Link to="/feedback" className="text-red-600 hover:text-red-800">
            click here
          </Link>{" "}
          to go to the feedback page.
        </p>
      </div>
    </>
  );
};

export default Login;
