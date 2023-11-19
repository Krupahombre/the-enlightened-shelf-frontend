import axios from "axios";
import Auth from "../interfaces/auth/Auth";
import Register from "../interfaces/register/SignUp";
import AuthResponse from "../interfaces/auth/AuthResponse";
import ResponseWrapper from "../interfaces/ResponseWrapper";
import AddBook from "../interfaces/book/AddBook";
import BookResponse from "../interfaces/book/BookResponse";
import BookUpdate from "../interfaces/book/BookUpdate";
import CheckoutResponse from "../interfaces/checkout/CheckoutResponse";

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
  getBooks: () =>
    axios
      .get<ResponseWrapper<BookResponse[]>>(`books/`)
      .then((response) => response.data),
  getBook: (bookId: number) =>
    axios
      .get<ResponseWrapper<BookResponse>>(`books/book/${bookId}`)
      .then((response) => response.data),
  deleteBook: (bookId: number) =>
    axios
      .delete<ResponseWrapper<BookResponse>>(`books/book/${bookId}`)
      .then((response) => response.data),
  updateBook: (bookId: number, updateBook: BookUpdate) =>
    axios
      .put<ResponseWrapper<BookResponse>>(`books/book/${bookId}`, updateBook)
      .then((response) => response.data),
  searchGoogleApi: (searchTerm: string, maxResults: number = 15) =>
    axios
      .get(
        `${GOOGLE_API_URL}/volumes?q=${searchTerm}&key=${GOOGLE_API_KEY}&maxResults=${maxResults}`
      )
      .then((response) => response),
  getCheckouts: () =>
    axios
      .get<ResponseWrapper<CheckoutResponse[]>>(`checkouts/`)
      .then((response) => response.data),
};

export default Client;
