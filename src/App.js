import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from '../src/component/Form'


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
    </Routes>
  </BrowserRouter>
);

export default App;
