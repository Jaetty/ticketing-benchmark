import { useNavigate } from "react-router-dom";
import { trafficSettingStore } from 'stores';

export default function ResultPage() {
  const navigate = useNavigate();
  const architecture = trafficSettingStore((state) => state.architecture);
  const checkedAPI = trafficSettingStore((state) => state.checkedAPI);
  const trafficSetting = trafficSettingStore((state) => state.trafficSetting);
  const reset = trafficSettingStore((state) => state.reset);

  const handleGoHome = () => {
    reset();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">테스트 결과 통계 페이지</h1>

      <h1 className="text-xl font-bold mb-1">아키텍쳐 : {architecture} </h1>
      <h1 className="text-xl font-bold mb-1">기술 스택 : {checkedAPI.join(", \"")} </h1>
      <h1 className="text-xl font-bold mb-1">최대 트래픽 인원 : {trafficSetting.population} </h1>
      <h1 className="text-xl font-bold mb-1">초당 트래픽 증가량 : {trafficSetting.stage} </h1>

      <button
        className="bg-green-500 text-white mt-5 font-bold px-4 py-2 rounded"
        onClick={() => handleGoHome() }
      >
        처음 페이지로 돌아가기
      </button>
    </div>
  );
}