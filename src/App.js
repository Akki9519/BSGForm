import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Verify from "./component/Verify";
import Login from "./component/Login";
import Navigation from "./component/Form"; // Import the Navigation component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/form"
          element={
            <>
              <Navigation />
            </>
          }
        />
        <Route
          path="/lt"
          element={
            <>
              <Navigation />
            </>
          }
        />
        <Route
          path="/alt"
          element={
            <>
              <Navigation />
            </>
          }
        />
        <Route
          path="/hwb"
          element={
            <>
              <Navigation />
            </>
          }
        />
        <Route
          path="/basic"
          element={
            <>
              <Navigation />
            </>
          }
        />
        <Route
          path="/advanced"
          exact
          element={
            <>
              <Navigation />
            </>
          }
        />
        <Route path="/verify/:token" element={<Verify />} />
      </Routes>
    </Router>
  );
};

export default App;
