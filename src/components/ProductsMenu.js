import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import "../styles/ProductMenu.css";
import { getProductQuantity, calculateDiscount } from "../uttilites/functions";
import GetTheDate from "./GetTheDate";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/cartSlice";

const ProductsMenu = () => {
  const { ProductMenuId } = useParams();
  const dispatch = useDispatch(); // Use dispatch to trigger actions
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cart state from Redux

  const [products, setProducts] = useState(null);
  const [showDate, setShowDate] = useState(false);

  const handleShowDate = () => {
    setShowDate(!showDate);
  };

  useEffect(() => {
    getProductMenu();
  }, []);

  async function getProductMenu() {
    const response = await fetch(
      "https://api.shoopy.in/api/v1/org/41613/super-products?online-only=true&child-cat-products=true&page=0&size=20&sort=createdAt,desc"
    );
    const jsonData = await response.json();
    setProducts(jsonData?.payload?.content);
  }

  return !products ? (
    <Shimmer />
  ) : (
    <>
      {products?.map((product, index) => {
        let originalPrice = product.mrp;
        let discountedPrice = product.sale_price;
        let discountPercentage = calculateDiscount(
          originalPrice,
          discountedPrice
        );
        return product.prod_sku === ProductMenuId ? (
          <div key={index} className="product-menu-container">
            <div className="product-menu-page">
              {/* Left Side - Product Images */}
              <div className="product-menu-main-image">
                <img src={product.thumbnail} alt="Main Product Image" />
              </div>
              {/* Right Side - Product Details */}
              <div className="product-menu-details">
                <h1>{product.display_name}</h1>
                <p className="product-menu-price">
                  <span className="product-menu-current-price">
                    ₹{product.sale_price}
                  </span>
                  <span className="product-menu-original-price">
                    ₹{product.mrp}
                  </span>
                  <span className="product-menu-discount">
                    {discountPercentage}% off
                  </span>
                </p>
                <p className="product-menu-points-info">
                  You will earn 9 points from this product
                </p>

                {product.qty === 0 ? (
                  <p className="product-menu-out-of-stock">Out of Stock</p>
                ) : (
                  <div className="product-menu-action-buttons">
                    <div className="product-menu-add-to-cart-container">
                      {getProductQuantity(product.prod_sku, cartItems) > 0 ? (
                        <button
                          className="product-menu-remove-btn"
                          onClick={() =>
                            dispatch(removeItemFromCart(product.prod_sku))
                          }
                        >
                          -
                        </button>
                      ) : null}

                      <button
                        onClick={() => dispatch(addItemToCart(product))}
                        className="product-menu-add-to-cart-btn"
                      >
                        {getProductQuantity(product.prod_sku, cartItems) >=
                        product.qty
                          ? `Only ${product.qty} left!`
                          : getProductQuantity(product.prod_sku, cartItems) > 0
                          ? getProductQuantity(product.prod_sku, cartItems)
                          : "+ Add"}
                      </button>
                      {getProductQuantity(product.prod_sku, cartItems) > 0 &&
                      getProductQuantity(product.prod_sku, cartItems) <
                        product.qty ? (
                        <button
                          onClick={() => dispatch(addItemToCart(product))}
                          className="product-menu-add-btn"
                        >
                          +
                        </button>
                      ) : null}
                    </div>
                    <button className="product-menu-buy-now-btn">
                      Buy Now
                    </button>
                  </div>
                )}

                <div className="product-menu-delivery-options">
                  <h3>Delivery Options</h3>
                  <input
                    type="text"
                    placeholder="Enter your pincode"
                    className="product-menu-pincode-input"
                  />
                  <button
                    onClick={handleShowDate}
                    className="product-menu-check-btn"
                  >
                    Check
                  </button>
                  <p className="product-menu-delivery-info">
                    Get delivery at your doorstep
                    {showDate ? (
                      <GetTheDate className="catgry-menu-delivery-info" />
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null;
      })}
    </>
  );
};

export default ProductsMenu;
