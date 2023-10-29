import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface GoogleSearchModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

const GoogleSearchModal: React.FC<GoogleSearchModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Find Book in Google API
        </ModalHeader>
        <ModalBody>
          {/* Place your form or content for finding book in Google API here */}
          <p>Replace this with your book search form or content</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoogleSearchModal;
