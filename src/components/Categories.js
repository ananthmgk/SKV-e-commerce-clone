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

const categories = [
  { name: "Household Items", image: houseHoldItemsImage },
  { name: "Trending Now", image: trendingNowImage },
  { name: "Toys And Sports & Gifts", image: toysAndSportsAndGiftsImage },
  { name: "Fashion", image: fashionImage },
  { name: "New Arrivals Items", image: newArrivalsItemsImage },
  { name: "Kitchen Accessories", image: kitchenAccessoriesImage },
  { name: "Gadgets", image: gadgetsImages },
  { name: "Cleaning Supplies", image: cleaningSuppliesImages },
  { name: "Automotive", image: automotiveImages },
];

const Categories = () => {
  return (
    <div className="categories">
      {categories.map((category, index) => (
        <div key={index} className="category-card">
          <img src={category.image} alt={category.name} />
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Categories;
