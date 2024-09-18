import { Link } from "react-router-dom";
import "../styles/OrdersDetails.css";

const OrdersDetails = () => {
  return (
    <div className="order-details">
      <div className="not-yet-ordered">
        <h1>You Haven't Placed Any Order Yet</h1>
        <h3>Hit the below button and start creating your first order</h3>
        <Link to="/">
          <button className="shop-now-btn">Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default OrdersDetails;
