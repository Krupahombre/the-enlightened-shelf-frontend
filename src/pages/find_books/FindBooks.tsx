import { useState, useEffect } from "react";
import Client from "../../api/Client";
import FindBookItem from "./components/FindBookItem";
import BookResponse from "../../interfaces/book/BookResponse";
import { Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

export default function FindBooks() {
  const [bookList, setBookList] = useState<BookResponse[]>([]);
  const [showBookList, setShowBookList] = useState<BookResponse[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const fetch = async () => {
    try {
      const books = await Client.getBooks();
      setBookList(books.data);
      setShowBookList(books.data);

      const uniqueCategoriesSet = new Set(
        books.data.map((item) => item.category)
      );
      const uniqueCategorieslist = [...uniqueCategoriesSet];
      setCategoryList(uniqueCategorieslist);
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

  const handleSelectedCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const result = bookList.filter((arg) =>
      arg.category.includes(e.target.value)
    );
    setShowBookList(result);
  };

  return (
    <div className="flex flex-col items-center justify-start py-12 gap-12">
      <h3 className="text-2xl font-bold">
        In our library, everyone finds something for themselves!
      </h3>
      <div className="flex flex-row items-center justify-start gap-4">
        <Input
          label="Search ..."
          variant="bordered"
          className="w-80"
          onChange={filterBooks}
        />
        <Select
          items={categoryList}
          label="Favorite Animal"
          placeholder="Select an animal"
          className="w-80"
          onChange={handleSelectedCategory}
        >
          {categoryList.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
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
            category={book.category}
          />
        ))}
      </div>
    </div>
  );
}
