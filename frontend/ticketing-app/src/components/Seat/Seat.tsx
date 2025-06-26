import React from "react";
import { SeatStatus } from "types/seat";

interface SeatProps {
  status: SeatStatus;
  onClick: () => void;
  label?: string; // 좌석 라벨 추가
}

const Seat: React.FC<SeatProps> = ({ status, onClick, label }) => {
  const getColor = () => {
    switch (status) {
      case "available":
        return "bg-blue-400";
      case "reserved":
        return "bg-gray-500 cursor-not-allowed";
      case "selected":
        return "bg-green-400";
      case "unavailable":
        return "bg-red-400 cursor-not-allowed";
    }
  };

  return (
    <div
      className={`w-16 h-16 m-1.5 rounded flex items-center justify-center text-lg font-medium text-white ${
        getColor()
      } ${
        status === "available" || status === "selected" ? "cursor-pointer" : ""
      }`}
      onClick={
        status === "available" || status === "selected" ? onClick : undefined
      }
    >
    <span className="font-bold">{label}</span>
    </div>
  );
};

export default Seat;
