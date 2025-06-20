import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trafficSettingStore } from 'stores';

export default function TrafficSetting() {
  const navigate = useNavigate();

  // 시작 버튼을 눌렀을 때의 상태 변수 및 상태 변환 함수
  const setStarted = trafficSettingStore((state) => state.setStarted);

  // 라디오 버튼을 눌렀을 때의 상태 변수 및 상태 변환 함수
  const architecture = trafficSettingStore((state)=> state.architecture);
  const handleRadioItemChange = trafficSettingStore((state) => state.setArchitecture);

  // 체크 박스를 눌렀을 때의 상태 변수 및 상태 변환 함수
  const checkedAPI = trafficSettingStore((state)=> state.checkedAPI);
  const handleCheckBoxChange = trafficSettingStore((state) => state.toggleCheckedItem);

  /* 아래는 트래픽 관련 변수 및 함수 */

  // 트래픽 최대 인원 수 / 증가량 설정
  const setTrafficSetting = trafficSettingStore((state) => state.settrafficSetting);

  const [localtrafficSetting, setlocaltrafficSetting] = useState({ population: "", stage: "" });

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 숫자만 허용 (빈 문자열도 허용해서 지우기 가능)
    if (/^\d*$/.test(value)) {
      setlocaltrafficSetting((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 트래픽 테스트 최대 시간
  const maxTime = trafficSettingStore((state) => state.maxTime);
  const setMaxTime = trafficSettingStore((state) => state.setMaxTime);

  // 시작하기 버튼 눌렀을 때 처리 부분
  const handleSubmit = () => {

    let localChecked = [...checkedAPI];

    if (architecture === null) {
      alert("아키텍처를 선택해주세요!");
      return;
    }
    if (localtrafficSetting.population === "") {
      localtrafficSetting.population = '100';
    }
    if (localtrafficSetting.stage === "" || localtrafficSetting.stage > localtrafficSetting.population) {
      // 처음부터 꽉 있는걸로로
      localtrafficSetting.stage = localtrafficSetting.population;
    }
    if (maxTime === null){
      alert("트래픽 최대 시간을 설정해주세요!");
      return;
    }
    if (checkedAPI.length === 0) {
      handleCheckBoxChange('기본');
      localChecked.push('기본');
    }

    // trafficSetting의 상태를 저장해줌
    setTrafficSetting(localtrafficSetting);
    setStarted(true);

    alert(`선택한 아키텍쳐는 ${architecture}\n선택한 스킬은 "${localChecked.join(", \"")}"입니다.\n최대 이용자 수는 : ${localtrafficSetting.population}\n초당 이용자 증가 수 : ${localtrafficSetting.stage}`);
    // 예: 제출 후 다음 페이지로 이동
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-[700px]">
        <h2 className="text-xl font-bold">시스템 설정</h2>
        <hr className="my-6 border-gray-300 mb-8"/>

        {/* 아키텍처 설정하는 부분 */}
        <h3 className="text-l font-bold mb-3">아키텍쳐 설정</h3>
        <div className="flex space-x-6 mb-4">
          {['모놀리식', '모놀리식 WebFlux', 'MSA', 'MSA WebFlux'].map((selectedArchitecture) => (
            <label
              key={selectedArchitecture}
              className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-2"
            >
              <input
                type="radio"
                name="selectedArchitecture"
                value={selectedArchitecture}
                checked={architecture === selectedArchitecture}
                onChange={() => handleRadioItemChange(selectedArchitecture)}
                className="mr-2 w-200 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">{selectedArchitecture}</span>
            </label>
          ))}
        </div>

        {/* 기술 스택 설정 부분 */}
        <h3 className="text-l font-bold mb-3">기술 스택 설정</h3>
        <div className="flex space-x-6 mb-4">
          {['Redis', 'SQL 최적화', '대기열 기능 추가', '추후 옵션 추가'].map((skills) => (
            <label
              key={skills}
              className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-2"
            >
              <input
                type="checkbox"
                name="skills"
                value={skills}
                onChange={() => handleCheckBoxChange(skills)}
                className="mr-2 w-200 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">{skills}</span>
            </label>
          ))}
        </div>

        {/* 트래픽 설정 부분 */}
        <h2 className="text-xl font-bold mt-[40px]">트래픽 설정</h2>
        <hr className="my-6 border-gray-300 mb-8"/>
        
        {/* 최대 이용자수 설정 부분*/}
        <h3 className="text-l font-bold mb-3">최대 이용자 수</h3>
        <div className="flex space-x-6 mb-4 justify-end">
          <input
            type="text"
            inputMode="numeric"
            name="population"
            value={localtrafficSetting.population}
            onChange={handleTextInputChange}
            placeholder="숫자만 입력해주세요. ( 기본 10, 최대 10000 )"
            className="mr-2 w-full h-5 text-red-600 rounded p-4 border-2 border-gray-200 text-right"/>
        </div>

        {/* 점진적으로 증가하는 숫자 설정*/}
        <h3 className="text-l font-bold mb-3">초당 이용자 증가 수</h3>
        <div className="flex space-x-6 mb-4 justify-end">
          <input
            type="text"
            inputMode="numeric"
            name="stage"
            value={localtrafficSetting.stage}
            onChange={handleTextInputChange}
            placeholder="숫자만 입력해주세요. ( 기본 10, 최대 10000 )"
            className="mr-2 w-full h-5 text-red-600 rounded p-4 border-2 border-gray-200 text-right"/>
        </div>

        {/* 최대 시간 설정 */}
        <h3 className="text-l font-bold mb-3">트래픽 최대 시간 설정 (분 단위)</h3>
        <div className="flex space-x-6 mb-4">
          {[1, 3, 5, 10].map((time) => (
            <label
              key={time}
              className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-2"
            >
              <input
                type="radio"
                name="trafficOption"
                checked={maxTime === time}
                onChange={() => setMaxTime(time)}
                className="mr-2 w-200 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">{time}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
