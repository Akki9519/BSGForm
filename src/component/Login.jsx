

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes", isCompression: false });

const Login = () => {
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [honourableNumber, setHonourableNumber] = useState("");
  const [bsgnumber, setBsgNumber] = useState("");
  const [parchmentNumber, setParchmentNumber] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailUpdating, setEmailUpdating] = useState(false);
  const [bsgUpdating, setBsgUpdating] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.email !== "NA") {
      setEmailVerified(userData.emailVerified || false);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (selectedCourse === "LT" || selectedCourse === "ALT") {
      if (!honourableNumber) {
        setMessage("Please enter the Honourable Number.");
        setLoading(false);
        return;
      }
    }

    if (selectedCourse === "HWB") {
      if (!parchmentNumber) {
        setMessage("Please enter the Parchment Number.");
        setLoading(false);
        return;
      }
    }

    const loginData = {
      email,
      bsgNumber: bsgnumber,
      course: selectedCourse,
      honourableNumber: selectedCourse !== "HWB" ? honourableNumber : undefined,
      parchmentNumber: selectedCourse === "HWB" ? parchmentNumber : undefined,
    };
console.log(loginData,"loginDatasdsfgh")
    try {
      const response = await axios.post(`${BASE_URL}/api/v2/login`, loginData);
      console.log(response.data,"loginData")
      if (response.data) {
        const sectionq = response.data.user.course;
        ls.set("sectionq", sectionq);
        const kyttoken = response.data.token;
        const _id = response.data._id;
        ls.set("kyttoken", kyttoken);
        ls.set("_id", _id);

        const userDetails =
          response.data.ltuser ||
          response.data.altuser ||
          response.data.hwbuser;
          console.log(userDetails,"userDetails")
        if (userDetails) {
          const name = userDetails.name;
          const email = userDetails.email;
          const bsgnumber = userDetails.bsgUid;
          const honourableNumber=userDetails.HONOURABLE_CHARGE_NO;


          ls.set("name", name);
          ls.set("email", email);
          ls.set("bsgnumber", bsgnumber);
          ls.set("honourableNumber", honourableNumber);

          setUserData(userDetails);
          setMessage("Login successful! Please verify your email to proceed.");
        } else {
          setMessage("No user data found. Please check your credentials.");
        }
      } else {
        setMessage(
          "Invalid credentials or data mismatch. Please check your details."
        );
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "No related data found for the given details"
      ) {
        setMessage("No related data found for the given details");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (email) => {
    setVerifyingEmail(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/v2/verify-email`, {
        email,
      });
      console.log(response,"response")
      if (
        response.data.message ===
        "Verification email sent! Please check your inbox."
      ) {
        setMessage("Verification email sent! Please check your inbox.");
      }
    } catch (error) {
      if (error.response.data.message === "Email is already verified.") {
        setMessage("Email is already verified.");
        setEmailVerified(true);
      } else {
        console.error("Error during email verification:", error);
        setMessage("Error during email verification. Please try again.");
      }
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleUpdateEmail = async (userId) => {
    console.log(userId,"userId")
    if (!userEmail) {
      setMessage("Please enter a valid email to update.");
      return;
    }
    setEmailUpdating(true);
    try {
      const response = await axios.put(`${BASE_URL}/api/v2/ltuser/${userId}`, {
        email: userEmail,userId:userId,
      });
      console.log(response,"responseeeeee")
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
      setMessage("Please enter a valid BSG Number.");
      return;
    }

    setBsgUpdating(true);
    try {
      const response = await axios.put(`${BASE_URL}/api/v2/ltuser/${userId}`, {
        bsgNumber: bsgnumber,userId:userId,
      });
      console.log(response,"response")
      setMessage("BSG Number updated successfully.");
      setUserData((prevData) => ({ ...prevData, bsgUid: bsgnumber }));
    } catch (error) {
      setMessage("Error updating BSG Number. Please try again.");
    } finally {
      setBsgUpdating(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow-md mt-32">
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
          }}
          className="w-full border rounded px-3 py-2"
        >
          <option value="You Are">You Are</option>
          <option value="LT">LT</option>
          <option value="ALT">ALT</option>
          <option value="HWB">HWB</option>
        </select>
      </div>

      {(selectedCourse === "LT" || selectedCourse === "ALT") && (
        <div className="mb-4">
          <label htmlFor="honourableNumber" className="block mb-2 font-medium">
            Honourable Number:
          </label>
          <input
            type="text"
            id="honourableNumber"
            value={honourableNumber}
            onChange={(e) => setHonourableNumber(e.target.value)}
            placeholder="Enter Honourable Number"
            className="w-full border rounded px-3 py-2"
          />
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
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            message.includes("successful")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {userData && (
        <div className="mt-4 p-4 border rounded shadow">
          <h3 className="text-lg font-bold mb-2">User Details:</h3>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>State:</strong> {userData.STATE}
          </p>
          <p>
            <strong>Honourable Charge No:</strong>{" "}
            {userData.HONOURABLE_CHARGE_NO || "N/A"}
          </p>
          <p>
            <strong>BSG UID:</strong> {userData.bsgUid}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>

          {userData.email === "NA" && (
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
                className="w-full border rounded px-3 py-2"
              />
              <button
                onClick={() => handleUpdateEmail(userData._id)}
                disabled={emailUpdating}
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mt-4"
              >
                {emailUpdating ? "Updating..." : "Update Email"}
              </button>
            </div>
          )}

          {userData.bsgUid === "NA" && (
            <div className="mb-4">
              <label htmlFor="bsgnumber" className="block mb-2 font-medium">
                Enter BSGUID Number:
              </label>
              <input
                type="text"
                id="bsgnumber"
                value={bsgnumber}
                onChange={(e) => setBsgNumber(e.target.value)}
                placeholder="Enter your BSG Number"
                className="w-full border rounded px-3 py-2"
              />
              <button
                onClick={() => handleUpdateBsgNumber(userData._id)}
                disabled={bsgUpdating}
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mt-4"
              >
                {bsgUpdating ? "Updating..." : "Update BSG Number"}
              </button>
            </div>
          )}

          {userData.email !== "NA" && userData.bsgUid !== "NA" && (
            <div className="mt-4">
              {!emailVerified ? (
                <button
                  onClick={() => handleVerifyEmail(userData.email)}
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
  );
};

export default Login;
