import { useNavigate } from "react-router-dom";

/* API 완성되면 주석 부분 풀기 */

// import { useState } from "react";
// import axios, { AxiosError } from 'axios';

export default function LoginPage() {

  const navigate = useNavigate();

  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLoginInput = async ()=> {

  //   try {
  //     const response = await axios.post("http://localhost:8080/로그인path", {
  //       username: id,
  //       password: password,
  //     });

  //     const token = response.data.token;

  //     // 로컬 스토리지에 저장
  //     localStorage.setItem("jwtToken", token);

  //     // 이후 navigate
  //     // navigate("/dashboard");
  //     alert("로그인 성공");
  //   } catch (error : any) {
  //     const axiosError = error as AxiosError;
  //     alert("로그인 실패: " + axiosError.message);
  //   }

  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-7 rounded shadow w-full max-w-md border-2 border-gray-200">

        <div className="text-center">
        <h1 className="text-2xl font-bold mt-2 mb-4">벤치 마크 로그인</h1>
        </div>

        <div className="text-center mb-10">
        <h2 className="text-lg font-bold text-gray-400 mb-4">아이디 : bench01, 비밀번호 : password01</h2>
        </div>
        
        {/* 아이디 입력 */}
        <div className="flex justify-center w-full mb-4">
          <input
            type="text"
            name="id"
            placeholder="아이디* : bench01"
            className="w-full max-w-md h-12 rounded p-4 border-2 border-gray-200"
          />
        </div>

        {/* 패스워드 입력 */}
        <div className="flex justify-center w-full mb-4">
          <input
            type="password"
            name="password"
            placeholder="패스워드* : password01"
            className="w-full max-w-md h-12 rounded p-4 border-2 border-gray-200"
          />
        </div>

        {/* 로그인 버튼 */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded w-full max-w-md"
            onClick={() => navigate("/reserve")}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}