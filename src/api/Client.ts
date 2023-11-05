import axios from "axios";
import Auth from "../interfaces/auth/Auth";
import Register from "../interfaces/register/SignUp";
import AuthResponse from "../interfaces/auth/AuthResponse";
import ResponseWrapper from "../interfaces/ResponseWrapper";
import AddBook from "../interfaces/book/AddBook";
import BookResponse from "../interfaces/book/BookResponse";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_API_URL = import.meta.env.VITE_GOOGLE_API_URL;

axios.interceptors.request.use((setup) => {
  const token = localStorage.getItem("token");

  if (token && setup.url?.indexOf("googleapis") === -1) {
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
  addBook: (addBook: AddBook) =>
    axios
      .post<ResponseWrapper<BookResponse>>(`/books/`, addBook)
      .then((response) => response.data),
  searchGoogleApi: (searchTerm: string, maxResults: number = 15) =>
    axios
      .get(
        `${GOOGLE_API_URL}/volumes?q=${searchTerm}&key=${GOOGLE_API_KEY}&maxResults=${maxResults}`
      )
      .then((response) => response),
};

export default Client;
