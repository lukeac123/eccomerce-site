import { ProductType } from "./types";

export function getCategories(products) {
  let productCategories = [];
  Object.values(products).forEach((product: ProductType) => {
    if (productCategories.includes(product.category)) return;
    productCategories.push(product.category);
  });
  return productCategories;
}

export function filterProducts(products, filter) {
  if (!filter) return products;
  return products.filter((product) => product.category === filter);
}
