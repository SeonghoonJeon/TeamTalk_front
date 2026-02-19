// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// // import "./index.css";
// import App from "./pages/home.jsx";
// import { SocketProvider } from "./context/SocketContext.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <SocketProvider>
//       <App />
//     </SocketProvider>
//   </StrictMode>
// );
// main.jsx 수정
import "./global.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/home.jsx";
import { SocketProvider } from "./context/SocketContext.jsx"; // 추가

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>
);
