import { useState } from "react";
import AddBook from "./components/AddBook";
import ManageBook from "./components/ManageBook";
import { Button, ButtonGroup, Divider } from "@nextui-org/react";

export default function AdminPage() {
  const [manageBookClick, setManageBookClick] = useState(false);
  const [addBookClick, setAddBookClick] = useState(true);

  function addBookClickFunction() {
    setManageBookClick(false);
    setAddBookClick(true);
  }

  function changeQuantityOfBooksClickFunction() {
    setManageBookClick(true);
    setAddBookClick(false);
  }

  return (
    <div className="flex flex-col items-center justify-start py-12 gap-4">
      <h3 className="text-2xl font-bold mb-5">Manage Library</h3>
      <nav className="flex h-5 items-center space-x-4">
        <ButtonGroup radius="none">
          <Button
            color="primary"
            variant={addBookClick ? "bordered" : "light"}
            onClick={addBookClickFunction}
          >
            Add new book
          </Button>
          <Button
            color="primary"
            variant={manageBookClick ? "bordered" : "light"}
            onClick={changeQuantityOfBooksClickFunction}
          >
            Change quantity
          </Button>
        </ButtonGroup>
      </nav>
      <Divider className="my-4" style={{ width: "75%" }} />
      <div style={{ width: "75%" }}>
        <div>{addBookClick ? <AddBook /> : <></>}</div>
        <div>{manageBookClick ? <ManageBook /> : <></>}</div>
      </div>
    </div>
  );
}
