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
import { useForm } from "react-hook-form";

interface ManageBookItemProps {
  bookId: number;
  imgUrl: string;
  title: string;
  author: string;
  description: string;
  quantity: number;
  quantity_available: number;
}

export default function ManageBookItem({
  bookId,
  imgUrl,
  title,
  description,
  author,
  quantity,
  quantity_available,
}: ManageBookItemProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const onSubmit = (data: any) => {
    console.log("Submitted Quantity:", data.quantity);
    // Tutaj możesz dodać logikę do zapisania wartości, np. do serwera itp.
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
          <Button color="warning" onPress={onChangeQuantityModalOpen}>
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
          >
            <ModalContent>
              {(onClose) => (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader className="flex flex-col gap-1">
                    Change Quantity
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      {...register("quantity", {
                        required: true,
                      })}
                      label="New Quantity"
                      variant="bordered"
                      defaultValue={quantity.toString()}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        onClose();
                        reset(); // Wywołanie reset po zamknięciu modala
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      onPress={() => {
                        onClose();
                        reset(); // Wywołanie reset po zamknięciu modala
                      }}
                    >
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
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="danger" onPress={onClose}>
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
