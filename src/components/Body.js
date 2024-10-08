import Categories from "./Categories";
import "../styles/Body.css";
import { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
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
      <Categories />
      <SearchBar
        allproducts={allproducts}
        setFilteredProducts={setFilteredProducts}
      />
      <>
        <h1 className="product-card-heading">Products</h1>
        <div className="product-card-container">
          <div className="product-card-list">
            {filteredProducts.length === 0 ? (
              <p className="no-product">No products found Sorry</p>
            ) : (
              filteredProducts.map((product, index) => {
                const props = {
                  product: product,
                  // discountPercentage: discountPercentage,
                };

                return <ProductCards {...props} key={index} />;
              })
            )}
          </div>
        </div>
      </>
    </div>
  );
};
export default Body;
