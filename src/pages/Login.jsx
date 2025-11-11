import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("admin");
  const [pw, setPw] = useState("1234");

  const pwInputRef = useRef(null);
  const idInputRef = useRef(null);

  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    switch (true) {
      case !id:
        return idInputRef.current?.focus();
      case !pw:
        return pwInputRef.current?.focus();
    }
    //http://localhost:8080/
    try {
      const res = await axios.post("/api/login", {
        id,
        pw,
      });
      console.log("서버 응답:", res.data);
      alert("로그인되셨습니다.");
      // localStorage.setItem("token", res.data.token);
      // navigate("/home");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인 실패! 서버 연결을 확인하세요.");
    }
  };

  return (
    <div>
      <h1>TeamTalk</h1>
      <ul>
        <form onSubmit={handleLogin}>
          아이디
          <input
            ref={idInputRef}
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          비밀번호
          <input
            ref={pwInputRef}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            type="password"
            placeholder="비밀번호"
          />
          <br />
          <button type="button">아이디 찾기</button>
          <button type="button">비밀번호 찾기</button>
          <Link to="/signup">
            <button type="button">회원가입</button>
          </Link>
          <br />
          <button type="submit">로그인</button>
        </form>
      </ul>
    </div>
  );
};

export default Login;
