// src/App.jsx or src/Routes.jsx

import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import SuccessPage from "./components/SuccessPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
