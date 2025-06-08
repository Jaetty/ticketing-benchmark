import { useNavigate } from "react-router-dom";

export default function TrafficSetting() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">트래픽 세팅</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/login")}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}