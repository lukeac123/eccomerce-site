import { reducer } from "./ShoppingCartState";
import { ProductType, ShoppingCartContextType } from "./types";

//TODO: Test CUSTOM_INPUT - passing event rather than the product

const mockProducts: ShoppingCartContextType = {
  ["1"]: {
    id: 1,
    description: "Product Description 1",
    title: "Product Name 1",
    thumbnail: "./thumnail",
    category: "",
    availabilityStatus: "Low Stock",
    price: 10.99,
    qty: 5,
  },
  ["3"]: {
    id: 3,
    description: "Product Description 3",
    title: "Product Name 3",
    thumbnail: "./thumnail",
    category: "",
    availabilityStatus: "Low Stock",
    price: 10.99,
    qty: 2,
  },
};

const mockProductNew: ProductType = {
  id: 2,
  description: "Product Description 2",
  title: "Product Name 2",
  thumbnail: "./thumnail",
  category: "",
  availabilityStatus: "Low Stock",
  price: 10.99,
};

const mockProductExisting: ProductType = {
  id: 1,
  description: "Product Description 1",
  title: "Product Name 1",
  thumbnail: "./thumnail",
  category: "",
  availabilityStatus: "Low Stock",
  price: 10.99,
  qty: 5,
};

const mockProductCustomQty: ProductType = {
  id: 1,
  description: "Product Description 1",
  title: "Product Name 1",
  thumbnail: "./thumnail",
  category: "",
  availabilityStatus: "Low Stock",
  price: 10.99,
  qty: 10,
};

test("Component Added To Basket", async () => {
  const result = reducer(mockProducts, {
    type: "ADD_TO_BASKET",
    item: mockProductNew,
  });

  expect(result[2].qty).toBe(1);
});

test("Increment Product Quantity ", async () => {
  const result = reducer(mockProducts, {
    type: "INCREMENT_ITEM",
    item: mockProductExisting,
  });

  expect(result[1].qty).toBe(6);
});

test("Decrement Product Quantity", async () => {
  const result = reducer(mockProducts, {
    type: "DECREMENT_ITEM",
    item: mockProductExisting,
  });

  expect(result[1].qty).toBe(4);
});

test("Clear Basket", async () => {
  const result = reducer(mockProducts, {
    type: "CLEAR_BASKET",
    item: mockProductExisting,
  });

  expect(Object.keys(result).length).toBe(0);
});
