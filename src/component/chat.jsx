// import { useState, useEffect } from "react";
// import "../chat.css";
// import SockJS from "sockjs-client";
// import Stomp, { client } from "stompjs";

// function Chats() {
//   //수신된 메시지 저장
//   const [messages, setMessages] = useState([]);
//   //전송된 메시지 저장
//   const [inputMessage, setInputMessage] = useState("");
//   //WebSocket 연결 객체 상태 저장
//   const [stompClient, setStompClient] = useState(null);

//   //랜더링 시 WebSocket 연결 (최초 1회)
//   useEffect(() => {
//     const socket = new SockJS("서버주소");
//     const stompClient = Stomp.over(socket);

//     console.log("WebSocket 연결 시도");

//     stompClient.connect(
//       {},
//       () => {
//         console.log("WebSocket 연결 성공");
//         setStompClient(stompClient);
//         stompClient.subscribe("/sub/chat", (message) => {
//           console.log(message);
//           setMessages((prev) => [...prev, message.body]);
//         });
//       },
//       (error) => {
//         console.log("WebSocket 연결 실패");
//       }
//     );
//   }, []);

//   //메시지 전송 함수
//   const send = () => {
//     if (stompClient && inputMessage.trim()) {
//       stompClient.send("/pub/chat", {}, inputMessage);
//       setInputMessage("");
//     }
//   };
// }

import { useState, useEffect, useContext } from "react";
// import "../chat.css";
import { SocketContext } from "../context/SocketContext";

function Chats({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const stompClient = useContext(SocketContext);

  useEffect(() => {
    // 소켓이 연결되지 않았거나 chatId가 없으면 구독하지 않음
    if (!stompClient || !stompClient.connected || !chatId) return;

    const subscription = stompClient.subscribe(
      `/sub/chat/${chatId}`,
      (message) => {
        const parsed = JSON.parse(message.body);
        setMessages((prev) => [...prev, parsed]);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [chatId, stompClient]);

  const send = () => {
    if (!stompClient || !inputMessage.trim()) return;

    stompClient.send(
      "/pub/chat",
      {},
      JSON.stringify({
        chatId,
        content: inputMessage,
        sender: "me",
        time: new Date().toISOString(),
      })
    );

    setInputMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            <strong>{msg.sender}</strong>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={send}>전송</button>
      </div>
    </div>
  );
}

export default Chats;
