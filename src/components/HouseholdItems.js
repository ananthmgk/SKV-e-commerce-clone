import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { calculateDiscount } from "../uttilites/functions";
import "../styles/HouseholdItems.css";

const HouseholdItems = () => {
  const { HouseholdItemsId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductMenu();
  }, []);

  async function getProductMenu() {
    const response = await fetch(
      "https://api.shoopy.in/api/v3/web/org/41613/super-products?online-only=true&child-cat-products=true&page=0&size=20&param=root-cat-slugs&value=" +
        HouseholdItemsId +
        "&param=cat-slugs&value=" +
        HouseholdItemsId +
        "&sort-by=catManual"
    );
    const jsonData = await response.json();
    setProducts(jsonData?.payload?.super_products?.content);
  }

  return !products ? (
    <Shimmer />
  ) : (
    <div className="cat-menu-product-container">
      <h1>{products?.cat_name}</h1>;
      <div className="cat-menu-product-list">
        {products?.map((product, index) => {
          let originalPrice = product.mrp;
          let discountedPrice = product.sale_price;
          let discountPercentage = calculateDiscount(
            originalPrice,
            discountedPrice
          );
          return (
            <Link to={"/"} key={index} className="cat-menu-product-card-link">
              <div className="cat-menu-product-card">
                <div className="cat-menu-discount-badge">
                  {discountPercentage}% off
                </div>
                <div className="cat-menu-product-image">
                  <img src={product.thumbnail} alt={product.thumbnail} />
                </div>
                <div className="cat-menu-product-details">
                  <h3>{product.display_name}</h3>
                  <p className="cat-menu-price">
                    ₹{product.sale_price}
                    <span>₹{product.mrp}</span>
                  </p>
                </div>
                {product.qty === 0 ? (
                  <p>Out of Stock</p>
                ) : (
                  <button className="cat-menu-add-to-cart-btn">
                    Add to Cart
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default HouseholdItems;
