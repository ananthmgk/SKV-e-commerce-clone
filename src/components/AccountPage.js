import { useState } from "react";
import "../styles/AccountPage.css";
import OrdersDetails from "./OrdersDetails";
import ProfileDetails from "./ProfileDetails";
import WalletDetails from "./WalletDetails";

const AccountPage = () => {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState("account-page-profile");

  const renderSection = () => {
    switch (activeSection) {
      case "account-page-profile":
        return <ProfileDetails />;
      case "account-page-orders":
        return <OrdersDetails />;
      case "account-page-wallet":
        return <WalletDetails />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="account-page-container">
      {/* Sidebar */}
      <div className="account-page-sidebar">
        <h2>My Account</h2>
        <ul>
          <li
            className={
              activeSection === "account-page-profile"
                ? "account-page-selected"
                : ""
            }
            onClick={() => setActiveSection("account-page-profile")}
          >
            Profile Details
          </li>
          <li
            className={
              activeSection === "account-page-orders"
                ? "account-page-selected"
                : ""
            }
            onClick={() => setActiveSection("account-page-orders")}
          >
            Orders
          </li>
          <li
            className={
              activeSection === "account-page-wallet"
                ? "account-page-selected"
                : ""
            }
            onClick={() => setActiveSection("account-page-wallet")}
          >
            Wallet
          </li>
        </ul>
      </div>

      {/* Render the active section */}
      <div className="account-page-content-section">{renderSection()}</div>
    </div>
  );
};

export default AccountPage;
