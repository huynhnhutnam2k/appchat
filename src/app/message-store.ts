import axios from "axios";
import create from "zustand";
import url from "../constants/url";

interface IMessage {
  _id: string;
  users: [from: string, to: string];
  sender: boolean;
  message: string;
}
interface ITypeMessage {
  from: string;
  to: string;
}
interface ISendMessage extends ITypeMessage {
  message: string;
}
interface MessageState {
  loading: boolean;
  error: boolean;
  msg: string;
  success: boolean;
  listMessage: IMessage[] | [];
  getMessage: (props: ITypeMessage) => any;
  addMessage: (props: ISendMessage) => void;
}

export const useMessageStore = create<MessageState>()((set) => ({
  loading: false,
  error: false,
  msg: "",
  success: false,
  listMessage: [],
  getMessage: async ({ from, to }) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${url}message/get`, {
        from,
        to,
      });
      set({ listMessage: res.data, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false, error: true });
    }
  },
  addMessage: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post(url + "message/add", data);
      set({ success: true, loading: false, msg: res.data });
    } catch (error) {
      set({ loading: false, error: true });
    }
  },
}));
