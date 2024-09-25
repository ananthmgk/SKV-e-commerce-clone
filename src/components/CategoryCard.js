import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import {
  addToCart,
  getProductQuantity,
  calculateDiscount,
} from "../uttilites/functions";
import "../styles/CategoryCard.css";

const CategoryCard = () => {
  const { CategoryCardId } = useParams();
  const [products, setProducts] = useState([]);
  // State to manage cart in local storage.
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProductCard();
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

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
      {/* <h1>{products?.cat_name}</h1> */}
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
                  {getProductQuantity(product.prod_sku) > 0 ? (
                    <button
                      className="cat-card-remove-btn"
                      onClick={() => {
                        const updatedCart = cart.filter((item) =>
                          item.prod_sku === product.prod_sku
                            ? (item.quantity -= 1)
                            : null
                        );

                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                        setCart(updatedCart);
                      }}
                    >
                      -
                    </button>
                  ) : null}

                  <button
                    onClick={() => {
                      const updatedCart = addToCart(product);
                      setCart(updatedCart); // update the state
                    }}
                    className="cat-card-add-to-cart-btn"
                  >
                    {getProductQuantity(product.prod_sku) >= product.qty
                      ? `Only ${product.qty} left!`
                      : getProductQuantity(product.prod_sku) > 0
                      ? getProductQuantity(product.prod_sku)
                      : "+ Add to Cart"}
                  </button>
                  {getProductQuantity(product.prod_sku) > 0 &&
                  getProductQuantity(product.prod_sku) < product.qty ? (
                    <button
                      onClick={() => {
                        const updatedCart = addToCart(product);
                        setCart(updatedCart); // update the state
                      }}
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
