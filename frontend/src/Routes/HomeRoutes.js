import React from 'react'
import { Routes, Route } from "react-router-dom";
import Checkout from '../pages/Checkout';
function HomeRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    </div>
  )
}

export default HomeRoutes
