import React from "react";
import IonIcon from "@reacticons/ionicons";
import "./logout.scss";
import { useAuthStore } from "../../app/auth-store";
interface IProps {
  socket?: any;
  onClick?: any;
}
const Logout: React.FC<IProps> = ({ socket, onClick }) => {
  const { logoutAction } = useAuthStore();
  const handleLogout = () => {
    logoutAction();
    socket.emit("disconnect");
  };
  return (
    <div className="logout" onClick={handleLogout}>
      <IonIcon name="power-outline"></IonIcon>
    </div>
  );
};

export default Logout;
