import { useState } from "react";

const Signup = () => {
  //받아들일 정보들
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    tel: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 정보:", formData);
    // 회원가입 처리 로직 추가 (ex. API 호출)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-md"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-md"
        />
        <br/>
        <input
          type="tel"
          name="tel"
          placeholder="전화번호"
          value={formData.tel}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-md"
        />
        <br />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Signup;
