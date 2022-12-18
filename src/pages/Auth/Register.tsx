/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
// import Logo from '../../asset/logo.png'
import Logo from "../../asset/logo.png";
import Input from "../../components/Input/Input";
import "./index.scss";
import Button from "../../components/Button/Button";
import { Id, toast } from "react-toastify";
import { useAuthStore } from "../../app/auth-store";
import { useNavigate } from "react-router";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { loading, error, register, success, msg } = useAuthStore();
  const navigate = useNavigate();
  const validate = (password: string, confirmPassword: string): boolean => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };
  const handleRegister = async () => {
    if (!validate(password, confirm)) {
      toast.error("Password and confirm password not match", {
        containerId: "A",
      });
    } else {
      const user = {
        email,
        password,
        username,
      };
      register(user);
    }
  };
  const toastId = useRef<Id>();
  useEffect(() => {
    if (success && !loading) {
      toast.dismiss(toastId.current);
      toast.success(msg, { containerId: "A" });
    } else if (error && !loading) {
      toast.dismiss(toastId.current);
      toast.error(msg, { containerId: "A" });
    } else if (loading) {
      toastId.current = toast.info("Wait a minutes...", { containerId: "A" });
    }
  }, [success, error, loading]);
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
          name="username"
          placeHolder="Username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
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
        <Input
          name="confirm"
          type="password"
          placeHolder="Confirm password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirm(e.target.value);
          }}
        ></Input>
        <Button text="Register" onClick={handleRegister}></Button>
        <div className="redirect">
          ALREADY HAVE AN ACCOUNT ?{" "}
          <span onClick={() => navigate("/login")}>LOGIN.</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
