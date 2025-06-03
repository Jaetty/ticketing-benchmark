import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">로그인 페이지</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/reserve")}
      >
        로그인
      </button>
    </div>
  );
}