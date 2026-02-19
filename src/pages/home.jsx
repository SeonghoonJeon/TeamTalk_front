import { useState } from "react";
import Sidebar from "../component/SideBar.jsx";
import Chats from "../component/chat.jsx";
import "../css/home.css";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="home-container">
      {/* 왼쪽 사이드바 */}
      <Sidebar onSelectChat={setSelectedChat} />

      {/* 오른쪽 채팅 영역 */}
      <div className="home-chat-area">
        {selectedChat ? (
          <Chats chatId={selectedChat.id} />
        ) : (
          <div className="empty-chat">
            <p>채팅방을 선택하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
