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
  }, []);

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
                const updatedCart = cart.filter((item) =>
                  item.prod_sku === props.product.prod_sku
                    ? (item.quantity -= 1)
                    : null
                );

                localStorage.setItem("cart", JSON.stringify(updatedCart));
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
              : "+ Add to Cart"}
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
