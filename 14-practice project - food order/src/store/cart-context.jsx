import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  handleAddItemToCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_NEW_ITEM") {
    const updatedItems = [...state.items];

    const exsistingMealIndex = updatedItems.findIndex(
      (meal) => meal.id === action.payload.id
    );

    if (exsistingMealIndex >= 0) {
      // meal already exist
      updatedItems[exsistingMealIndex] = {
        ...updatedItems[exsistingMealIndex],
        quantity: updatedItems[exsistingMealIndex].quantity + 1,
      };
    } else {
      updatedItems.push({ ...action.payload, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextWrap({ children }) {
  const [shoppingCart, shoppingCartDispatcher] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddMealToCart(mealData) {
    shoppingCartDispatcher({
      type: "ADD_NEW_ITEM",
      payload: mealData,
    });
  }

  const contextValue = {
    items: shoppingCart.items,
    handleAddMealToCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
