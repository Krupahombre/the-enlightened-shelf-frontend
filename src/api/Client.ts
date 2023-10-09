import axios from "axios";
import Auth from "../interfaces/auth/Auth";
import Register from "../interfaces/register/Register";
import AuthResponse from "../interfaces/auth/AuthResponse";
import ResponseWrapper from "../interfaces/ResponseWrapper";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use((setup) => {
  const token = localStorage.getItem("token");

  if (token) {
    setup.headers.Authorization = `Bearer ${token}`;
  }

  return setup;
});

const Client = {
  login: (auth: Auth) =>
    axios
      .post<ResponseWrapper<AuthResponse>>(`/auth/login`, auth)
      .then((response) => response.data),
  register: (register: Register) =>
    axios
      .post<ResponseWrapper<AuthResponse>>(`/auth/register`, register)
      .then((response) => response.data),
};

export default Client;
