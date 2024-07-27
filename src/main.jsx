import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./toolkit/store.js";
import { Provider } from "react-redux";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import AddPage from "./pages/AddPage/AddPage.jsx";
import ListPage from "./pages/ListPage/ListPage.jsx";
import OrderPage from "./pages/OrderPage/OrderPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <PlaceOrder />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        path: "add",
        element: <AddPage />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "orderList",
        element: <OrderPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
