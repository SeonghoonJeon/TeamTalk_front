import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext.jsx";

export default function Sidebar({ onSelectChat }) {
  const stompClient = useContext(SocketContext);
  // 초기값을 더미 데이터로 설정하여 화면이 비어보이지 않게 함
  const [chats, setChats] = useState([
    { id: "1", name: "일반", text: "환영합니다!", time: "10:00 AM" },
    { id: "2", name: "공지사항", text: "필독 부탁드립니다.", time: "11:30 AM" },
  ]);

  // 초기 채팅 목록 불러오기
  useEffect(() => {
    fetch("http://localhost:8080/api/chat/rooms")
      .then((response) => response.json())
      .then((data) => {
        // 데이터가 배열인 경우에만 상태 업데이트 (에러 방지)
        if (Array.isArray(data)) {
          setChats(data);
        }
      })
      .catch((error) => console.error("Error fetching chats:", error));
  }, []);

  // 실시간 메시지 수신
  useEffect(() => {
    if (!stompClient || !stompClient.connected) return;

    // 채팅방 목록 갱신을 위한 구독 (예: /sub/chat/list)
    const subscription = stompClient.subscribe("/sub/chat/list", (message) => {
      const newMessage = JSON.parse(message.body);

      setChats((prevChats) => {
        const exists = prevChats.find((chat) => chat.id === newMessage.chatId);

        // 기존 채팅방 업데이트
        if (exists) {
          const updatedChats = prevChats.map((chat) =>
            chat.id === newMessage.chatId
              ? {
                  ...chat,
                  text: newMessage.content,
                  time: newMessage.time || "Just now",
                }
              : chat
          );
          // 업데이트된 채팅방을 상단으로 이동
          const target = updatedChats.find(
            (chat) => chat.id === newMessage.chatId
          );
          const others = updatedChats.filter(
            (chat) => chat.id !== newMessage.chatId
          );
          return [target, ...others];
        }

        // 새 채팅방 추가
        return [
          {
            id: newMessage.chatId,
            name: newMessage.chatName || "New Chat",
            text: newMessage.content,
            time: newMessage.time || "Just now",
          },
          ...prevChats,
        ];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient]);

  return (
    <aside className="home-left-sidebar">
      <div className="chat-list">
        <p className="chat-list-title">Chats</p>
      </div>

      <div className="chat-list-items">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="chat-list-item"
            onClick={() => onSelectChat(chat)}
          >
            <div className="chat-info">
              <p className="chat-name">{chat.name}</p>
              <p className="chat-text">{chat.text}</p>
            </div>
            <span className="chat-time">{chat.time}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
