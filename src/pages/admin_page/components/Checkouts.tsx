import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import CheckoutResponse from "../../../interfaces/checkout/CheckoutResponse";
import Client from "../../../api/Client";
import QRCode from "react-qr-code";

export default function Checkouts() {
  const [checkoutList, setCheckoutList] = useState<CheckoutResponse[]>([]);
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const checkouts = await Client.getCheckouts();
      setCheckoutList(checkouts.data);
      console.log(checkouts.data);
    } catch (error) {
      console.error("An error occurred while fetching checkouts:", error);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const handleGenerateQRCode = (qrCodeData: string) => {
    setSelectedQRCode(qrCodeData);
  };

  return (
    <Table isStriped aria-label="Checkout table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>BOOK</TableColumn>
        <TableColumn>CHECKOUT DATE</TableColumn>
        <TableColumn>RETURN DATE</TableColumn>
        <TableColumn>CHECKOUT CODE</TableColumn>
      </TableHeader>
      <TableBody>
        {checkoutList.map((checkout, index) => (
          <TableRow key={checkout.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{checkout.user_email}</TableCell>
            <TableCell>{checkout.book_name}</TableCell>
            <TableCell>{checkout.checkout_date.replace("T", " ")}</TableCell>
            <TableCell>{checkout.return_date.replace("T", " ")}</TableCell>
            <TableCell>
              {selectedQRCode === JSON.stringify(checkout.qr_code_data) ? (
                <QRCode
                  value={JSON.stringify(checkout.qr_code_data)}
                  size={100}
                />
              ) : (
                <Button
                  onClick={() =>
                    handleGenerateQRCode(JSON.stringify(checkout.qr_code_data))
                  }
                >
                  Generate QR Code
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
