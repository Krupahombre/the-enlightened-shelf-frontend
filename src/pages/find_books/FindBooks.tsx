import { useState, useEffect } from "react";
import Client from "../../api/Client";
import FindBookItem from "./components/FindBookItem";
import BookResponse from "../../interfaces/book/BookResponse";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";

export default function FindBooks() {
  const [bookList, setBookList] = useState<BookResponse[]>([]);
  const [showBookList, setShowBookList] = useState<BookResponse[]>([]);

  const fetch = async () => {
    try {
      const books = await Client.getBooks();
      setBookList(books.data);
      setShowBookList(books.data);
    } catch (error) {
      console.error("An error occurred while fetching books:", error);
    }
  };

  useEffect(() => {
    fetch().catch(console.error);
  }, []);

  const filterBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setShowBookList(bookList);
      return;
    }
    if (e.target.value.length < 4) return;
    const result = bookList.filter(
      (arg) =>
        arg.title.includes(e.target.value) ||
        arg.author.includes(e.target.value)
    );
    setShowBookList(result);
  };

  // const sortBooks = () => {};

  return (
    <div className="flex flex-col items-center justify-start py-12 gap-12">
      <h3 className="text-2xl font-bold">
        In our library, everyone finds something for themselves!
      </h3>
      <div className="flex flex-row items-center justify-start gap-4">
        <Input
          label="Search ..."
          variant="bordered"
          className="max-w-xs"
          onChange={filterBooks}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Sort By</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">A -{">"} Z</DropdownItem>
            <DropdownItem key="copy">Z -{">"} A</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex flex-col p-x-8 w-4/5 lg:w-3/5 mx-auto gap-6">
        {showBookList.map((book, index) => (
          <FindBookItem
            key={index}
            bookId={book.id}
            imgUrl={book.img}
            title={book.title}
            author={book.author}
            description={book.description}
          />
        ))}
      </div>
    </div>
  );
}
