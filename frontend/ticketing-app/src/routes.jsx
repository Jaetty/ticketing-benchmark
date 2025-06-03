// routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SeatSelect from './pages/SeatSelect';
import Payment from './pages/Payment';
import Complete from './pages/DonePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select-seat" element={<SeatSelect />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </BrowserRouter>
  );
}
