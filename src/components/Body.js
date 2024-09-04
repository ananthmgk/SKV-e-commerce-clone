import Categories from "./Categories";
import "../styles/Body.css";
import { productCards } from "../content";
import { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import { calculateDiscount } from "../uttilites/functions";
import SearchBar from "./SearchBar";
import Shimmer from "./Shimmer";
import Banner from "./Banner";

const Body = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await fetch(
      "https://api.shoopy.in/api/v1/org/41613/super-products?online-only=true&child-cat-products=true&page=0&size=20&sort=createdAt,desc"
    );
    const jsonData = await response.json();
    setAllProducts(jsonData?.payload?.content);
    setFilteredProducts(jsonData?.payload?.content);
  }

  if (!allproducts) return null;

  return allproducts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <Banner />
      <SearchBar
        allproducts={allproducts}
        setFilteredProducts={setFilteredProducts}
      />
      <Categories />
      <div className="product-container">
        <h1>Products</h1>
        <div className="product-list">
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map((product, index) => {
              let originalPrice = product.product_variants[0].mrp;
              let discountedPrice = product.product_variants[0].sale_price;
              let discountPercentage = calculateDiscount(
                originalPrice,
                discountedPrice
              );
              const props = {
                product: product,
                discountPercentage: discountPercentage,
              };
              return <ProductCards {...props} key={index} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default Body;
