import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCards.css";
import {
  addToCart,
  getProductQuantity,
  calculateDiscount,
} from "../uttilites/functions";

const ProductCards = (props) => {
  // State to manage cart in local storage.
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []); // Empty array to ensure it runs only once on mount

  let originalPrice = props.product.mrp;
  let discountedPrice = props.product.sale_price;
  let discountPercentage = calculateDiscount(originalPrice, discountedPrice);

  return (
    <div className="product-card">
      <div className="prod-card-discount-badge">{discountPercentage}% off</div>
      <Link
        to={"/product/" + props.product.prod_sku}
        className="product-card-link"
      >
        <div className="product-card-image">
          <img src={props.product.thumbnail} alt={props.product.thumbnail} />
        </div>
        <div className="product-card-details">
          <h3 className="prod-card-truncate-text">
            {props.product.display_name}
          </h3>
          <p className="prod-card-price">
            ₹{props.product.sale_price}
            <span>₹{props.product.mrp}</span>
          </p>
        </div>
      </Link>
      {props.product.qty === 0 ? (
        <p>Out of Stock</p>
      ) : (
        <div className="prod-card-add-to-cart-container">
          {getProductQuantity(props.product.prod_sku) > 0 ? (
            <button
              className="prod-card-remove-btn"
              onClick={() => {
                const updatedCart = cart
                  .map((item) => {
                    if (item.prod_sku === props.product.prod_sku) {
                      // Reduce quantity
                      if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }; // Safely reduce quantity
                      } else {
                        return null; // Mark for removal if quantity goes to 0
                      }
                    }
                    return item; // No change to other items
                  })
                  .filter(Boolean); // Remove any items that are null

                // Save updated cart to localStorage
                localStorage.setItem("cart", JSON.stringify(updatedCart));

                // Update state
                setCart(updatedCart);
              }}
            >
              -
            </button>
          ) : null}

          <button
            onClick={() => {
              const updatedCart = addToCart(props.product);
              setCart(updatedCart); // update the state
            }}
            className="prod-card-add-to-cart-btn"
          >
            {getProductQuantity(props.product.prod_sku) >= props.product.qty
              ? `Only ${props.product.qty} left!`
              : getProductQuantity(props.product.prod_sku) > 0
              ? getProductQuantity(props.product.prod_sku)
              : "+ Add"}
          </button>
          {getProductQuantity(props.product.prod_sku) > 0 &&
          getProductQuantity(props.product.prod_sku) < props.product.qty ? (
            <button
              onClick={() => {
                const updatedCart = addToCart(props.product);
                setCart(updatedCart); // update the state
              }}
              className="prod-card-add-btn"
            >
              +
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ProductCards;
