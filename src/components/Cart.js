import { useState } from "react";
import "../styles/Cart.css";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Panasonic AA Battery",
      price: 20,
      quantity: 2,
      outOfStock: false,
      image:
        "https://img.cdnx.in/41613/SKU-4474_0-1723631126713.jpg?width=600&format=webp",
    },
    {
      id: 2,
      name: "Steel Wire Dish Washing Cloths",
      price: 24,
      quantity: 1,
      outOfStock: true,
      image:
        "https://img.cdnx.in/41613/SKU-3880_0-1721052881017.webp?width=600&format=webp",
    },
  ]);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const handleQuantityChange = (id, action) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const outOfStockCount = items.filter((item) => item.outOfStock).length;

  return (
    <div className="cart-container">
      {/* Out of stock warning */}
      {outOfStockCount > 0 && (
        <div className="cart-out-of-stock-warning">
          <span>
            ⚠ {outOfStockCount} Products are Out Of Stock, Please remove to
            continue
          </span>
        </div>
      )}

      <div className="cart-content">
        {/* Left Section */}
        <div className="cart-details">
          <h2>Shopping Cart &gt; Review Order</h2>

          <div className="cart-contact-details">
            <h3>Contact Details</h3>
            <div className="cart-contact-info">
              <span>👤 Ananth</span>
              <span>📞 9751006874</span>
            </div>
          </div>

          <div className="cart-address-form">
            <h3>Address</h3>
            <p>Please add your address</p>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={address.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={address.mobile}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="addressLine"
                placeholder="Address *"
                value={address.addressLine}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code *"
                value={address.pinCode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City *"
                value={address.city}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State *"
                value={address.state}
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="cart-items">
          <div className="cart-coupon-section">
            <span>
              Coupon Applied: <strong>SKVWORLD5</strong>
            </span>
            <button className="cart-remove-coupon">Remove</button>
            <p>Coupon Saving ₹86.25</p>
          </div>

          {/* Items */}
          <div className="cart-items-list">
            {items.map((item) => (
              <div
                key={item.id}
                className={`cart-item ${item.outOfStock ? "out-of-stock" : ""}`}
              >
                <img src={item.image} alt={item.name} />{" "}
                <div>
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-item"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <button className="cart-continue-btn" disabled={outOfStockCount > 0}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
