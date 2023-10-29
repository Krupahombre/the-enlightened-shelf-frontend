import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import Client from "../../../api/Client";

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
  const [searchTerm, setSearchTerm] = useState("");

  const searchBook = async () => {
    const response = await Client.searchGoogleApi(searchTerm);

    console.log(response);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Find Book in Google API
        </ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button color="primary" onPress={searchBook} className="mt-3">
            Search
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoogleSearchModal;
