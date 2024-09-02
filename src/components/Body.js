import Categories from "./Categories";
import "../styles/Body.css";
import { productCards } from "../content";
import { useState } from "react";
import ProductCards from "./ProductCards";
import { calculateDiscount } from "../uttilites/functions";
import SearchBar from "./SearchBar";

const Body = () => {
  const [allproducts, setAllProducts] = useState(
    productCards[0].payload.content
  );
  const [filteredProducts, setFilteredProducts] = useState(
    productCards[0].payload.content
  );

  return (
    <div className="body">
      <Categories />
      <SearchBar
        allproducts={allproducts}
        setFilteredProducts={setFilteredProducts}
      />
      <div className="product-container">
        <h1>Products</h1>
        <div className="product-list">
          {filteredProducts.map((product) => {
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
            return <ProductCards {...props} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Body;
