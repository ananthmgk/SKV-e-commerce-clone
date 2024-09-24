import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCards.css";

const ProductCards = (props) => {
  // State to manage cart
  const [cart, setCart] = useState([]);

  // Function to handle adding products to cart
  const addToCart = (product) => {
    // Get the current cart from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const findProduct = storedCart.findIndex(
      (item) => item.prod_sku === product.prod_sku
    );

    if (findProduct !== -1) {
      // If product exists, increase quantity
      if (storedCart[findProduct].quantity >= props.product.qty) {
        null;
      } else {
        storedCart[findProduct].quantity += 1;
      }
    } else {
      // If product is new, add it with a quantity property
      product.quantity = 1;
      storedCart.push(product);
    }

    // Update the cart in local storage and state
    localStorage.setItem("cart", JSON.stringify(storedCart));
    setCart(storedCart); // update the state
  };

  // Function to get product quantity from cart
  const getProductQuantity = (prod_sku) => {
    const productInCart = cart.find((item) => item.prod_sku === prod_sku);
    return productInCart ? productInCart.quantity : 0;
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <div className="product-card">
      <div className="discount-badge">{props.discountPercentage}% off</div>
      <Link
        to={"/product/" + props.product.prod_sku}
        className="product-card-link"
      >
        <div className="product-image">
          <img src={props.product.thumbnail} alt={props.product.thumbnail} />
        </div>
        <div className="product-details">
          <h3 className="truncate-text">{props.product.display_name}</h3>
          <p className="price">
            ₹{props.product.sale_price}
            <span>₹{props.product.mrp}</span>
          </p>
        </div>
      </Link>
      {props.product.qty === 0 ? (
        <p>Out of Stock</p>
      ) : (
        <div className="add-to-cart-container">
          {getProductQuantity(props.product.prod_sku) > 0 ? (
            <button
              className="remove-btn"
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
            onClick={() => addToCart(props.product)}
            className="add-to-cart-btn"
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
              onClick={() => addToCart(props.product)}
              className="add-btn"
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
