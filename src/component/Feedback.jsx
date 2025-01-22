import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
const Feedback = () => {

    const [feedbackName,setFeedbackName] = useState("");
    const [feedbackDob, setFeedbackDob] = useState("");
    const [feedbackEmail, setFeedbackEmail] = useState("");
    const [feedbackSection, setFeedbackSection] = useState("");
    const [feedbackHonuorable, setFeedbackHonuorable] = useState("");
    const [feedbackUid, setFeedbackUid] = useState("");
    const [feedbackNumber, setFeedbackNumber] = useState("");
    const [message1, setMessage1] = useState("");
    const [issue, setIssue] = useState("");



    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const handleFeedbackSubmit=async(e)=>{
        e.preventDefault();
    
        if (
          !feedbackName ||
          !feedbackEmail ||
          !feedbackDob ||
          !feedbackHonuorable ||
          !feedbackNumber ||
          !feedbackUid ||
          !feedbackSection ||
          !issue
        ) {
          setMessage1("All fields are required.");
          return;
        }
      
         // Email and phone number validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email
      const phoneRegex = /^[0-9]{10}$/; // Regex for 10-digit phone number
    
      if (!emailRegex.test(feedbackEmail)) {
        setMessage1("Invalid email format");
        return;
      }
    
      if (!phoneRegex.test(feedbackNumber)) {
        setMessage1("Invalid phone number format");
        return;
      }
        const data ={
          feedbackName:feedbackName,
          feedbackEmail: feedbackEmail,
          feedbackDob: feedbackDob,
          feedbackHonuorable:feedbackHonuorable,
          feedbackNumber:feedbackNumber,
          feedbackUid:feedbackUid,
          feedbackSection:feedbackSection,
          issue:issue
    
        }
        console.log(data,"data")
    
        try {
    const response = await axios.post(`${BASE_URL}/api/v2/feedback`,data);
    console.log(response.data,"response")
    if(response.data.message === "Feedback created successfully"){
      setMessage1("Feedback Form submitted successfully");
      setFeedbackName("");
      setFeedbackEmail("");
      setFeedbackDob("")
      setFeedbackHonuorable("");
      setFeedbackNumber("");
      setFeedbackUid("");
      setFeedbackSection("");
      setIssue("");
      return;
    }
        } catch (error) {
          
          if(error.response.data.message === "Feedback has already been submitted."){
            setMessage1("Feedback has already been submitted.");
          }
          else{
            setMessage1("Server Error")
          }
          
        }
    
      }
  return (
    <div class="max-w-xl mx-auto p-6 mt-20 mb-6 bg-white rounded-lg shadow-lg">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 uppercase ">Feedback Form</h1>
      <p class="text-sm text-red-600 mt-2">Disclaimer: If you have any issues regarding the KYT Form, please fill out this feedback form, and we will contact you soon.</p>
    </div>
  
    <form>
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Enter the Name</label>
          <input type="text" id="name" placeholder="Enter the Name" value={feedbackName} onChange={(e) => setFeedbackName(e.target.value)} class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
  
        <div>
          <label for="dob" class="block text-sm font-medium text-gray-700">Enter the DOB</label>
          <input type="date" id="dob" placeholder="Enter the BSG DOB" value={feedbackDob} onChange={(e) => setFeedbackDob(e.target.value)} class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
  
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Enter the Email</label>
          <input type="email" id="email" placeholder="Enter the Email as eg: xyz81@gmail.com" value={feedbackEmail} onChange={(e) => setFeedbackEmail(e.target.value)} class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
  
        <div>
  <label htmlFor="section" className="block text-sm font-medium text-gray-700">Select the Section</label>
  <select
    id="section"
    value={feedbackSection}
    onChange={(e) => setFeedbackSection(e.target.value)}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="">Select a Section</option>
    <option value="Scout">Scout</option>
    <option value="Guide">Guide</option>
    <option value="Bulbul">Bulbul</option>
    <option value="Cub">Cub</option>
    <option value="Ranger">Ranger</option>
    <option value="Rover">Rover</option>
  </select>
</div>

  
        <div>
          <label for="chargeNumber" class="block text-sm font-medium text-gray-700">Enter the Honourable Charge Number</label>
          <input type="text" id="chargeNumber" placeholder="Enter the Honourable Charge Number" value={feedbackHonuorable} onChange={(e) => setFeedbackHonuorable(e.target.value)} class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
  
        <div>
          <label for="uid" class="block text-sm font-medium text-gray-700">Enter the BSG UID</label>
          <input type="text" id="uid" placeholder="Enter the BSG UID" value={feedbackUid} onChange={(e) => setFeedbackUid(e.target.value)} class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
  
        <div>
          <label for="mobile" class="block text-sm font-medium text-gray-700">Enter the Mobile Number</label>
          <input type="text" id="mobile" placeholder="Enter the Mobile Number" value={feedbackNumber} onChange={(e) => setFeedbackNumber(e.target.value)} class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
  <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700">Enter the Issue in Detail</label>
  <textarea
    id="issueDescription"
    placeholder="Enter the Issue in Detail"
    value={issue}
    onChange={(e) => setIssue(e.target.value)}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
  />
</div>

  
        <div class="mt-6">
          <button type="submit" class="w-full py-3 bg-[#1D56A5] text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleFeedbackSubmit}>
            Submit
          </button>
        </div>
      </div>
    </form>
    {message1 && (
    <div
      className={`my-4 p-3 rounded ${
        message1.includes("successful")
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {message1}
    </div>
  )}
  </div>

  )
}

export default Feedback