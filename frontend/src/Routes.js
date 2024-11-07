import React from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";
function Routes() {
  return (
    <div>
      <Routes>
        <Route path="/checkout" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </div>
  );
}

export default Routes;
