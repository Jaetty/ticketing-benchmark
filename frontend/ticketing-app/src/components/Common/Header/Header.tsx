import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { trafficSettingStore } from 'stores';

export default function Header() {

    const started = trafficSettingStore((state) => state.started);
    const setStarted = trafficSettingStore((state) => state.setStarted);
    const navigate = useNavigate();

    const handleStopClick = () => {
        // 여기에 추후 백엔드 API 호출과 리다이렉션을 넣기
        alert("테스트를 멈춥니다!");
        setStarted(false);
        navigate("/result");
    }

    return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 */}
        <div className="text-2xl font-bold text-blue-600">
          {started ? (
              <span>TrafficBenchMark</span>
            ) : (
              <Link to="/">TrafficBenchMark</Link>
            )}
            </div>

        {/* 로그인/회원가입 or 프로필 */}
        {started && (
            <div className="space-x-4 hidden md:flex">
          <button onClick={handleStopClick} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">테스트 멈추기</button>
        </div>
        )}
      </div>
    </header>
  );
}