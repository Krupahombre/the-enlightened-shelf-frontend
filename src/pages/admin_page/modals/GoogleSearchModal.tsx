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
import BookResult from "../models/BookResult";
import { SelectedBookItem } from "../components/AddBook";

interface GoogleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (book: SelectedBookItem) => void;
}

export interface GoogleBooksVolumeInfo {
  description: string;
  title: string;
  authors: string[];
  categories: string[];
  imageLinks: {
    smallThumbnail: string;
  };
}

export interface GoogleBooksItem {
  volumeInfo: GoogleBooksVolumeInfo;
}

const GoogleSearchModal: React.FC<GoogleSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<GoogleBooksItem[]>([]);

  const handleClose = () => {
    setSearchTerm("");
    setSearchResults([]);
    onClose();
  };

  const searchBook = async () => {
    const response = await Client.searchGoogleApi(searchTerm);

    console.log(response.data.items);
    setSearchResults(response.data.items as GoogleBooksItem[]);
  };

  const handleAddRequest = (book: GoogleBooksItem) => {
    const selectedBook: SelectedBookItem = {
      author: book.volumeInfo.authors?.[0] ?? "",
      title: book.volumeInfo.title,
      description: book.volumeInfo.description ?? "",
      quantity: 0,
      category: book.volumeInfo.categories?.[0] ?? "",
      imageLink: book.volumeInfo.imageLinks.smallThumbnail,
    };

    onSelect(selectedBook);
  };

  return (
    <Modal size="xl" backdrop="blur" isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent style={{ maxHeight: "80vh", overflowY: "auto" }}>
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
          {searchResults.map((result, index) => {
            const smallThumbnail = result.volumeInfo.imageLinks?.smallThumbnail;
            if (smallThumbnail) {
              return (
                <BookResult
                  key={index}
                  title={result.volumeInfo.title}
                  authors={result.volumeInfo.authors || []}
                  imageLink={smallThumbnail}
                  onAddRequest={() => handleAddRequest(result)}
                />
              );
            }
            return null;
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoogleSearchModal;
