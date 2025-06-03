import { useNavigate } from "react-router-dom";

export default function DonePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다!</h1>
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => navigate("/login")}
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}