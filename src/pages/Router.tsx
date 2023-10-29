import { createBrowserRouter } from "react-router-dom";
import Header from "../components/navbar/Header";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import FindBooks from "./find_books/FindBooks";
import AdminPage from "./admin_page/AdminPage";
import YourShelf from "./your_shelf/YourShelf";

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
      {
        path: "/find-books",
        element: <FindBooks />,
      },
      {
        path: "/admin-page",
        element: <AdminPage />,
      },
      {
        path: "/your-shelf",
        element: <YourShelf />,
      },
    ],
  },
]);

export default Router;
