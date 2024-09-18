import { useState } from "react";
import "../styles/AccountPage.css";
import OrdersDetails from "./OrdersDetails";
import ProfileDetails from "./ProfileDetails";
import WalletDetails from "./WalletDetails";

const AccountPage = () => {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileDetails />;
      case "orders":
        return <OrdersDetails />;
      case "wallet":
        return <WalletDetails />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="account-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>My Account</h2>
        <ul>
          <li
            className={activeSection === "profile" ? "selected" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile Details
          </li>
          <li
            className={activeSection === "orders" ? "selected" : ""}
            onClick={() => setActiveSection("orders")}
          >
            Orders
          </li>
          <li
            className={activeSection === "wallet" ? "selected" : ""}
            onClick={() => setActiveSection("wallet")}
          >
            Wallet
          </li>
        </ul>
      </div>

      {/* Render the active section */}
      <div className="content-section">{renderSection()}</div>
    </div>
  );
};

export default AccountPage;
