import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Verify from "./component/Verify";
import Login from "./component/Login";
import Navigation from "./component/Form"; // Import the Navigation component
import ProtectedRoute from "./ProtectedRoute";
const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Route path="/profile" exact element={< ProtectedRoute component={Profile} />} /> */}
        <Route path="/" element={<Login />} />
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
