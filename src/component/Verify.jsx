import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant/constant";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ error: "", success: "" });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v2/verify-email/${token}`
        );
        console.log(response, "response");
        console.log(response.data.message, "message");
        setStatus({
          error: "",
          success: "Your email has been successfully verified! Redirecting...",
        });
        setTimeout(() => {
          navigate("/form");
        }, 5000);
      } catch (err) {
        setStatus({
          error: err.response?.data?.message || "Something went wrong!",
          success: "",
        });
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-yellow-400">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Email Verification
        </h1>
        {status.success && (
          <div className="text-green-600 font-semibold mb-4">
            {status.success}
          </div>
        )}
        {/* {status.error && (
          <div className="text-red-600 font-semibold mb-4">
            {status.error}
          </div>
        )} */}
        <p className="text-gray-600">
          {status.success
            ? "Hang tight! We'll take you to the next step."
            : "We're verifying your email. Please wait..."}
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
