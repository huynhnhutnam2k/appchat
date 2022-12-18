import React, { useState } from "react";
import Logo from "../../asset/logo.png";
import { useAuthStore } from "../../app/auth-store";
import "./chat.scss";
interface IProps {
  contactList: any;
  changeChat: any;
}
const Contacts: React.FC<IProps> = ({ contactList, changeChat }) => {
  const { userInfo } = useAuthStore();
  const [currentSelected, setCurrentSelected] = useState<any | number>(
    undefined
  );
  return (
    <div className="chat-contact">
      <div className="chat-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="chat-contact__list">
        {contactList
          .filter((item: any) => item._id !== userInfo._id)
          .map((contact: any, index: number) => (
            <div
              className={`chat-contact__item ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => {
                setCurrentSelected(index);
                changeChat(contact);
              }}
            >
              <div className="chat-contact__item__avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatar}`}
                  alt=""
                />
              </div>
              <div className="chat-contact__item__username">
                {contact.username}
              </div>
            </div>
          ))}
      </div>
      <div className="chat-current__user">
        <div className="chat-current__avatar">
          <img src={`data:image/svg+xml;base64,${userInfo?.avatar}`} alt="" />
        </div>
        <div className="chat-current__username">{userInfo?.username}</div>
      </div>
    </div>
  );
};

export default Contacts;
