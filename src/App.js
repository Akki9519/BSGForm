import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from '../src/component/Form'
import Login from "./component/Login";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/form" element={<Form />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
