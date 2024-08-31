import { useState } from "react";
import { productCards } from "../content";
import { filterProducts } from "../uttilites/functions";
import "../styles/SearchBar.css";
const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState(productCards[0].payload.content);
  return (
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
        onClick={() => setProducts(filterProducts(products, searchInput))}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
