import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import "../styles/CategoryMenu.css";
import { getProductQuantity, calculateDiscount } from "../uttilites/functions";
import GetTheDate from "./GetTheDate";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/cartSlice";

const CategoryMenu = () => {
  const { CategoryMenuId } = useParams();
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
      "https://api.shoopy.in/api/v3/web/org/41613/super-products?online-only=true&child-cat-products=true&page=0&size=20&param=root-cat-slugs&value=house-hold-41613&param=cat-slugs&value=house-hold-41613&sort-by=catManual"
    );
    const jsonData = await response.json();
    setProducts(jsonData?.payload?.super_products?.content);
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
        return product.prod_sku === CategoryMenuId ? (
          <div key={index} className="catgry-menu-container">
            <div className="catgry-menu-page">
              {/* Left Side - Product Images */}
              <div className="catgry-menu-main-image">
                <img src={product.thumbnail} alt="Main Product Image" />
              </div>
              {/* Right Side - Product Details */}
              <div className="catgry-menu-details">
                <h1>{product.display_name}</h1>
                <p className="catgry-menu-price">
                  <span className="catgry-menu-current-price">
                    ₹{product.sale_price}
                  </span>
                  <span className="catgry-menu-original-price">
                    ₹{product.mrp}
                  </span>
                  <span className="catgry-menu-discount">
                    {discountPercentage}% off
                  </span>
                </p>
                <p className="catgry-menu-points-info">
                  You will earn 9 points from this product
                </p>

                {product.qty === 0 ? (
                  <p className="catgry-menu-out-of-stock">Out of Stock</p>
                ) : (
                  <div className="catgry-menu-action-buttons">
                    <div className="catgry-menu-add-to-cart-container">
                      {getProductQuantity(product.prod_sku, cartItems) > 0 ? (
                        <button
                          className="catgry-menu-remove-btn"
                          onClick={() =>
                            dispatch(removeItemFromCart(product.prod_sku))
                          }
                        >
                          -
                        </button>
                      ) : null}

                      <button
                        onClick={() => dispatch(addItemToCart(product))}
                        className="catgry-menu-add-to-cart-btn"
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
                          className="catgry-menu-add-btn"
                        >
                          +
                        </button>
                      ) : null}
                    </div>
                    <button className="catgry-menu-buy-now-btn">Buy Now</button>
                  </div>
                )}

                <div className="catgry-menu-delivery-options">
                  <h3>Delivery Options</h3>
                  <input
                    type="text"
                    placeholder="Enter your pincode"
                    className="catgry-menu-pincode-input"
                  />
                  <button
                    onClick={handleShowDate}
                    className="catgry-menu-check-btn"
                  >
                    Check
                  </button>
                  <p className="catgry-menu-delivery-info">
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

export default CategoryMenu;
