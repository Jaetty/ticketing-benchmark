import { useNavigate } from "react-router-dom";

export default function ReservePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">기차 선택 페이지</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-5"
        onClick={() => navigate("/seat")}
      >
        예매하기
      </button>
    </div>
  );
}