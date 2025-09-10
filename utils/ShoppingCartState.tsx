"use client";
import { useContext, createContext, useReducer, Dispatch } from "react";
import { ProductType, ShoppingCartContextType, ActionTypes } from "./types";

export const ShoppingCartContext = createContext<ShoppingCartContextType>({});

export const useShoppingCartContext = () => useContext(ShoppingCartContext);

export const ShoppingCartReducer = createContext<Dispatch<ActionTypes>>(null);

export const useShoppingCartReducer = () => useContext(ShoppingCartReducer);

const initialItems: ProductType | {} = {};

export const reducer = (
  shoppingCartItems: ShoppingCartContextType,
  action: ActionTypes
) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const newItem: ProductType = action.item;
      return {
        ...shoppingCartItems,
        [newItem.id]: {
          ...newItem,
          qty: shoppingCartItems[newItem.id]
            ? shoppingCartItems[newItem.id].qty + 1
            : 1,
        },
      };
    case "INCREMENT_ITEM":
      const incrementItem = action.item;
      return {
        ...shoppingCartItems,
        [incrementItem.id]: {
          ...incrementItem,
          qty: shoppingCartItems[incrementItem.id].qty + 1,
        },
      };
    case "DECREMENT_ITEM":
      const decrementItem = action.item;
      return {
        ...shoppingCartItems,
        [decrementItem.id]: {
          ...decrementItem,
          qty: shoppingCartItems[decrementItem.id].qty - 1,
        },
      };
    case "CLEAR_BASKET":
      return {};
    case "CUSTOM_INPUT":
      const inputValue = action.event.target.value;
      const customInputItem = action.item;
      return {
        ...shoppingCartItems,
        [customInputItem.id]: {
          ...customInputItem,
          qty: inputValue,
        },
      };
  }
};

export const ShoppingCartStateProvider = ({ children }) => {
  const [shoppingCartItems, dispatch] = useReducer(reducer, initialItems);

  return (
    <ShoppingCartContext.Provider value={shoppingCartItems}>
      <ShoppingCartReducer.Provider value={dispatch}>
        {children}
      </ShoppingCartReducer.Provider>
    </ShoppingCartContext.Provider>
  );
};
