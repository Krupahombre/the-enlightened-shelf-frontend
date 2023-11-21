import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

interface ReviewProps {
  username: string;
  date: string;
  rating: number;
  comment: string;
}

export default function Review({
  username,
  date,
  rating,
  comment,
}: ReviewProps) {
  return (
    <Card>
      <CardHeader>
        <h3>🗣{username}</h3>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-between">
          <div>
            <p>{comment}</p>
            <p className="text-xs">{date.replace("T", " ")}</p>
          </div>
          <div>
            <p>{rating}/5</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
