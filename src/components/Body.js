import Categories from "./Categories";
import "../styles/Body.css";
import { productCards } from "../content";
import { useState } from "react";
import ProductCards from "./ProductCards";
// import SearchBar from "./SearchBar";
//
import { filterProducts } from "../uttilites/functions";
import "../styles/SearchBar.css";

function calculateDiscount(originalPrice, discountedPrice) {
  let discount = originalPrice - discountedPrice;
  let discountPercentage = (discount / originalPrice) * 100;
  return Math.round(discountPercentage);
}

// const SearchBar = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [products, setProducts] = useState(productCards[0].payload.content);
//   return (
//     <div className="search-container">
//       <input
//         className="search-box"
//         type="text"
//         placeholder="Search for a Product"
//         value={searchInput}
//         onChange={(e) => {
//           setSearchInput(e.target.value);
//         }}
//       />
//       <button
//         className="search-btn"
//         onClick={() => setProducts(filterProducts(products, searchInput))}
//       >
//         Search
//       </button>
//     </div>
//   );
// };

const Body = () => {
  const [products, setProducts] = useState(productCards[0].payload.content);
  const [filteredProducts, setFilteredProducts] = useState(
    productCards[0].payload.content
  );

  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="body">
      <Categories />
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search for a Product"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() =>
            setFilteredProducts(filterProducts(products, searchInput))
          }
        >
          Search
        </button>
      </div>
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
            return (
              <ProductCards
                product={product}
                discountPercentage={discountPercentage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Body;
