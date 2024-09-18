import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProductsMenu from "./components/ProductsMenu";
import CategoryCard from "./components/CategoryCard";
import CategoryMenu from "./components/CategoryMenu";
import AccountPage from "./components/AccountPage";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },

      {
        path: "/about-us",
        element: <AboutUs />,
      },

      {
        path: "/contact-us",
        element: <ContactUs />,
      },

      {
        path: "/product/:ProductMenuId",
        element: <ProductsMenu />,
      },

      {
        path: "/category/:CategoryCardId",
        element: <CategoryCard />,
      },

      {
        path: "/categoryMenu/:CategoryMenuId",
        element: <CategoryMenu />,
      },

      {
        path: "/account",
        element: <AccountPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
