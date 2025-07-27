import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import { use } from "react";
import { CartContext } from "../store/cart-context";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  const { items: cartItems } = use(CartContext);

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch("http://localhost:3000/meals");

      if (!res.ok) {
        console.log("Error!!!");
      }

      const meals = await res.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.id}>
            {cartItem.name} ({cartItem.quantity})
          </li>
        ))}
      </ul>
      <ul id="meals">
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
