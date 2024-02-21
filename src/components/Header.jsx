import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function Header() {
  const cartCtx = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showcart();
  }
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/auth/login");
  }
  function handleOrders() {
    navigate("/orders");
  }
  function handleHome() {
    navigate("/");
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        {location.pathname === "/" ? (
          <Button textOnly onClick={handleOrders}>
            Orders
          </Button>
        ) : (
          <Button textOnly onClick={handleHome}>
            Home
          </Button>
        )}
        <Button textOnly onClick={handleShowCart}>
          Cart {totalCartItems}
        </Button>
        <Button textOnly onClick={handleLogout}>
          Logout
        </Button>
      </nav>
    </header>
  );
}
