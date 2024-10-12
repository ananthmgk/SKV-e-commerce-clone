import { Link } from "react-router-dom";
import "../styles/ProductCards.css";
import { calculateDiscount, getProductQuantity } from "../uttilites/functions";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/cartSlice";

const ProductCards = (props) => {
  const dispatch = useDispatch(); // Use dispatch to trigger actions
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cart state from Redux

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
          {getProductQuantity(props.product.prod_sku, cartItems) > 0 ? (
            <button
              className="prod-card-remove-btn"
              onClick={() =>
                dispatch(removeItemFromCart(props.product.prod_sku))
              }
            >
              -
            </button>
          ) : null}

          <button
            onClick={() => dispatch(addItemToCart(props.product))}
            className="prod-card-add-to-cart-btn"
          >
            {getProductQuantity(props.product.prod_sku, cartItems) >=
            props.product.qty
              ? `Only ${props.product.qty} left!`
              : getProductQuantity(props.product.prod_sku, cartItems) > 0
              ? getProductQuantity(props.product.prod_sku, cartItems)
              : "+ Add"}
          </button>
          {getProductQuantity(props.product.prod_sku, cartItems) > 0 &&
          getProductQuantity(props.product.prod_sku, cartItems) <
            props.product.qty ? (
            <button
              onClick={() => dispatch(addItemToCart(props.product))}
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
