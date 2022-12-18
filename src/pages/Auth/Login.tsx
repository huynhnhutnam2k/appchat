/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Logo from "../../asset/logo.png";
import Button from "../../components/Button/Button";
import { useAuthStore } from "../../app/auth-store";
import "./index.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, login, error } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const user = {
      email,
      password,
    };
    login(user);
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  useEffect(() => {
    if (error) {
      toast.error("Email or password not valid", { containerId: "A" });
    }
  }, [error]);
  return (
    <div className="form">
      <div className="form-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="form-content">
        <Input
          name="email"
          placeHolder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Input
          name="password"
          type="password"
          placeHolder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        ></Input>

        <Button text="Log in" onClick={handleLogin}></Button>
        <div className="redirect">
          DON'T HAVE AN ACCOUNT ?{" "}
          <span onClick={() => navigate("/register")}>CREATE ONE.</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
