import axios from "axios";
const myNumber = import.meta.env.VITE_MY_WA_NUMBER
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const getChats = async () => {
    const { data } = await API.get(`/api/chats?myNumber=${myNumber}`);
    return data;
  }
export const getMessages = (wa_id) => API.get(`/api/messages/${wa_id}`);
export const sendMessage = (data) => API.post('/webhook', data);
