import React,{useState,useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
const LTInfo = () => {
  const [selectedWing, setSelectedWing] = useState("");
  const [selectedSubWing, setSelectedSubWing] = useState("");
  const [courseDisable, setCourseDisable] = useState([]);
  const [formData, setFormData] = useState({
    currentAddress: "",
    permanentAddress: "",
    education: [""],
    sameAddress: false,
  });
  const [selectType, setSelectType] = useState("");
  const [currentStep, setCurrentStep] = useState(0);


  const [courses, setCourses] = useState([
    {
      id: 1,
      wing: "",
      subwing: "",
      fromDate: "",
      toDate: "",
      venue: "",
      leader: "",
      certificateNumber: "",
      certificateDate: "",
    },
  ]);


  const removeCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };



  const handleChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;

    if (field === "subwing") {
      const existingSubwings = updatedCourses
        .filter((course, idx) => idx !== index)
        .map((course) => course.subwing);
      if (!existingSubwings.includes(value)) {
        updatedCourses[index][field] = value;
      }
    }

    setCourses(updatedCourses);
  };

  const subWingOptions = {
    Scout: ["Cub", "Scout", "Rover"],
    Guide: ["Bulbul", "Guide", "Ranger", "Cub", "Scout"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSelectTypeChange = (e) => {
    setSelectType(e.target.value);
  };

  useEffect(()=>{
    window.scrollTo(0,0)
      },[])
  return (
    <>
      <div>
            <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4 uppercase">LT Form</h2>
            <div className="border p-4 rounded">
              <ToastContainer />
              <h2 className="font-bold text-black text-lg mb-4">Wing and Sub-Wing Selection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label className="block mb-2 font-bold text-black">Select Wing</label>
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
                  <label className="block mb-2 font-bold text -black">Select Sub-Wing</label>
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
                </div>
              </div>

              <h2 className="font-bold text-black text-lg mb-4">Training Courses Assisted/Conducted in Last Year</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label className="block mb-2 font-bold text-black">Select Type</label>
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
                  <label className="block mb-2 font-bold text-black">Course Date</label>
                  <input
                    type="date"
                    name="courseDate"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label className="block mb-2 font-bold text-black">Place</label>
                  <input
                    type="text"
                    name="place"
                    placeholder="Place"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                {selectType !== "conducted" && (
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">Leader of the Course</label>
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
                  <label className="block mb-2 font-bold text-black">No. of Participants</label>
                  <input
                    type="number"
                    name="participants"
                    placeholder="No. of Participants"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="font-bold text-black">Details of Last ROT Attended</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 font-bold text-black">Course From Date</label>
                    <input
                      type="date"
                      name="courseFromDate"
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-black">Course To Date</label>
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
                    <label className="block mb-2 font-bold text-black">Certificate Number</label>
                    <input
                      type="text"
                      name="certificateNumber"
                      onChange={handleInputChange}
                      placeholder="Certificate Number"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>

                  <div className="mb-4">
                    < label className="block mb-2 font-bold text-black">Certificate Date</label>
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
                    <label className="block mb-2 font-bold text-black">Leader of the Course</label>
                    <input
                      type="text"
                      name="leader"
                      onChange={handleInputChange}
                      placeholder="Leader of the Course"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-black">Place</label>
                    <input
                      type="text"
                      name="place"
                      onChange={handleInputChange}
                      placeholder="Place"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div
              className="bg-[#1D56A5] rounded-md flex justify-center items-center  py-1 text-white font-medium my-5 cursor-pointer"
              // onClick={handleSubmit}
            >
              <ToastContainer />
              Submit
            </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default LTInfo