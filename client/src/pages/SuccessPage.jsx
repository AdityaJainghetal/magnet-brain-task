import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems =
    JSON.parse(localStorage.getItem("formattedCart")) || [];

  const userdata =
    JSON.parse(localStorage.getItem("userdata")) || {};
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const session_id = query.get("session_id");

    if (!session_id) {
      navigate("/");
      return;
    }

    const saveOrder = async () => {
      try {
        await axios.post("http://localhost:8000/save-order", {
          session_id,
          userdata,
          cartItems,
          totalAmount,
        });
        localStorage.removeItem("userdata");
        localStorage.removeItem("formattedCart");

        navigate("/");
      } catch (error) {
        console.error("Failed to save order:", error);
      }
    };

    saveOrder();
  }, [location.search, navigate]);

  return (
    <div className="container mt-5 text-center">
      <h2 style={{ color: "green" }}>Payment Successful 🎉</h2>
      <p>Thank you for your order!</p>
      <p>You will be redirected shortly...</p>
    </div>
  );
};

export default SuccessPage;
