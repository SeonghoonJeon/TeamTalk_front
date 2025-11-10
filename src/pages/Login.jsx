import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const pwInputRef = useRef(null);
  const idInputRef = useRef(null);

  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!id || !pw) {
      alert("내용을 다 입력하세요.");
      if (!id && idInputRef.current) {
        idInputRef.current.focus();
      }
      if (!pw && pwInputRef.current) {
        pwInputRef.current.focus();
      }
      return;
    }

    console.log("로그인 시도: ", id, pw);
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
          <button>아이디 찾기</button>
          <button>비밀번호 찾기</button>
          <Link to="./Signup">
            <button>회원가입</button>
          </Link>
          <br />
          <button type="submit">로그인</button>
        </form>
      </ul>
    </div>
  );
};

export default Login;
