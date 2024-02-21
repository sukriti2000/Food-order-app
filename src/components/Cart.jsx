import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartItem from "./UI/CartItem";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleCloseCart() {
    UserProgressCtx.hideCart();
  }
  function handleGoToCheckout(){
    UserProgressCtx.showCheckout();
  }
  return (
    <Modal className="cart" open={UserProgressCtx.progress === "cart"} onClose={UserProgressCtx.progress === "cart"?handleCloseCart:null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
        
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onDecrease={()=>cartCtx.removeItem(item.id)}
              onIncrease={()=>cartCtx.addItem(item)}
            />
         
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)} </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length>0 && (<Button onClick={handleGoToCheckout}>Go to Checkout</Button>)}
      </p>
    </Modal>
  );
}
