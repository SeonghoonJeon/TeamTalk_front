import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    // 기본 입력값 검증: 누락된 필드가 있으면 포커스를 이동한다.
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

    // 비밀번호 확인 체크
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

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 환경변수로 API 기본 주소를 지정하고, 없으면 상대 경로로 요청한다.
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          id,
          email,
          password: pw,
        }),
      });

      // 실패 응답은 에러로 처리해 사용자에게 메시지를 노출한다.
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "회원가입에 실패했습니다.");
      }

      alert("회원가입이 완료되었습니다.");
      console.log("회원가입 완료");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "회원가입 처리 중 오류가 발생했습니다.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }

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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "회원가입 중..." : "회원가입"}
          </button>
          <Link to="/">
            <button type="button">로그인으로</button>
          </Link>
        </form>
        {submitError ? <p role="alert">{submitError}</p> : null}
      </ul>
    </div>
  );
};

export default Signup;
