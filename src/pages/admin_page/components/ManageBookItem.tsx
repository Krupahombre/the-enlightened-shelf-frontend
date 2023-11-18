import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRef, useState } from "react";

interface ManageBookItemProps {
  bookId: number;
  imgUrl: string;
  title: string;
  author: string;
  description: string;
  quantity: number;
  quantity_available: number;
  onDelete: (bookId: number) => void;
  onChange: (
    bookId: number,
    newQuantityNumber: number,
    newQuantityAvailableNumber: number
  ) => void;
}

export default function ManageBookItem({
  bookId,
  imgUrl,
  title,
  description,
  author,
  quantity,
  quantity_available,
  onDelete,
  onChange,
}: ManageBookItemProps) {
  const inputQuantityRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(true);
  const [isQUantityValid, setIsQuantityValid] = useState(true);

  const {
    isOpen: isChangeQuantityModalOpen,
    onOpen: onChangeQuantityModalOpen,
    onOpenChange: onChangeQuantityModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteBookModalOpen,
    onOpen: onDeleteBookModalOpen,
    onOpenChange: onDeleteBookModalOpenChange,
  } = useDisclosure();

  const onSubmitQuantity = (
    e: React.FormEvent<HTMLFormElement>,
    onClose: any
  ) => {
    e.preventDefault();
    if (!inputQuantityRef.current) {
      return;
    }
    if (
      isNaN(parseInt(inputQuantityRef.current?.value)) ||
      parseInt(inputQuantityRef.current?.value) <= 0
    ) {
      setIsValid(false);
      return;
    }
    const newQuantity = parseInt(inputQuantityRef.current?.value);
    console.log("Submitted Quantity:", newQuantity);

    let newOverallQUantity: number;
    let newOverallAvailableQuantity: number;

    if (quantity === quantity_available) {
      newOverallQUantity = newQuantity;
      newOverallAvailableQuantity = newQuantity;
    } else {
      const quantityDifference = quantity - newQuantity;

      if (
        quantityDifference > 0 &&
        quantity_available - quantityDifference < 0
      ) {
        setIsQuantityValid(false);
        return;
      } else if (
        quantityDifference > 0 &&
        quantity_available - quantityDifference >= 0
      ) {
        newOverallQUantity = newQuantity;
        newOverallAvailableQuantity = quantity_available - quantityDifference;
      } else if (quantityDifference < 0) {
        newOverallQUantity = newQuantity;
        newOverallAvailableQuantity =
          quantity_available + Math.abs(quantityDifference);
      }
    }

    setIsValid(true);
    setIsQuantityValid(true);
    onChange(bookId, newOverallQUantity, newOverallAvailableQuantity);
    onClose();
  };

  const onSubmitDelete = async (data: any) => {
    console.log("Book to delete:", data.bookId);

    onDelete(bookId);
  };

  return (
    <div className="flex p-6 rounded-lg border-2 h-96">
      <img src={imgUrl} alt="" className="h-full rounded-md w-1/4" />
      <div className="flex flex-col pl-6 w-full">
        <h1 className="text-xl font-bold">{title}</h1>
        <h3 className="text-lg">{author}</h3>
        <p className="mt-7">Book available: {quantity_available}</p>
        <p className="">Total book quantity: {quantity}</p>
        {/* <ScrollShadow hideScrollBar className="h-80 overflow-y-scroll">
          <p>{description}</p>
        </ScrollShadow> */}
        <div className="h-full"></div>
        <div className="flex justify-end space-x-2">
          <Button
            color="warning"
            variant="ghost"
            onPress={onChangeQuantityModalOpen}
          >
            Change Quantity
          </Button>
          <Button
            color="danger"
            variant="ghost"
            onPress={onDeleteBookModalOpen}
          >
            Delete Book
          </Button>
          <Modal
            isOpen={isChangeQuantityModalOpen}
            onOpenChange={onChangeQuantityModalOpenChange}
            backdrop="blur"
          >
            <ModalContent>
              {(onClose) => (
                <form onSubmit={(e) => onSubmitQuantity(e, onClose)}>
                  <ModalHeader className="flex flex-col gap-1">
                    Change Quantity
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      ref={inputQuantityRef}
                      label="New Quantity"
                      variant="bordered"
                      isInvalid={!isValid || !isQUantityValid}
                      errorMessage={
                        (!isValid &&
                          "Please enter a valid number greater than 0!") ||
                        (!isQUantityValid &&
                          "Not enough books to change quantity - books available:  " +
                            quantity_available)
                      }
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        onClose();
                      }}
                    >
                      Close
                    </Button>
                    <Button type="submit" color="success">
                      Save Changes
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalContent>
          </Modal>

          <Modal
            isOpen={isDeleteBookModalOpen}
            onOpenChange={onDeleteBookModalOpenChange}
            backdrop="blur"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Delete Book
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <div>You are going to delete book:</div>
                      <div className="font-bold">"{title}"</div>
                      <div className="mt-3">Are You sure?</div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        onClose();
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        onSubmitDelete({ bookId });
                        onClose();
                      }}
                    >
                      Confirm Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
