import axios from "axios";
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("Url:", `${import.meta.env.VITE_BACKEND_URL}`);

export const login = async (data: { email: string; password: string }) => {
  return api.post("/api/users/login", data);
};
