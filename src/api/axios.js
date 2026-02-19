// src/api/axios.js  (새 파일)
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 개발 단계에선 명시해두면 디버깅이 쉬움
  withCredentials: true,            // ✅ JSESSIONID 쿠키 주고받기
});

export default api;