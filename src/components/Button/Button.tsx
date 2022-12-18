import React from "react";
import "./button.scss";
import IonIcon from "@reacticons/ionicons";
interface IProps {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  small?: boolean;
}
const Button: React.FC<IProps> = (props) => {
  const { text, onClick, small } = props;
  return (
    <>
      {small ? (
        <div className="button small" onClick={onClick}>
          <IonIcon name="send-outline"></IonIcon>
        </div>
      ) : (
        <div className={`button`} onClick={onClick}>
          {text}
        </div>
      )}
    </>
  );
};

export default Button;
