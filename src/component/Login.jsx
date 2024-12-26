
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constant/constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [honourableNumber, setHonourableNumber] = useState('');
  const [bsgnumber, setBsgNumber] = useState('');
  const [parchmentNumber, setParchmentNumber] = useState('');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCourse === 'LT' || selectedCourse === 'ALT') {
      if (!honourableNumber) {
        setMessage('Please enter the Honourable Number.');
        return;
      }
    }

    if (selectedCourse === 'HWB') {
      if (!parchmentNumber) {
        setMessage('Please enter the Parchment Number.');
        return;
      }
    }

    const loginData = {
      email,
      bsgNumber: bsgnumber,
      course: selectedCourse,
      honourableNumber: selectedCourse !== 'HWB' ? honourableNumber : undefined,
      parchmentNumber: selectedCourse === 'HWB' ? parchmentNumber : undefined,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login`, loginData);
      console.log(response,"response")
      if (response.data) {
        const sectionq = response.data.user.course;
        localStorage.setItem("sectionq", sectionq);

        const userDetails = response.data.ltuser; // Assuming user details come here
        if (userDetails) {
          setUserData(userDetails);
          setMessage('Login successful! Please verify your email to proceed.');
        } else {
          setMessage('No user data found. Please check your credentials.');
        }
      } else {
        setMessage('Invalid credentials or data mismatch. Please check your details.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error during login. Please try again.');
    }
  };




  const handleVerifyEmail = async (email) => {
    
  
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/verify-email`, { email });
      console.log(response.data, "data");
  
      // Handle case where verification email is sent
      if (response.data.message === "Verification email sent! Please check your inbox.") {
        setMessage('Verification email sent! Please check your inbox.');
        return;
      }
  
      // Handle case where the email is verified successfully
      // if (response.data.message === "Email verified successfully!" || response.data.status === 200) {
      //   setIsVerified(true);
      //   setMessage('Email verified successfully! Redirecting to the next page...');
      //   setTimeout(() => navigate('/form'), 2000);
      // } else {
      //   setMessage('Email verification failed. Please try again.');
      // }
  
    } catch (error) {
      console.error('Error during email verification:', error);
      setMessage('Error during email verification. Please try again.');
    }
  };


  
  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow-md mt-32">
      <h1 className="text-2xl font-bold mb-4 uppercase text-center text-[#1D56A5]">The Bharat Scouts and Guides</h1>
      <h2 className="text-xl font-bold mb-4 uppercase text-center text-[#1D56A5]">Trainer's Portal-Know Your Trainer's</h2>

      <div className="mb-4">
        <label htmlFor="course" className="block mb-2 font-medium">You Are:</label>
        <select
          id="course"
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setMessage('');
            setHonourableNumber('');
            setParchmentNumber('');
          }}
          className="w-full border rounded px-3 py-2"
        >
          <option value="" disabled>You Are</option>
          <option value="LT">LT</option>
          <option value="ALT">ALT</option>
          <option value="HWB">HWB</option>
        </select>
      </div>

      {(selectedCourse === 'LT' || selectedCourse === 'ALT') && (
        <div className="mb-4">
          <label htmlFor="honourableNumber" className="block mb-2 font-medium">Honourable Number:</label>
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

      {selectedCourse === 'HWB' && (
        <div className="mb-4">
          <label htmlFor="parchmentNumber" className="block mb-2 font-medium">Parchment Number:</label>
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
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>

      {message && (
        <div className={`mt-4 p-3 rounded ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {userData && (
        <div className="mt-4 p-4 border rounded shadow">
          <h3 className="text-lg font-bold mb-2">User Details:</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>State:</strong> {userData.STATE}</p>
          <p><strong>Honourable Charge No:</strong> {userData.HONOURABLE_CHARGE_NO || 'N/A'}</p>
          {userData.bsgUid !== "NA" ? (
  <p><strong>BSG UID:</strong> {userData.bsgUid}</p>
) : null}

         
          <p><strong>Email:</strong> {userData.email}</p>
          {!isVerified && (
            <button
              onClick={()=>handleVerifyEmail(userData.email)}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mt-4"
            >
              Verify Email
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
