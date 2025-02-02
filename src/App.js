import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Verify from "./component/Verify";
import Login from "./component/Login";
import FeedBack from './component/Feedback'
import Navigation from "./component/Form"; // Import the Navigation component
import ProtectedRoute from "./ProtectedRoute";
const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Route path="/profile" exact element={< ProtectedRoute component={Profile} />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/feedback" element={<FeedBack />} />
        <Route
          path="/form"
          exact element={
            <>
              <ProtectedRoute component={Navigation}/>
            </>
          }
        />
        <Route
          path="/lt"
          exact element={
            <>
              <ProtectedRoute component={Navigation} />
            </>
          }
        />
        <Route
          path="/alt"
          exact element={
            <>
              < ProtectedRoute component={Navigation} />
            </>
          }
        />
        <Route
          path="/hwb"
         exact element={
            <>
              < ProtectedRoute component={Navigation} />
            </>
          }
        />
        <Route
          path="/basic"
          exact element={
            <>
              <ProtectedRoute component={Navigation} />
            </>
          }
        />
        <Route
          path="/advanced"
          exact
          element={
            <>
              <ProtectedRoute component={Navigation} />
            </>
          }
        />
        <Route path="/verify/:token" element={<Verify />} />
      </Routes>
    </Router>
  );
};

export default App;


// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Verify from "./component/Verify";
// import Login from "./component/Login";
// import FeedBack from "./component/Feedback";
// import Navigation from "./component/Form"; // Import the Navigation component
// import ProtectedRoute from "./ProtectedRoute";

// const App = () => {
//   useEffect(() => {
//     const disableDevTools = (event) => {
//       // Prevent Ctrl+Shift+I
//       if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") {
//         event.preventDefault();
//         alert("Developer Tools are disabled!");
//       }

//       // Prevent Ctrl+Shift+J (Console in Chrome)
//       if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") {
//         event.preventDefault();
//         alert("Developer Tools are disabled!");
//       }

//       // Prevent Ctrl+Shift+C (Element Picker)
//       if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") {
//         event.preventDefault();
//         alert("Developer Tools are disabled!");
//       }

//       // Prevent F12 (DevTools)
//       if (event.key === "F12") {
//         event.preventDefault();
//         alert("Developer Tools are disabled!");
//       }
//     };

//     const disableRightClick = (event) => {
//       event.preventDefault();
//       alert("Right-click is disabled!");
//     };

//     // Add event listeners
//     document.addEventListener("keydown", disableDevTools);
//     document.addEventListener("contextmenu", disableRightClick);

//     // Cleanup event listeners on component unmount
//     return () => {
//       document.removeEventListener("keydown", disableDevTools);
//       document.removeEventListener("contextmenu", disableRightClick);
//     };
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/profile" exact element={< ProtectedRoute component={Profile} />} /> */}
//         <Route path="/" element={<Login />} />
//         <Route path="/feedback" element={<FeedBack />} />
//         <Route path="/form" exact element={<ProtectedRoute component={Navigation} />} />
//         <Route path="/lt" exact element={<ProtectedRoute component={Navigation} />} />
//         <Route path="/alt" exact element={<ProtectedRoute component={Navigation} />} />
//         <Route path="/hwb" exact element={<ProtectedRoute component={Navigation} />} />
//         <Route path="/basic" exact element={<ProtectedRoute component={Navigation} />} />
//         <Route path="/advanced" exact element={<ProtectedRoute component={Navigation} />} />
//         <Route path="/verify/:token" element={<Verify />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
