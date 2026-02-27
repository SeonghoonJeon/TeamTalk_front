<<<<<<< HEAD
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// // import "./index.css";
// import App from "./pages/home.jsx";
// import { SocketProvider } from "./context/SocketContext.jsx";
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
>>>>>>> 10732dc45c687f8934b16f1697c6f69a3540316a

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
