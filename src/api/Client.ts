import axios, { AxiosError } from "axios";
import Auth from "../interfaces/auth/Auth";
import AuthResponse from "../interfaces/auth/AuthResponse";
import ResponseWrapper from "../interfaces/ResponseWrapper";
import AddBook from "../interfaces/book/AddBook";
import BookResponse from "../interfaces/book/BookResponse";
import BookUpdate from "../interfaces/book/BookUpdate";
import CheckoutResponse from "../interfaces/checkout/CheckoutResponse";
import ReviewResponse from "../interfaces/review/ReviewResponse";
import AddReview from "../interfaces/review/AddReview";
import SignUp from "../interfaces/register/SignUp";
import Router from "../pages/Router";
import toast from "react-hot-toast";

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

axios.interceptors.response.use(
  (response) => {
    // toast.success("Success!");
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400: {
          toast.error("Bad request", {
            icon: "❌",
          });
          break;
        }

        case 403: {
          toast.error("Only for admins!", {
            icon: "🤬",
          });
          Router.navigate("/");
          break;
        }

        case 401: {
          break;
        }

        case 404:
          toast.error(data.details, {
            icon: "🚫",
          });
          break;

        case 409:
          break;

        case 422:
          break;

        case 500:
          Router.navigate("/server-error");
          break;
      }
    } else if (error.message === "NETWORK_ERROR" && !error.response) {
      toast.error("Network error - make sure API is running!");
    }

    return Promise.reject(error);
  }
);

const Client = {
  login: (auth: Auth) =>
    axios
      .post<ResponseWrapper<AuthResponse>>(`/auth/login`, auth)
      .then((response) => response.data),
  register: (register: SignUp) =>
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
  getCheckoutsUser: () =>
    axios
      .get<ResponseWrapper<CheckoutResponse[]>>(`checkouts/user`)
      .then((response) => response.data),
  createCheckout: (bookId: number) =>
    axios
      .post<ResponseWrapper<CheckoutResponse>>(`checkouts/book/${bookId}`)
      .then((response) => response.data),
  extendCheckout: (checkout_id: number) =>
    axios
      .put<ResponseWrapper<CheckoutResponse>>(
        `/checkouts/extend-loan/${checkout_id}`
      )
      .then((response) => response.data),
  returnCheckout: (checkout_id: number) =>
    axios
      .delete<ResponseWrapper<CheckoutResponse>>(
        `/checkouts/return/${checkout_id}`
      )
      .then((response) => response.data),
  getReviews: (bookId: number) =>
    axios
      .get<ResponseWrapper<ReviewResponse[]>>(`reviews/${bookId}`)
      .then((response) => response.data),
  addReview: (bookId: number, addReview: AddReview) =>
    axios
      .post<ResponseWrapper<ReviewResponse>>(`reviews/${bookId}`, addReview)
      .then((response) => response.data),
};

export default Client;
