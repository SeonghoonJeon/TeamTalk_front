import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Login = ({ id, pw, onChangeId, onChangePw, onSubmit, isLoading = false }) => {
  const idInputRef = useRef(null);
  const pwInputRef = useRef(null);

  useEffect(() => {
    idInputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      idInputRef.current?.focus();
      return;
    }

    if (!pw) {
      pwInputRef.current?.focus();
      return;
    }

    onSubmit?.();
  };

  return (
    <div>
      <h1>TeamTalk</h1>
      <ul>
        <form onSubmit={handleSubmit}>
          아이디
          <input
            ref={idInputRef}
            value={id}
            placeholder="아이디"
            onChange={(e) => onChangeId?.(e.target.value)}
          />
          <br />
          비밀번호
          <input
            ref={pwInputRef}
            value={pw}
            onChange={(e) => onChangePw?.(e.target.value)}
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </ul>
    </div>
  );
};

export default Login;
