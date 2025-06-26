import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type TrainInfo = {
  id: string;
  name: string;
  departure: string;
  arrival: string;
  price: number;
};

// 예시 열차 데이터 (50개 생성)
const ALL_TRAINS: TrainInfo[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `열차-${i + 1}`,
  departure: `0${i % 10}:00`,
  arrival: `1${i % 10}:30`,
  price: 10000 + i * 1000,
}));

const PAGE_SIZE = 10;

export default function ReservePage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(ALL_TRAINS.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const currentPageData = ALL_TRAINS.slice(start, start + PAGE_SIZE);

  const handleReserve = (trainId: string) => {
    navigate("/seat");
  };

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 pt-24">
      <h1 className="text-2xl font-bold mb-6">기차 선택 페이지</h1>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-5 font-bold border-b py-3 w-full max-w-4xl text-center">
        <div>열차</div>
        <div>출발시간</div>
        <div>도착시간</div>
        <div>최소 금액</div>
        <div></div>
      </div>

      {/* 열차 데이터 */}
      {currentPageData.map((train) => (
        <div
          key={train.id}
          className="grid grid-cols-5 items-center py-3 border-b w-full max-w-4xl text-center"
        >
          <div>{train.name}</div>
          <div>{train.departure}</div>
          <div>{train.arrival}</div>
          <div>{train.price.toLocaleString()}원</div>
          <div>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => handleReserve(train.id)}
            >
              예매하기
            </button>
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <div className="flex gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
