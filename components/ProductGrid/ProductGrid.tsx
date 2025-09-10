"use client";
import {
  useShoppingCartContext,
  getCategories,
  filterProducts,
} from "../../utils";
import { ProductCard } from "../ProductCard";
import { Pagination } from "../Pagination";
import { ProductType } from "../../utils";
import { useState, useCallback, useEffect } from "react";
import "./ProductGrid.css";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const shoppingCartItems = useShoppingCartContext();
  const [filter, setFilter] = useState(null);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          page * itemsPerPage
        }`
      );
      if (!response.ok) {
        console.error(`Response is not valid ${response.status}`);
        setError(`Response is not valid ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  }, [page, itemsPerPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (error) return <div>{error.toString()}</div>;
  if (!products) return;

  const categories = getCategories(products);

  const filteredProducts = filterProducts(products, filter);

  const paginationChange = (pageChange: "increment" | "decrement") => {
    if (page === 0 && pageChange === "decrement") return;
    setPage((prev) => {
      return pageChange === "increment" ? prev + 1 : prev - 1;
    });
  };

  return (
    <>
      <div>
        {categories.map((category: string) => {
          return (
            <div key={category}>
              <input
                id={category}
                name={category}
                value={category}
                type="checkbox"
                checked={filter === category}
                onChange={(event) => setFilter(event.target.value)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          );
        })}
        <button onClick={() => setFilter(null)}>Reset</button>
      </div>
      <div className="productsContainer">
        {filteredProducts &&
          filteredProducts.map((product: ProductType) => {
            const productQuantity =
              shoppingCartItems[product.id] &&
              shoppingCartItems[product.id].qty;
            return (
              <ProductCard
                key={product.id}
                product={product}
                productQuantity={productQuantity}
              />
            );
          })}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        url={"https://dummyjson.com/products"}
        onPaginationChange={paginationChange}
        page={page}
      />
    </>
  );
};
