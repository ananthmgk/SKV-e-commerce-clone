import "../styles/Categories.css";
import houseHoldItemsImage from "../assets/Images/categories/Household Items.png";
import trendingNowImage from "../assets/Images/categories/Trending Now.png";
import toysAndSportsAndGiftsImage from "../assets/Images/categories/Toy's And Sports & Gift.webp";
import fashionImage from "../assets/Images/categories/Fashion.png";
import newArrivalsItemsImage from "../assets/Images/categories/New Arrivals Items.jpg";
import kitchenAccessoriesImage from "../assets/Images/categories/Kitchen Accessories.webp";
import gadgetsImages from "../assets/Images/categories/Gadgets.png";
import cleaningSuppliesImages from "../assets/Images/categories/Cleaning Supplies.png";
import automotiveImages from "../assets/Images/categories/Automotive.png";
import funGiftsImages from "../assets/Images/categories/Fun Gifts.webp";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Household Items",
    image: houseHoldItemsImage,
    link: "house-hold-41613",
  },
  {
    name: "Trending Now",
    image: trendingNowImage,
    link: "hot-selling-items-41613",
  },
  {
    name: "Toys And Sports & Gifts",
    image: toysAndSportsAndGiftsImage,
    link: "toys-41613",
  },
  {
    name: "Fashion",
    image: fashionImage,
    link: "fashion-41613",
  },
  {
    name: "New Arrivals Items",
    image: newArrivalsItemsImage,
    link: "new-arrivals-items-41613",
  },
  {
    name: "Kitchen Accessories",
    image: kitchenAccessoriesImage,
    link: "kitchen-tool-41613",
  },
  {
    name: "Gadgets",
    image: gadgetsImages,
    link: "mobile-accessories-41613",
  },
  {
    name: "Cleaning Supplies",
    image: cleaningSuppliesImages,
    link: "clinging-supplies-41613",
  },
  {
    name: "Automotive",
    image: automotiveImages,
    link: "automotive-41613",
  },
  {
    name: "Fun Gifts",
    image: funGiftsImages,
    link: "fun-gifts-41613",
  },
];

const Categories = () => {
  return (
    <div className="categories">
      {categories.map((category, index) => (
        <Link to={"/category/" + category.link} key={index}>
          <div className="category-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
