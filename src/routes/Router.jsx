import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";
import Meals from "../components/Meals";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Orders from "../components/Orders";
import { useRoutes } from "react-router-dom";
const Router = () => {
  let element = useRoutes([
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </>
      ),
    },
    {
      path: "/orders",
      element: (
        <>
          <Orders />
          <Cart />
        </>
      ),
    },
  ]);
  return element;
};

export default Router;
