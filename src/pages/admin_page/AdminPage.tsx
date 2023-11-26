import { useState } from "react";
import AddBook from "./components/AddBook";
import ManageBook from "./components/ManageBook";
import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import Checkouts from "./components/Checkouts";
import { Navigate } from "react-router-dom";
import UserStorage from "../../storage/UserStorage";
import { toast } from "react-toastify";
import Router from "../Router";

export default function AdminPage() {
  const [manageBookClick, setManageBookClick] = useState(true);
  const [addBookClick, setAddBookClick] = useState(false);
  const [checkoutsClick, setCheckoutsClick] = useState(false);
  const storage = new UserStorage();

  function addBookClickFunction() {
    setManageBookClick(false);
    setAddBookClick(true);
    setCheckoutsClick(false);
  }

  function changeQuantityOfBooksClickFunction() {
    setManageBookClick(true);
    setAddBookClick(false);
    setCheckoutsClick(false);
  }

  function checkoutClickFunction() {
    setManageBookClick(false);
    setAddBookClick(false);
    setCheckoutsClick(true);
  }

  if (!storage.isLoggedIn()) {
    toast.info("Log in to continue");
    return <Navigate to="/login" replace />;
    // Router.navigate("/login");
  } else if (storage.isLoggedIn() && !storage.isAdmin()) {
    toast.error("This page is restricted!");
    return <Navigate to="/" replace />;
    // Router.navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-start py-12 gap-4">
      <h3 className="text-2xl font-bold mb-5">Manage Library</h3>
      <nav className="flex h-5 items-center space-x-4">
        <ButtonGroup radius="none">
          <Button
            color="primary"
            variant={manageBookClick ? "bordered" : "light"}
            onClick={changeQuantityOfBooksClickFunction}
          >
            Manage books
          </Button>
          <Button
            color="primary"
            variant={addBookClick ? "bordered" : "light"}
            onClick={addBookClickFunction}
          >
            Add new book
          </Button>
          <Button
            color="primary"
            variant={checkoutsClick ? "bordered" : "light"}
            onClick={checkoutClickFunction}
          >
            Checkouts
          </Button>
        </ButtonGroup>
      </nav>
      <Divider className="my-4" style={{ width: "75%" }} />
      <div style={{ width: "75%" }}>
        <div>{addBookClick ? <AddBook /> : <></>}</div>
        <div>{manageBookClick ? <ManageBook /> : <></>}</div>
        <div>{checkoutsClick ? <Checkouts /> : <></>}</div>
      </div>
    </div>
  );
}
