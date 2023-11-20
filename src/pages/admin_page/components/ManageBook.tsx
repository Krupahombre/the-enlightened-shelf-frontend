import { useState, useEffect } from "react";
import Client from "../../../api/Client";
import BookResponse from "../../../interfaces/book/BookResponse";
import ManageBookItem from "./ManageBookItem";
import BookUpdate from "../../../interfaces/book/BookUpdate";
import { Input } from "@nextui-org/react";

export default function ManageBook() {
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

  const handleDelete = async (bookId: number) => {
    await Client.deleteBook(bookId);

    setBookList((books) => books.filter((x) => x.id !== bookId));
  };

  const handeQuantityChange = async (
    bookId: number,
    newQuantityNumber: number,
    newQuantityAvailableNumber: number
  ) => {
    const book = bookList.find((x) => x.id === bookId);
    if (!book) {
      return;
    }

    const bookData: BookUpdate = {
      quantity: newQuantityNumber,
      quantity_available: newQuantityAvailableNumber,
    };

    await Client.updateBook(bookId, bookData);

    book.quantity = newQuantityNumber;
    book.quantity_available = newQuantityAvailableNumber;

    setBookList([...bookList]);
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

  return (
    <div className="flex flex-col p-x-8 w-4/5 lg:w-4/5 mx-auto gap-6">
      <div className="flex flex-col items-center">
        <Input
          label="Search ..."
          variant="bordered"
          className="max-w-xs"
          onChange={filterBooks}
        />
      </div>
      {showBookList.map((book, index) => (
        <ManageBookItem
          key={index}
          bookId={book.id}
          imgUrl={book.img}
          title={book.title}
          author={book.author}
          description={book.description}
          quantity={book.quantity}
          quantity_available={book.quantity_available}
          onDelete={handleDelete}
          onChange={handeQuantityChange}
        />
      ))}
    </div>
  );
}
