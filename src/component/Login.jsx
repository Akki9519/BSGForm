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
  const [honourableNumbers, setHonourableNumbers] = useState([]);
  const [parchmentNumbers, setParchmentNumbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from APIs on component mount
    getLtData();
    getALtData();
    getHwbData();
  }, []);

  const getLtData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/ltuser`);
      const result = response.data?.map(item => item.HONOURABLE_CHARGE_NO) || [];
      setHonourableNumbers(prev => [...prev, ...result]);
    } catch (error) {
      console.error('Error fetching LT data:', error);
    }
  };

  const getALtData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/altuser`);
      const result = response.data?.map(item => item.HONOURABLE_CHARGE_NO) || [];
      setHonourableNumbers(prev => [...prev, ...result]);
    } catch (error) {
      console.error('Error fetching ALT data:', error);
    }
  };

  const getHwbData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/hwbuser`);
      const result = response.data?.map(item => item.PARCHMENT_NO) || [];
      setParchmentNumbers(result);
    } catch (error) {
      console.error('Error fetching HWB data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    if (!bsgnumber) {
      setMessage('Please enter your BSG number.');
      return;
    }

    if (selectedCourse === 'LT' || selectedCourse === 'ALT') {
      if (!honourableNumber) {
        setMessage('Please enter the Honourable Number.');
        return;
      }

      if (!honourableNumbers.includes(honourableNumber.trim())) {
        setMessage('Honourable Number is not valid. Please check your input.');
        return;
      }
    }

    if (selectedCourse === 'HWB') {
      if (!parchmentNumber) {
        setMessage('Please enter the Parchment Number.');
        return;
      }

      if (!parchmentNumbers.includes(parchmentNumber.trim())) {
        setMessage('Parchment Number is not valid. Please check your input.');
        return;
      }
    }

    // Prepare data for API request
    const loginData = {
      email,
      bsgNumber: bsgnumber,
      course: selectedCourse,
      honourableNumber: selectedCourse !== 'HWB' ? honourableNumber : undefined,
      parchmentNumber: selectedCourse === 'HWB' ? parchmentNumber : undefined,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login`, loginData);

      if (response.data.success) {
        setMessage('Login successful! Proceeding to the form page...');
        setTimeout(() => {
          navigate('/form');
        }, 2000);
      } else {
        setMessage('Invalid credentials or data mismatch. Please check your details.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error during login. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow-md mt-32">
      <h1 className="text-2xl font-bold mb-4 uppercase text-center text-[#1D56A5]">The Bharat Scouts & Guides</h1>

      <div className="mb-4">
        <label htmlFor="bsgnumber" className="block mb-2 font-medium">BSG NUMBER:</label>
        <input
          type="text"
          value={bsgnumber}
          onChange={(e) => setBsgNumber(e.target.value)}
          placeholder="Enter BSG Number"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="course" className="block mb-2 font-medium">Select Course:</label>
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
          <option value="" disabled>Select a course</option>
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

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium">Enter Email Address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border rounded px-3 py-2"
        />
      </div>

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
    </div>
  );
};

export default Login;
