import { Card, CardBody, CardHeader, Image, Button } from "@nextui-org/react";

interface BookResultProps {
  title: string;
  authors: string[];
  imageLink: string;
  onAddRequest: () => void;
}

const BookResult = ({
  title,
  authors,
  imageLink,
  onAddRequest,
}: BookResultProps) => {
  const firstAuthor = authors.length > 0 ? authors[0] : "Unknown Author";

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
        <p className="text-tiny uppercase font-bold">{firstAuthor}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex items-center justify-between">
          <Image
            alt="Book cover"
            className="object-cover rounded-xl mr-3"
            src={imageLink}
            width={90}
          />
          <Button color="primary" onClick={onAddRequest}>
            Add This Book
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default BookResult;
