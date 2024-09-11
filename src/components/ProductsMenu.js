import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import "../styles/ProductMenu.css";
import { calculateDiscount } from "../uttilites/functions";

const ProductsMenu = () => {
  const { ProductId } = useParams();
  const [products, setProducts] = useState(null);
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
        return product.prod_sku === ProductId ? (
          <div key={index} className="product-menu-container">
            <div className="product-menu-page">
              {/* Left Side - Product Images */}
              <div className="product-menu-images">
                {/* <div className="product-menu-thumbnail-list">
                  <img src="product-image1.jpg" alt="Thumbnail 1" />
                  <img src="product-image2.jpg" alt="Thumbnail 2" />
                  <img src="product-image3.jpg" alt="Thumbnail 3" />
                  <img src="product-image4.jpg" alt="Thumbnail 4" />
                </div> */}
                <div className="product-menu-main-image">
                  <img src={product.thumbnail} alt="Main Product Image" />
                </div>
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

                <div className="product-menu-action-buttons">
                  {product.qty === 0 ? (
                    <p>Out of Stock</p>
                  ) : (
                    <div>
                      <button className="product-menu-add-to-cart">
                        + Add
                      </button>
                      <button className="product-menu-buy-now">Buy Now</button>
                    </div>
                  )}
                </div>

                <div className="product-menu-delivery-options">
                  <h3>Delivery Options</h3>
                  <input
                    type="text"
                    placeholder="Enter your pincode"
                    className="product-menu-pincode-input"
                  />
                  <button className="product-menu-check-btn">Check</button>
                  <p className="product-menu-delivery-info">
                    Get delivery at your doorstep
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
