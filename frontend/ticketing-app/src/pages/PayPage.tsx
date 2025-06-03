import { useNavigate } from "react-router-dom";

export default function PayPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">결제 페이지</h1>
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/done")}
      >
        결제 완료
      </button>
    </div>
  );
}