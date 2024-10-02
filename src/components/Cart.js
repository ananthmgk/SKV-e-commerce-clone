import { useEffect, useState } from "react";
import "../styles/Cart.css";
import { calculateDiscount } from "../uttilites/functions";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update local storage whenever cartItems state changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.prod_sku === id) {
          if (action === "increase") {
            if (item.quantity >= item.qty) {
              alert(
                `Store has only ${item.qty} units of this product in stock.`
              );
              return { ...item, quantity: item.qty }; // set to maximum stock
            } else {
              return { ...item, quantity: item.quantity + 1 }; // increment quantity
            }
          } else if (action === "decrease") {
            return { ...item, quantity: Math.max(item.quantity - 1, 1) }; // decrement but not below 1
          }
        }
        return item;
      })
    );
  };

  // Updating Properties in Objects (Immutable Update):

  // A common use case in React is updating an object's properties immutably.

  // const user = { name: "Alice", age: 25 };
  // const updatedUser = { ...user, age: 26 };
  // console.log(updatedUser); // Output: { name: 'Alice', age: 26 }

  // The spread operator creates a new object and updates only the property you
  // specify (in this case, age), leaving other properties unchanged.

  const handleRemove = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.prod_sku !== id)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const outOfStockCount = cartItems.filter((item) => item.qty === 0).length;

  const salePriceTotal = cartItems.reduce(
    (total, item) => total + item.sale_price * item.quantity,
    0
  );

  const mrpTotal = cartItems.reduce(
    (total, item) => total + item.mrp * item.quantity,
    0
  );

  const savedAmount = mrpTotal - salePriceTotal;

  const discount = () => {
    let totalDiscountPercentage = cartItems.reduce((total, item) => {
      let originalPrice = item.mrp;
      let discountedPrice = item.sale_price;
      let discountPercentage = calculateDiscount(
        originalPrice,
        discountedPrice
      );
      return total + discountPercentage;
    }, 0);

    return totalDiscountPercentage;
  };

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
              <span className="cart-contact-name">👤 Ananth</span>
              <span className="cart-contact-number">📞 9751006874</span>
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
          <h1 className="cart-items-counting">Items({cartItems.length})</h1>

          {/* Items */}
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className={
                  item.qty === 0 ? "cart-item-out-of-stock" : "cart-item"
                }
              >
                <div className="cart-item-name-price">
                  <img src={item.thumbnail} alt={item.thumbnailName} />{" "}
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">₹{item.sale_price}</p>
                </div>
                <div className="cart-item-remove-quantity-btn">
                  <button
                    className="cart-remove-item"
                    onClick={() => handleRemove(item.prod_sku)}
                  >
                    Remove
                  </button>
                  {item.qty === 0 ? (
                    <p className="out-of-stock">Out of Stock</p>
                  ) : (
                    <div className="cart-quantity-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.prod_sku, "decrease")
                        }
                      >
                        -
                      </button>
                      <span className="cart-item-quantity">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.prod_sku, "increase")
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bill Details */}
          <div className="cart-bill-details">
            <h3>Bill Details</h3>
            <span>
              <p>Sub Total</p>
              <p className="cart-bill-rupees">₹{salePriceTotal}</p>
            </span>
            <span>
              <p>Tax</p>
              <p className="cart-bill-rupees">₹0</p>
            </span>
            <span>
              <p>Coupon Discount</p>
              <p className="cart-bill-rupees">-₹{discount()}</p>
            </span>
            <span>
              <p>Payable Amount</p>
              <p className="cart-bill-rupees">₹{salePriceTotal - discount()}</p>
            </span>
            <span className="cart-bill-rupees">
              ₹{savedAmount} saved so far on this order
            </span>
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
