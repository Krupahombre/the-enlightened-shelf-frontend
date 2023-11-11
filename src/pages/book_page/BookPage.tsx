import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookResponse from "../../interfaces/book/BookResponse";
import Client from "../../api/Client";

export default function BookPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookResponse>();

  const parsedBookId = bookId ? parseInt(bookId, 10) : undefined;

  const fetch = async () => {
    try {
      if (parsedBookId !== undefined) {
        const response = await Client.getBook(parsedBookId);
        setBook(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("An error occurred while fetching books:", error);
    }
  };

  useEffect(() => {
    fetch().catch(console.error);
  }, []);

  return <div>Book Page with id: {bookId}</div>;
}
