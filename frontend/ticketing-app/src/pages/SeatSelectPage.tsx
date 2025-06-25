import React, { useState } from "react";
import Seat from "components/Seat/Seat";
import { Seat as SeatType } from "types/seat";
import { useNavigate } from "react-router-dom";


export default function SeatSelectPage() {

    const navigate = useNavigate();

    const [seats, setSeats] = useState<SeatType[][]>(() => {
    // 10x10 좌석 생성
    return Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => ({
        id: `${row}-${col}`,
        row,
        col,
        status: Math.random() < 0.1 ? "reserved" : "available",
      }))
    );
  });

  const toggleSeat = (row: number, col: number) => {
    setSeats(prev =>
      prev.map((r, rIdx) =>
        r.map((seat, cIdx) => {
          if (rIdx === row && cIdx === col) {
            return {
              ...seat,
              status:
                seat.status === "available"
                  ? "selected"
                  : seat.status === "selected"
                  ? "available"
                  : seat.status,
            };
          }
          return seat;
        })
      )
    );
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold mb-4">좌석 선택</h2>
      <div className="grid grid-cols-10 gap-1">
        {seats.flat().map(seat => (
          <Seat
            key={seat.id}
            status={seat.status}
            onClick={() => toggleSeat(seat.row, seat.col)}
          />
        ))}
      </div>
      <button
        className="bg-sky-500 text-white px-4 py-2 rounded mt-5"
        onClick={() => navigate("/pay")}
      >
        예매하기
      </button>
    </div>
  );


};
