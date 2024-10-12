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
import Cart from "./components/Cart";
import { Provider } from "react-redux"; // this is for redux
import { PersistGate } from "redux-persist/integration/react"; // this is to save the data even after refreshed..
import { store, persistor } from "./redux/store"; // here persistor also to save the data.

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

      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={appRouter} />
    </PersistGate>
  </Provider>
);
