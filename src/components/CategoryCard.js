import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { getProductQuantity, calculateDiscount } from "../uttilites/functions";
import "../styles/CategoryCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/cartSlice";

const CategoryCard = () => {
  const { CategoryCardId } = useParams();
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch(); // Use dispatch to trigger actions
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cart state from Redux

  useEffect(() => {
    getProductCard();
  }, []);

  // useEffect(() => {
  //   localStorage.removeItem("cart");
  // }, []);

  async function getProductCard() {
    const response = await fetch(
      "https://api.shoopy.in/api/v3/web/org/41613/super-products?online-only=true&child-cat-products=true&page=0&size=20&param=root-cat-slugs&value=" +
        CategoryCardId +
        "&param=cat-slugs&value=" +
        CategoryCardId +
        "&sort-by=catManual"
    );
    const jsonData = await response.json();
    setProducts(jsonData?.payload?.super_products?.content);
  }

  return products.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="cat-card-product-container">
      <div className="cat-card-product-list">
        {products?.map((product, index) => {
          let originalPrice = product.mrp;
          let discountedPrice = product.sale_price;
          let discountPercentage = calculateDiscount(
            originalPrice,
            discountedPrice
          );
          return (
            <div className="cat-card-product-card">
              {/* <h1>{product?.cat_name}</h1>  */}
              <Link
                to={"/categoryMenu/" + product.prod_sku}
                key={index}
                className="cat-card-product-card-link"
              >
                <div className="cat-card-discount-badge">
                  {discountPercentage}% off
                </div>
                <div className="cat-card-product-image">
                  <img src={product.thumbnail} alt={product.thumbnail} />
                </div>
                <div className="cat-card-product-details">
                  <h3 className="cat-card-truncate-text">
                    {product.display_name}
                  </h3>
                  <p className="cat-card-price">
                    ₹{product.sale_price}
                    <span>₹{product.mrp}</span>
                  </p>
                </div>
              </Link>
              {product.qty === 0 ? (
                <p>Out of Stock</p>
              ) : (
                <div className="cat-card-add-to-cart-container">
                  {getProductQuantity(product.prod_sku, cartItems) > 0 ? (
                    <button
                      className="cat-card-remove-btn"
                      onClick={() =>
                        dispatch(removeItemFromCart(product.prod_sku))
                      }
                    >
                      -
                    </button>
                  ) : null}

                  <button
                    onClick={() => dispatch(addItemToCart(product))}
                    className="cat-card-add-to-cart-btn"
                  >
                    {getProductQuantity(product.prod_sku, cartItems) >=
                    product.qty
                      ? `Only ${product.qty} left!`
                      : getProductQuantity(product.prod_sku, cartItems) > 0
                      ? getProductQuantity(product.prod_sku, cartItems)
                      : "+ Add to Cart"}
                  </button>
                  {getProductQuantity(product.prod_sku, cartItems) > 0 &&
                  getProductQuantity(product.prod_sku, cartItems) <
                    product.qty ? (
                    <button
                      onClick={() => dispatch(addItemToCart(product))}
                      className="cat-card-add-btn"
                    >
                      +
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoryCard;
