import React from "react";
import { SeatStatus } from "types/seat";

interface SeatProps {
  status: SeatStatus;
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ status, onClick }) => {
  const getColor = () => {
    switch (status) {
      case "available":
        return "bg-green-400";
      case "reserved":
        return "bg-gray-500 cursor-not-allowed";
      case "selected":
        return "bg-blue-400";
      case "unavailable":
        return "bg-red-400 cursor-not-allowed";
    }
  };

  return (
    <div
      className={`w-8 h-8 m-1 rounded ${getColor()} ${
        status === "available" || status === "selected" ? "cursor-pointer" : ""
      }`}
      onClick={status === "available" || status === "selected" ? onClick : undefined}
    />
  );
};

export default Seat;
