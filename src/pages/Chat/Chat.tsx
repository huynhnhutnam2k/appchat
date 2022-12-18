/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../app/auth-store";
import { useNavigate } from "react-router";
import "./chat.scss";
import Contacts from "./Contacts";
import Welcome from "../../components/Welcome/Welcome";
import ChatContainer from "./ChatContainer";
interface IProps {
  socket: any;
}
const Chat: React.FC<IProps> = ({ socket }) => {
  const { userInfo, getAllUser, listUser } = useAuthStore();
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    if (!userInfo?.isSetAvatar) {
      navigate("/setAvatar");
    } else {
      getAllUser();
    }
  }, []);
  useEffect(() => {
    socket.emit("add-user", userInfo?._id);
  }, [userInfo]);
  const changeChat = (chat: any) => {
    setCurrentChat(chat);
  };
  return (
    <div className="container">
      <div className="chat-container">
        <Contacts contactList={listUser} changeChat={changeChat}></Contacts>
        {currentChat === undefined ? (
          <Welcome></Welcome>
        ) : (
          <ChatContainer
            currentChat={currentChat}
            socket={socket}
          ></ChatContainer>
        )}
      </div>
    </div>
  );
};

export default Chat;
