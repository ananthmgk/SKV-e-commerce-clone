import { useState } from "react";
import { filterProducts } from "../uttilites/functions";
import "../styles/SearchBar.css";

const SearchBar = ({ allproducts, setFilteredProducts }) => {
  const searchedData = () => {
    const data = filterProducts(allproducts, searchInput);
    setFilteredProducts(data);
  };
  function debounceing(func) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(args);
      }, 1000);
    };
  }

  const [searchInput, setSearchInput] = useState("");
  const starterDebounce = debounceing(searchedData);

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
        onKeyUp={starterDebounce}
      />
      <button className="search-btn" onClick={searchedData}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
