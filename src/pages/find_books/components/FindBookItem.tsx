import { Button, ScrollShadow } from "@nextui-org/react";
import { Link } from "react-router-dom";

interface FindBookItemProps {
  bookId: number;
  imgUrl: string;
  title: string;
  author: string;
  description: string;
}

export default function FindBookItem({
  bookId,
  imgUrl,
  title,
  description,
  author,
}: FindBookItemProps) {
  return (
    <div className="flex p-6 rounded-lg border-2 h-96">
      <img src={imgUrl} alt="" className="h-full rounded-md w-1/4" />
      <div className="flex flex-col pl-6 w-full">
        <h1 className="text-xl font-bold">{title}</h1>
        <h3 className="text-lg">{author}</h3>
        {/* <p className="opacity-75 h-80 overflow-y-scroll">{description}</p> */}
        <ScrollShadow hideScrollBar className="h-80 overflow-y-scroll">
          <p>{description}</p>
        </ScrollShadow>
        <div className="h-full"></div>
        <div className="flex justify-end">
          <Button as={Link} to={`/book-page/${bookId}`}>
            More details
          </Button>
        </div>
      </div>
    </div>
  );
}
