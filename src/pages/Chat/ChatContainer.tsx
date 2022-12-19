/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import Logout from "../../components/Logout/Logout";
import "./chat.scss";
import { useMessageStore } from "../../app/message-store";
import { useAuthStore } from "../../app/auth-store";
import ChatInput from "./ChatInput";
interface IProps {
  currentChat: any;
  socket: any;
}
interface IMessage {
  fromSelf: boolean;
  message: string;
}
const ChatContainer: React.FC<IProps> = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState<IMessage | any>([]);
  const { getMessage, addMessage, loading } = useMessageStore();
  const { userInfo } = useAuthStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const assignMessage = async () => {
      const data = await getMessage({
        from: userInfo._id,
        to: currentChat._id,
      });
      setMessages(data);
    };
    assignMessage();
  }, [currentChat]);
  const handleSendMessage = async (msg: string) => {
    const data = {
      to: currentChat._id,
      from: userInfo._id,
      message: msg,
    };
    await socket.emit("send-message", data);
    addMessage(data);

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    socket.on("receive-msg", (data: string) => {
      console.log("ok");
      setMessages((list: IMessage[]) => [...list, data]);
    });
  }, [socket]);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container__message">
      <div className="chat-container__header">
        <div className="chat-container__userdetail">
          <div className="chat-container__userdetail__avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatar}`}
              alt=""
            />
          </div>
          <div className="chat-container__userdetail__name">
            {currentChat.username}
          </div>
        </div>
        <Logout socket={socket}></Logout>
      </div>
      <div className="chat-messages">
        {loading ? (
          <div className="center">
            <div className="loading"></div>
          </div>
        ) : (
          messages?.map((message: IMessage) => {
            return (
              <div ref={scrollRef}>
                <div
                  className={`chat-message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ChatInput handleSendMessage={handleSendMessage}></ChatInput>
    </div>
  );
};

export default ChatContainer;
