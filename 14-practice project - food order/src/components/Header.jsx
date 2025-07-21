import { use } from "react";
import logoImg from "../assets/logo.jpg";
import { CartContext } from "../store/cart-context";

export default function Header() {
  const { items: cartItems } = use(CartContext);
  const totalCartItems = cartItems.length;

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button className="text-button">Cart ({totalCartItems})</button>
      </nav>
    </header>
  );
}
