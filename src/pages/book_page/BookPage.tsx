import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookResponse from "../../interfaces/book/BookResponse";
import Client from "../../api/Client";
import { Image } from "@nextui-org/react";

export default function BookPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookResponse>();

  const parsedBookId = bookId ? parseInt(bookId) : undefined;

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

  return (
    <div className="flex flex-col w-4/5 mx-auto pt-5 gap-10">
      <div>
        <h3 className="text-2xl font-bold">{book?.title}</h3>
        <h1 className="font-bold">{book?.author}</h1>
      </div>
      <div className="flex flex-row w-4/5 mx-auto gap-6">
        <Image width={200} alt="Book Image" src={book?.img} />
        <p className="h-80">{book?.description}</p>
      </div>
    </div>
  );
}
