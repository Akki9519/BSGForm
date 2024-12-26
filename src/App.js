import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from '../src/component/Form'
import Login from "./component/Login";
import Verify from "./component/Verify";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/form" element={<Form />} />
      <Route path="/" element={<Login />} />
      <Route path="/verify/:token" element={<Verify />} />
    </Routes>
  </BrowserRouter>
);

export default App;
