import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import GoogleSearchModal from "../modals/GoogleSearchModal";
import AddBookModal from "../modals/AddBookModal";

export interface SelectedBookItem {
  title: string;
  author: string;
  description: string;
  quantity: number;
  imageLink: string;
}

export default function AddBook() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addByGoogle, setAddByGoogle] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SelectedBookItem>();

  const openGoogleModal = () => {
    setAddByGoogle(true);
    onOpen();
  };

  const openManualModal = () => {
    setAddByGoogle(false);
    onOpen();
  };

  const handleSelectedBook = (book: SelectedBookItem) => {
    setAddByGoogle(false);
    onOpen();
    setSelectedBook(book);
  };

  const handleOnClose = () => {
    onClose();
    setSelectedBook(undefined);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button onPress={openGoogleModal} className="mb-5">
        Find book in Google API
      </Button>
      <Button onPress={openManualModal}>Add book by yourself</Button>

      {addByGoogle ? (
        <GoogleSearchModal
          isOpen={isOpen}
          onClose={handleOnClose}
          onSelect={handleSelectedBook}
        />
      ) : (
        <AddBookModal
          isOpen={isOpen}
          onClose={handleOnClose}
          selectedBook={selectedBook}
        />
      )}
    </div>
  );
}
