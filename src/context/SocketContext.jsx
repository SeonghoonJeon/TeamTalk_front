// SocketContext.jsx
import { createContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // 서버 endpoint
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        setStompClient(client);
        console.log("STOMP 연결 성공");
      },
      (error) => {
        console.error("STOMP 연결 실패:", error);
      }
    );

    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log("STOMP 연결 종료");
        });
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
}
