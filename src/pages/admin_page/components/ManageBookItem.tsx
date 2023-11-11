import { Button, ScrollShadow } from "@nextui-org/react";
import { Link } from "react-router-dom";

interface ManageBookItemProps {
  bookId: number;
  imgUrl: string;
  title: string;
  author: string;
  description: string;
  quantity: number;
  quantity_available: number;
}

export default function ManageBookItem({
  bookId,
  imgUrl,
  title,
  description,
  author,
  quantity,
  quantity_available,
}: ManageBookItemProps) {
  return (
    <div className="flex p-6 rounded-lg border-2 h-96">
      <img src={imgUrl} alt="" className="h-full rounded-md w-1/4" />
      <div className="flex flex-col pl-6 w-full">
        <h1 className="text-xl font-bold">{title}</h1>
        <h3 className="text-lg">{author}</h3>
        <p className="mt-7">Book available: {quantity_available}</p>
        <p className="">Total book quantity: {quantity}</p>
        {/* <ScrollShadow hideScrollBar className="h-80 overflow-y-scroll">
          <p>{description}</p>
        </ScrollShadow> */}
        <div className="h-full"></div>
        <div className="flex justify-end space-x-2">
          <Button color="warning">Change Quantity</Button>
          <Button color="danger" variant="ghost">
            Delete Book
          </Button>
        </div>
      </div>
    </div>
  );
}
