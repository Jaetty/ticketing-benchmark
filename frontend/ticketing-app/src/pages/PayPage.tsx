import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PayPage() {
  const navigate = useNavigate();

  const [installment, setInstallment] = useState<number>(0);

  const installmentToString = (installment: number): string => {
    if (installment === 0) return '일시불';
    if (installment >= 1 && installment <= 6) return `${installment}개월 (무이자)`;
    return `${installment}개월`;
  };

  const installmentOptions = [
    { label: '일시불', value: '0' },
    ...Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const isNoInterest = month <= 6;
      return {
        label: `${month}개월${isNoInterest ? ' (무이자)' : ''}`,
        value: `${month}`,
      };
    }),
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-[700px]">
        <h2 className="text-xl font-bold">결제 페이지</h2>
        <hr className="my-6 border-gray-300 mb-8"/>

        {/* 신용카드 입력 부분 */}
        <h3 className="text-l font-bold mb-3">신용카드 / Credit Card</h3>
        <div className="flex space-x-6 mb-4 justify-end">
          <input
            type="text"
            inputMode="numeric"
            name="population"
            placeholder="12글자로 아무 값을 입력해주세요"
            className="mr-2 w-full h-5 text-red-600 rounded p-4 border-2 border-gray-200 text-right"/>
        </div>

        {/* 만료일 + CVC */}
        <div className="flex gap-4">
          {/* 만료일 */}
          <div className="flex-1">
            <h3 className="text-l font-bold mb-3">만료</h3>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full border rounded-md px-4 py-2 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* CVC */}
          <div className="flex-1">
            <h3 className="text-l font-bold mb-3">CVC</h3>
            <input
              type="numeric"
              maxLength={3}
              placeholder="3글자"
              className="w-full border rounded-md px-4 py-2 text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* 할부개월 */}
        <div className="flex-1 mt-5">
            <h3 className="text-l font-bold mb-3">할부 개월</h3>
            <select 
              className="w-full border rounded-md px-4 py-2"
              value={installment}
              onChange={(e) => setInstallment(Number(e.target.value))}>

            {installmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 결제 정보 확인 부분 */}
        <h2 className="text-xl font-bold mt-[40px]">결제 정보 확인</h2>
        <hr className="my-6 border-gray-300 mb-8"/>

        <div className="flex-1 mt-5">
          <div className="text-right mb-3">
            <span className="text-xl px-4 py-1 border-red-500 border text-right font-bold">예약 정보 : 17호차 - 10A 좌석</span>
          </div>
          <h3 className="text-xl px-4 py-1 text-right font-bold mb-3">40,000원 / {installmentToString(installment)}</h3>
        </div>
        

        <button
          onClick={() => navigate("/result")}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          <span className="text-xl text-right font-bold">좌석 결제하기</span>
        </button>
      </div>
    </div>
  );
}