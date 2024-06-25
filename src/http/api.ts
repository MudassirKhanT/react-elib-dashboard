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

export const register = async (data: { name: string; email: string; password: string }) => {
  return api.post("/api/users/register", data);
};

export const getBooks = async () => {
  return api.get("/api/books");
};
