import React from "react";
import { useAuthStore } from "../../app/auth-store";
import Robot from "../../asset/robot.gif";
import "./welcome.scss";
const Welcome = () => {
  const { userInfo } = useAuthStore();

  return (
    <div className="welcome-container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userInfo?.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
