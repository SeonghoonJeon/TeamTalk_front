import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const nameInputRef = useRef(null);
  const idInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const pwConfirmInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !id || !email || !pw || !pwConfirm) {
      alert("내용을 다 입력하세요.");
      if (!name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (!id && idInputRef.current) {
        idInputRef.current.focus();
      } else if (!email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (!pw && pwInputRef.current) {
        pwInputRef.current.focus();
      } else if (!pwConfirm && pwConfirmInputRef.current) {
        pwConfirmInputRef.current.focus();
      }
      return;
    }

    if (pw !== pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      if (pwConfirmInputRef.current) {
        pwConfirmInputRef.current.focus();
      }
      return;
    }

    console.log("회원가입 시도:", {
      name,
      id,
      email,
      pw,
    });
  };

  return (
    <div>
      <h1>TeamTalk</h1>
      <ul>
        <form onSubmit={handleSignup}>
          이름
          <input
            ref={nameInputRef}
            value={name}
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          아이디
          <input
            ref={idInputRef}
            value={id}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          이메일
          <input
            ref={emailInputRef}
            value={email}
            placeholder="이메일"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
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
          비밀번호 확인
          <input
            ref={pwConfirmInputRef}
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
            type="password"
            placeholder="비밀번호 확인"
          />
          <br />
          <button type="submit">회원가입</button>
          <Link to="/">
            <button type="button">로그인으로</button>
          </Link>
        </form>
      </ul>
    </div>
  );
};

export default Signup;
