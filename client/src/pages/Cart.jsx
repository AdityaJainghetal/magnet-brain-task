import React from "react";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalBill = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <span onClick={handleBack} className="back-btn">
          <FaArrowLeft /> Back
        </span>
        <h2>Your Cart Items</h2>
      </div>

      {cartItems.length === 0 ? (
        <h4 className="empty-cart">🛒 Your Cart is empty!</h4>
      ) : (
        <>
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={
                          item.image ? `http://localhost:8000${item.image}` : ""
                        }
                        alt={item.name}
                        className="cart-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price.toLocaleString()}</td>
                    <td className="desc-cell">{item.description}</td>
                    <td>
                      <div className="quantity-controls">
                        <FaPlus
                          className="qty-btn"
                          onClick={() => dispatch(increaseQuantity(item._id))}
                        />
                        <span className="qty-value">{item.quantity}</span>
                        <TiMinus
                          className="qty-btn"
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                        />
                      </div>
                    </td>
                    <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <MdDelete
                        className="delete-btn"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalBill.toLocaleString()}</h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
