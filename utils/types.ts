import { ChangeEvent } from "react";

export interface ShoppingCartContextType {
  [key: string]: ProductType;
}

export interface ActionTypes {
  type:
    | "ADD_TO_BASKET"
    | "INCREMENT_ITEM"
    | "DECREMENT_ITEM"
    | "CLEAR_BASKET"
    | "CUSTOM_INPUT";
  item?: ProductType;
  event?: ChangeEvent<HTMLInputElement>;
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  availabilityStatus: "In Stock" | "Low Stock";
  qty?: number;
  price: number;
}

export interface ProductCardType {
  product: ProductType;
  productQuantity?: number;
}

export interface IncrementComponentTypes {
  productQuantity: number;
  product: ProductType;
}
