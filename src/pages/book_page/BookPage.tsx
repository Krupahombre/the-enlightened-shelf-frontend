import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import BookResponse from "../../interfaces/book/BookResponse";
import Client from "../../api/Client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import UserStorage from "../../storage/UserStorage";
import { BsInfoCircle } from "react-icons/bs";
import Review from "./components/Review";
import ReviewResponse from "../../interfaces/review/ReviewResponse";
import { RatingData } from "./utils/RatingData";
import AddReview from "../../interfaces/review/AddReview";
import Router from "../Router";
import { toast } from "react-toastify";

export default function BookPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookResponse>();
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const storage = new UserStorage();
  const parsedBookId = bookId ? parseInt(bookId) : undefined;
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [addedComment, setAddedComment] = useState("");
  const [addedRating, setAddedRating] = useState(0.0);

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    try {
      console.log("Added Comment:", addedComment);
      console.log("Added Rating:", addedRating);

      const reviewData: AddReview = {
        rating: addedRating,
        comment: addedComment,
      };
      const idOfBook = book?.id || 0;
      await Client.addReview(idOfBook, reviewData);

      setIsReviewModalOpen(false);
      setAddedComment("");
      setAddedRating(0.0);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while adding review:", error);
    }
  };

  const handleBookCheckout = async () => {
    try {
      const idOfBook = book?.id || 0;
      await Client.createCheckout(idOfBook);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while checking out the book:", error);
    }
  };

  const fetch = async () => {
    try {
      if (parsedBookId !== undefined) {
        const bookResponse = await Client.getBook(parsedBookId);
        setBook(bookResponse.data);
        const reviewResponse = await Client.getReviews(parsedBookId);
        setReviews(reviewResponse.data);
      }
    } catch (error) {
      console.error("An error occurred while fetching book data:", error);
      Router.navigate("/find-books");
    }
  };

  useEffect(() => {
    fetch().catch(console.error);
  }, []);

  if (!storage.isLoggedIn()) {
    toast.info("Log in to continue");
    Router.navigate("/login");
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(2);
  };

  const isAvailable = book?.quantity_available && book?.quantity_available > 0;
  const availabilityText = isAvailable ? "Available" : "Unavailable";
  const availabilityInfo = isAvailable
    ? "Feel free to check this book out! 😃"
    : "Try again later 🙁";
  const textColorClass = isAvailable ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col w-4/5 mx-auto pt-5 gap-10">
      <div>
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">{book?.title}</h3>
          <p className="text-2xl font-bold">
            Rating: {calculateAverageRating()}/5
          </p>
        </div>
        <h1 className="font-bold">{book?.author}</h1>
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col items-center w-1/5">
          <Image isBlurred width={200} alt="Book Image" src={book?.img} />
        </div>
        <div className="flex flex-col gap-5 w-1/2">
          <div className="flex flex-row">
            <Chip color="warning" variant="dot">
              {book?.category}
            </Chip>
          </div>
          <h1 className="font-bold">Description:</h1>
          <p className="overflow-y-scroll max-h-[200px]">{book?.description}</p>
        </div>
        <div className="w-1/4">
          <Card>
            <CardHeader className="flex flex-row gap-3 text-xl font-bold">
              <h2 className={textColorClass}>{availabilityText}</h2>
              <Tooltip showArrow={true} content={availabilityInfo}>
                <p>
                  <BsInfoCircle />
                </p>
              </Tooltip>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col gap-1">
                <p>Book copies: {book?.quantity}</p>
                <p>Available: {book?.quantity_available}</p>
              </div>
              <div className="flex flex-col items-center pt-5">
                {isAvailable ? (
                  <Button
                    radius="full"
                    color={isAvailable ? "success" : "danger"}
                    onClick={handleBookCheckout}
                  >
                    {isAvailable ? "Check this book out" : "Out of stock"}
                  </Button>
                ) : (
                  <Button
                    radius="full"
                    color={isAvailable ? "success" : "danger"}
                    isDisabled
                  >
                    {isAvailable ? "Check this book out" : "Out of stock"}
                  </Button>
                )}
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-col text-gray-500 text-sm">
              <p>
                Please note that the current quantity of available copies may
                change during the checkout process.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-4 pb-5">
        <div className="flex flex row justify-between">
          <p className="text-xl font-bold">Latest reviews:</p>
          <Button color="warning" onClick={handleOpenReviewModal}>
            Leave a review
          </Button>
        </div>
        {reviews.length === 0 ? (
          <div className="flex justify-center">
            <p>No reviews yet! 🤔</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <Review
              key={index}
              username={review.username}
              date={review.date}
              rating={review.rating}
              comment={review.comment}
            />
          ))
        )}
      </div>
      <Modal
        isOpen={isReviewModalOpen}
        onOpenChange={() => (
          setIsReviewModalOpen(!isReviewModalOpen),
          setAddedComment(""),
          setAddedRating(0.0)
        )}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Leave a Review
          </ModalHeader>
          <ModalBody>
            <Select
              label="Select rating"
              value={addedRating.toString()}
              onChange={(e) => setAddedRating(Number(e.target.value))}
            >
              {RatingData.map((rating) => (
                <SelectItem key={rating.value} value={rating.value.toString()}>
                  {rating.label}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              label="Comment"
              variant="bordered"
              value={addedComment}
              onChange={(event) => setAddedComment(event.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setIsReviewModalOpen(false);
                setAddedComment("");
                setAddedRating(0.0);
              }}
            >
              Cancel
            </Button>
            <Button color="success" onPress={handleSubmitReview}>
              Submit review
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
