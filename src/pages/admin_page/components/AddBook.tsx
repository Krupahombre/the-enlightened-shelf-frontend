import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import GoogleSearchModal from "../modals/GoogleSearchModal";
import AddBookModal from "../modals/AddBookModal";

export default function AddBook() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [addByGoogle, setAddByGoogle] = useState(false);

  const openGoogleModal = () => {
    setAddByGoogle(true);
    onOpen();
  };

  const openManualModal = () => {
    setAddByGoogle(false);
    onOpen();
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
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      ) : (
        <AddBookModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          //   addByGoogle={addByGoogle}
        />
      )}
    </div>
  );
}
