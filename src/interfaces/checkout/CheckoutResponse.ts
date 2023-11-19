export default interface CheckoutResponse {
  id: number;
  user_email: string;
  book_name: string;
  checkout_date: string;
  return_date: string;
  qr_code_data: string;
}
