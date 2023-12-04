import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@nextui-org/react";
import UserStorage from "../../storage/UserStorage";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Client from "../../api/Client";
import CheckoutHistoryResponse from "../../interfaces/checkout/CheckoutHistoryResponse";

export default function CheckoutHistory() {
  const storage = new UserStorage();
  const [checkoutHistoryList, setCheckoutHistoryList] = useState<
    CheckoutHistoryResponse[]
  >([]);

  const fetchData = async () => {
    try {
      const checkoutsHistory = await Client.getCheckoutsHistory();
      setCheckoutHistoryList(checkoutsHistory.data);
    } catch (error) {
      console.error("An error occurred while fetching checkouts:", error);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  if (!storage.isLoggedIn()) {
    toast.info("Log in to continue");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col items-center pt-12 gap-12 mx-auto w-4/5">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-bold">Your checkout history!</h3>
      </div>
      <Table className="mb-3" isStriped aria-label="Checkout history table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>BOOK</TableColumn>
          <TableColumn>CHECKOUT DATE</TableColumn>
          <TableColumn>RETURN DATE</TableColumn>
          <TableColumn>BOOK PAGE LINK</TableColumn>
        </TableHeader>
        <TableBody>
          {checkoutHistoryList.map((checkout, index) => (
            <TableRow key={checkout.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{checkout.book_title}</TableCell>
              <TableCell>{checkout.checkout_date.replace("T", " ")}</TableCell>
              <TableCell>{checkout.return_date.replace("T", " ")}</TableCell>
              <TableCell>
                <Button
                  as={Link}
                  href={`/book-page/${checkout.book_id}`}
                  showAnchorIcon
                >
                  Go to book page
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
