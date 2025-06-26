import React, { useState } from "react";
import Seat from "components/Seat/Seat";
import { Seat as SeatType } from "types/seat";
import { useNavigate } from "react-router-dom";

export default function SeatSelectPage() {
  const navigate = useNavigate();

  const rowLabels = ["A", "B", "C", "", "D", "E", "F"]; // ← 통로는 빈 문자열로 표시
  const colCount = 18;

  const [seats, setSeats] = useState<(SeatType | null)[][]>(() => {
    return rowLabels.map((label, rowIdx) =>
      label === ""
        ? Array.from({ length: colCount }, () => null) // 통로 줄
        : Array.from({ length: colCount }, (_, colIdx) => ({
            id: `${colIdx + 1}${label}`,
            row: rowIdx,
            col: colIdx,
            status: Math.random() < 0.1 ? "reserved" : "available",
          }))
    );
  });


  const toggleSeat = (row: number, col: number) => {
    setSeats(prev =>
      prev.map((r, rIdx) =>
        r.map((seat, cIdx) => {
          if (rIdx === row && cIdx === col && seat) {
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

      <div className="flex flex-col items-center gap-1">
      {seats.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex flex-wrap gap-1 justify-center"
        >
          {row.map((seat, colIdx) =>
            seat ? (
              <Seat
                key={seat.id}
                status={seat.status}
                onClick={() => toggleSeat(seat.row, seat.col)}
                label={seat.id}
              />
            ) : (
              <div
                key={`aisle-${rowIdx}-${colIdx}`}
                className="w-8 h-8"
              />
            )
          )}
        </div>
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
}