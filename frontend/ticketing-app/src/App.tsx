// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ReservePage from "./pages/ReservePage";
import PayPage from "./pages/PayPage";
import DonePage from "./pages/DonePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reserve" element={<ReservePage />} />
      <Route path="/pay" element={<PayPage />} />
      <Route path="/done" element={<DonePage />} />
    </Routes>
  );
}

export default App;
