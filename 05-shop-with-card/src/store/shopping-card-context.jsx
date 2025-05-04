import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const ShopCardContext = createContext({
  items: [],
  handleAddItemToCart: () => {},
  handleUpdateCartItemQuantity: () => {},
});

export default function ShoppingCartContext({ children }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return updatedItems;
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return updatedItems;
    });
  }

  const contextValue = {
    items: shoppingCart,
    handleAddItemToCart,
    handleUpdateCartItemQuantity,
  };

  return (
    <ShopCardContext.Provider value={contextValue}>
      {children}
    </ShopCardContext.Provider>
  );
}
