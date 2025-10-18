import { create } from "zustand";

import { ProductType } from ".";
import { ProductCard } from "@/components";

type State = {
  products: ProductType[];
};

type Action = {
  updateShoppingCart: (product: ProductType) => void;
};

export const useShoppingCartStore = create<State & Action>((set) => ({
  products: [],
  updateShoppingCart: (product: ProductType) =>
    set((state) => ({ products: [...state.products, product] })),
  incrementItem: (product: ProductType) =>
    set((state) => ({ products: [...state.products, product] })),

  clearShoppingCart: () => set((state) => ({ products: [] })),
}));
