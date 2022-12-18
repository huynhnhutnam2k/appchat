/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./App.scss";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Chat from "./pages/Chat/Chat";
import SetAvatar from "./pages/SetAvatar";
import io from "socket.io-client";
const socket = io("http://localhost:8080");
function App() {
  return (
    <>
      <ToastContainer
        containerId="A"
        enableMultiContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        theme="dark"
      />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat socket={socket} />} />
      </Routes>
    </>
  );
}

export default App;
