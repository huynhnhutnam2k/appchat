import axios from "axios";
import { ILogin, IResgister, IUserInfo } from "../../src/interface/Global";
import create from "zustand";
export const userInfo: any = localStorage.getItem("userInfo")
  ? // @ts-ignore
    JSON.parse(localStorage.getItem("userInfo"))
  : null;

interface AuthState {
  userInfo: IUserInfo;
  loading: boolean;
  error: boolean;
  msg: string;
  success: boolean;
  listUser: IUserInfo[] | [];
  getAllUser: () => void;
  register: (user: IResgister) => void;
  login: (user: ILogin) => void;
  setAvatar: (avatar: string, id: string) => any;
  logoutAction: () => void;
}
export const useAuthStore = create<AuthState>()((set) => ({
  userInfo: userInfo,
  loading: false,
  error: false,
  msg: "",
  success: false,
  listUser: [],
  getAllUser: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("user");
      set({ loading: false, listUser: res.data });
    } catch (error) {
      set({ error: true, loading: false });
    }
  },
  async register(user) {
    set({ loading: true });
    try {
      const res = await axios.post("user/register", user);
      set({ success: true, msg: res.data, loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false, error: true });
    }
  },
  async login(user) {
    set({ loading: true });
    try {
      const res = await axios.post("user/login", user);
      localStorage &&
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      set({ userInfo: res.data, loading: false });
    } catch (error) {
      set({ loading: false, error: true });
    }
  },
  setAvatar: async (avatar, id) => {
    try {
      const { data }: any = await axios.put("user/setAvatar/" + id, {
        image: avatar,
      });
      return {
        isSetAvatar: data.isSetAvatar,
        avatar: data.avatar,
      };
    } catch (error) {
      set({ loading: false, error: true });
    }
  },
  logoutAction() {
    localStorage.getItem("userInfo") && localStorage.removeItem("userInfo");
    window.location.href = "/login";
  },
}));
