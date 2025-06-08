import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TrafficSetting() {
  const navigate = useNavigate();

  /* 아래는 버튼 관련 변수 및 함수 모음 */

  // 라디오 설정 기억하는 변수, 그걸 교체하는 함수
  const [selectedItem, setselectedItem] = useState<string | null>(null);
  // 체크 박스 설정 기억하는 변수, 그걸 교체하는 함수
  const [checkedItems, setcheckedItems] = useState<string[]>([]);

  // 라디오 변환 함수
  const handleRadioItemChange = (option: string) => {
    setselectedItem(option);
  };

  // 체크박스 변환 변수
  const handleCheckBoxChange = (item: string) => {
    setcheckedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item) // 이미 있으면 제거
        : [...prev, item] // 없으면 추가
    );
  };


  /* 아래는 트래픽 관련 변수 및 함수 */

  // 트래픽 최대 인원 수 / 증가량 설정
  const [inputs, setInputs] = useState({ population: "", stage: "" });

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 숫자만 허용 (빈 문자열도 허용해서 지우기 가능)
    if (/^\d*$/.test(value)) {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [maxTime, setMaxTime] = useState<number | null>(null);

  const handleMaxTimeChange = (item : number) => {
    setMaxTime(item);
  };

  // 시작하기 버튼 눌렀을 때 처리 부분
  const handleSubmit = () => {
    if (selectedItem === null) {
      alert("아키텍처를 선택해주세요!");
      return;
    }
    if (checkedItems.length === 0) {
      alert("스킬을 하나 이상 선택해주세요!");
      return;
    }
    if (inputs.population === "") {
      inputs.population = '10';
    }
    if (inputs.stage === "" || inputs.stage > inputs.population) {
      // 처음부터 꽉 있는걸로로
      inputs.stage = inputs.population;
    }
    if (maxTime === null){
      alert("트래픽 최대 시간을 설정해주세요!");
      return;
    }

    alert(`선택한 아키텍쳐는 ${selectedItem}\n선택한 스킬은 "${checkedItems.join(", \"")}"입니다.\n최대 이용자 수는 : ${inputs.population}\n초당 이용자 증가 수 : ${inputs.stage}`);
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
          {['모놀리식', '모놀리식 WebFlux', 'MSA', 'MSA WebFlux'].map((architecture) => (
            <label
              key={architecture}
              className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-2"
            >
              <input
                type="radio"
                name="architecture"
                value={architecture}
                checked={selectedItem === architecture}
                onChange={() => handleRadioItemChange(architecture)}
                className="mr-2 w-200 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">{architecture}</span>
            </label>
          ))}
        </div>

        {/* 기술 스택 설정 부분 */}
        <h3 className="text-l font-bold mb-3">기술 스택 설정</h3>
        <div className="flex space-x-6 mb-4">
          {['Redis', 'SQL 최적화', '나중에 추가', '나중에 추가'].map((skills) => (
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
            value={inputs.population}
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
            value={inputs.stage}
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
                onChange={() => handleMaxTimeChange(time)}
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
