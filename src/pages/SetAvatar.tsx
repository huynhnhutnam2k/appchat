/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../asset/loader.gif";
import { useAuthStore } from "../app/auth-store";
import { toast } from "react-toastify";
import avatarList from "../constants/avatarList";
const setAvatar = () => {
  // const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars] = useState<any>(avatarList);

  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(
    undefined
  );
  const { setAvatar, userInfo, loading } = useAuthStore();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (userInfo?._id && selectedAvatar) {
      const data = await setAvatar(avatars[selectedAvatar], userInfo?._id);
      if (data.isSetAvatar) {
        userInfo.isSetAvatar = true;
        userInfo.avatar = data.avatar;
        localStorage &&
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", {
          containerId: "A",
        });
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="container">
          <img src={Loader} alt="" />
        </div>
      ) : (
        <div className="container">
          <div className="container-title">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="container-avatars">
            {avatars.map((avatar: string, index: number) => {
              return (
                <div
                  className={`container-avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="container-button">
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
};

export default setAvatar;
