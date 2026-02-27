import { useState } from "react";
import api from "../api/axios";
import LoginForm from "../components/Login";

const Login = () => {
  const [id, setId] = useState("admin");
  const [pw, setPw] = useState("1234");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await api.post("/api/auth/login", {
        username: id,
        password: pw,
      });

      console.log("서버 응답:", res.data);
      alert("로그인되셨습니다.");
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      console.error("로그인 실패:", err);

      if (!err.response) {
        alert("서버에 연결할 수 없습니다. 서버 상태를 확인해주세요.");
      } else if (err.response.status === 401) {
        alert("비밀번호가 틀렸습니다. 다시 확인해주세요.");
      } else {
        alert("로그인 실패! 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginForm
        id={id}
        pw={pw}
        onChangeId={setId}
        onChangePw={setPw}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    </>
  );
};

export default Login;
