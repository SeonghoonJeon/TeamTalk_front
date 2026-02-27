import { useState } from "react";
import api from "../api/axios";

const Logout = ({ onLogoutSuccess, className = "", children = "로그아웃" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await api.post("/api/auth/logout");
      localStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      onLogoutSuccess?.();
    } catch (err) {
      console.error("로그아웃 실패:", err);
      alert("로그아웃 실패! 서버 연결을 확인하세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button type="button" className={className} onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "처리 중..." : children}
    </button>
  );
};

export default Logout;
