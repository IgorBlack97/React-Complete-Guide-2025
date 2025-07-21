import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextWrap from "./store/cart-context";

function App() {
  return (
    <CartContextWrap>
      <Header />
      <Meals />
    </CartContextWrap>
  );
}

export default App;
