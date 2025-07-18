// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import TrafficSetting from "./pages/TrafficSetting"
import LoginPage from "./pages/LoginPage";
import ReservePage from "./pages/ReservePage";
import PayPage from "./pages/PayPage";
import DonePage from "./pages/DonePage";
import ResultPage from "./pages/ResultPage";
import SeatSelectPage from "pages/SeatSelectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/traffic" />} />
      <Route path="/traffic" element={<TrafficSetting />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reserve" element={<ReservePage />} />
      <Route path="/seat" element={<SeatSelectPage />} />
      <Route path="/pay" element={<PayPage />} />
      <Route path="/done" element={<DonePage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
