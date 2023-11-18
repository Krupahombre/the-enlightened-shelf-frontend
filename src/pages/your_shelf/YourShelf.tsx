import React, { useEffect, useState } from "react";

interface CheckoutData {
  id: number;
  user_full_name: string;
  book_name: string;
  checkout_date: string;
  return_date: string;
  qr_code: string;
}

const CheckoutImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <div>
      <img src={`data:image/jpeg;base64,${imageUrl}`} alt="Checkout QR Code" />
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData[]>([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrcnVwYWhvbWJyZSIsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MDAzNDQxOTF9.njqaKV7D5D5LyjMDHRH9p8ekzsk58krbDL_ikG2Dwvs";

  const apiUrl = "http://localhost:8000/api/v1/checkouts/image";

  const fetchCheckoutData = async () => {
    try {
      const headers: Record<string, string> = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(apiUrl, { headers });
      const data = await response.json();

      setCheckoutData(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Po zmianie tokenu, ponownie pobierz dane.
    fetchCheckoutData();
  }, [token]);

  return (
    <div>
      <h1>Checkout Page</h1>
      {checkoutData ? (
        checkoutData.map((checkout, index) => (
          <div key={index}>
            <h2>Checkout {index + 1}</h2>
            <CheckoutImage imageUrl={checkout.qr_code} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
