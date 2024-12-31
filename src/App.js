// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Form from '../src/component/Form'
// import Login from "./component/Login";
// import Verify from "./component/Verify";
// import LTInfo from "./component/LTInfo";
// import ALTInfo from "./component/ALTInfo";
// import BasicForm from "./component/BasicInfo";
// import AdvancedForm from "./component/AdvancedInfo";
// import HwbForm from "./component/HwbInfo";
// import PersonalInformation from "./component/PersonalInfo";


// const App = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/form" element={<Form />} />
//       <Route path="/" element={<Login />} />
//       <Route path="/lt" element={<LTInfo />} />
//       <Route path="/alt" element={<ALTInfo />} />
//       <Route path="/basic" element={<BasicForm />} />
//       <Route path="/advanced" element={<AdvancedForm />} />
//       <Route path="/hwb" element={<HwbForm />} />
//       <Route path="/form" element={<PersonalInformation/>} />
//       <Route path="/verify/:token" element={<Verify />} />
//     </Routes>
//   </BrowserRouter>
// );

// export default App;




import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./component/Form";
import PersonalInformation from "./component/PersonalInfo";
import LTInfo from "./component/LTInfo";
import ALTInfo from "./component/ALTInfo";
import HwbForm from "./component/HwbInfo";
import BasicForm from "./component/BasicInfo";
import AdvancedForm from "./component/AdvancedInfo";
import Verify from "./component/Verify";
import Login from "./component/Login";
import Navigation from "./component/Form"; // Import the Navigation component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Form />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<><Navigation /></>} />
        <Route path="/lt" element={<><Navigation /></>} />
        <Route path="/alt" element={<><Navigation /></>} />
        <Route path="/hwb" element={<><Navigation /></>} />
        <Route path="/basic" element={<><Navigation /></>} />
        <Route path="/advanced"  exact element={<><Navigation /></>} />
        <Route path="/verify/:token" element={<Verify />} />
      </Routes>
    </Router>
  );
};

export default App;