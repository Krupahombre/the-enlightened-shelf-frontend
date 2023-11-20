import { Navigate } from "react-router-dom";
import UserStorage from "../../storage/UserStorage";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import Client from "../../api/Client";
import CheckoutResponse from "../../interfaces/checkout/CheckoutResponse";

export default function YourShelf() {
  const storage = new UserStorage();
  const [checkoutList, setCheckoutList] = useState<CheckoutResponse[]>([]);
  const [checkoutsNum, setCheckoutsNum] = useState<number>(0);

  const fetchData = async () => {
    try {
      const checkouts = await Client.getCheckoutsUser();
      setCheckoutList(checkouts.data);
      setCheckoutsNum(checkouts.data.length);
      console.log(checkouts.data);
    } catch (error) {
      console.error("An error occurred while fetching checkouts:", error);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const calculateTimeLeft = (returnDate: string) => {
    const returnDateTime = new Date(returnDate);
    const now = new Date();
    const timeDifference = returnDateTime.getTime() - now.getTime();

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
  };

  if (!storage.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col items-center pt-12 gap-12 mx-auto w-4/5">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-bold">
          This page is Your own Shelf in our library!
        </h3>
        <h1 className="font-bold">See your loans and increase their period</h1>
      </div>
      <div className="mb-5">
        <p className="text-lg font-bold">Number of Checkouts: {checkoutsNum}</p>
      </div>
      <Table isStriped aria-label="Checkout table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>BOOK</TableColumn>
          <TableColumn>CHECKOUT DATE</TableColumn>
          <TableColumn>RETURN DATE</TableColumn>
          <TableColumn>TIME LEFT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {checkoutList.map((checkout, index) => (
            <TableRow key={checkout.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{checkout.book_name}</TableCell>
              <TableCell>{checkout.checkout_date.replace("T", " ")}</TableCell>
              <TableCell>{checkout.return_date.replace("T", " ")}</TableCell>
              <TableCell>{calculateTimeLeft(checkout.return_date)}</TableCell>
              <TableCell>
                <Button>Extend Loan Period</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
