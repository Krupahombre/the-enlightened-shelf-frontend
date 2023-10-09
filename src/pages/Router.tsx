import { createBrowserRouter } from "react-router-dom";
import Header from "../components/navbar/Header";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default Router;
