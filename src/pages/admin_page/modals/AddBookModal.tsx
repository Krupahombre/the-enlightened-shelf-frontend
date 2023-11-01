import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { SelectedBookItem } from "../components/AddBook";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBook?: SelectedBookItem;
}

export default function AddBookModal({
  isOpen,
  onClose,
  selectedBook,
}: AddBookModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      size="2xl"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={handleClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add Book</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <Input
                {...register("title", { required: true })}
                label="Title"
                variant="bordered"
                defaultValue={selectedBook?.title}
                isReadOnly={!!selectedBook}
              />
              {errors.title && (
                <span className="text-red-500">Title is required</span>
              )}
            </div>
            <div className="mb-2">
              <Input
                {...register("author", { required: true })}
                label="Author"
                variant="bordered"
                defaultValue={selectedBook?.author}
                isReadOnly={!!selectedBook}
              />
              {errors.author && (
                <span className="text-red-500">Author is required</span>
              )}
            </div>
            <div className="mb-2">
              <Textarea
                {...register("description", { required: true })}
                label="Description"
                variant="bordered"
                defaultValue={selectedBook?.description}
              />
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </div>
            <div className="mb-2">
              <Input
                {...register("quantity", { required: true })}
                type="number"
                label="Quantity"
                variant="bordered"
                defaultValue={selectedBook?.quantity.toString() ?? "0"}
              />
              {errors.quantity && (
                <span className="text-red-500">Quantity is required</span>
              )}
            </div>
            <div className="mb-2">
              <Input
                {...register("category", { required: true })}
                label="Category"
                variant="bordered"
              />
              {errors.category && (
                <span className="text-red-500">Category is required</span>
              )}
            </div>
            <div className="mb-2">
              <Input
                {...register("imageLink", { required: true })}
                label="Image Link"
                variant="bordered"
                defaultValue={selectedBook?.imageLink}
                isReadOnly={!!selectedBook}
              />
              {errors.imageLink && (
                <span className="text-red-500">Image Link is required</span>
              )}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Add Book
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
