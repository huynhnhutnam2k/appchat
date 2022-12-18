import React, { useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";
import IonIcon from "@reacticons/ionicons";
import Button from "../../components/Button/Button";
interface IProps {
  handleSendMessage: any;
}
const ChatInput: React.FC<IProps> = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    let mess = message;
    mess += emojiObject.emoji;
    setMessage(mess);
  };
  return (
    <div className="chat-input">
      <div className="chat-input__emoji">
        <div className="chat-input__emoji__content">
          <IonIcon
            name="happy-outline"
            onClick={handleEmojiPickerhideShow}
          ></IonIcon>
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <div className="chat-input__content">
        <input
          type="text"
          placeholder="Write something...."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          value={message}
        />
        <Button
          small={true}
          onClick={() => {
            handleSendMessage(message);
            setMessage("");
          }}
        ></Button>
      </div>
    </div>
  );
};

export default ChatInput;
