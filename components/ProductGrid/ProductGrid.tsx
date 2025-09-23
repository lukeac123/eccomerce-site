"use client";
import {
  useShoppingCartContext,
  getCategories,
  filterProducts,
} from "../../utils";
import { ProductCard } from "../ProductCard";
import { Pagination } from "../Pagination";
import { ProductType } from "../../utils";
import { useState, useCallback, ChangeEvent } from "react";
import "./ProductGrid.css";

//TODO: Filter undefined on first function call so throwing error

export const ProductGrid = ({
  initialProducts,
  itemsPerPage,
}: {
  initialProducts: ProductType[];
  itemsPerPage: number;
}) => {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const shoppingCartItems = useShoppingCartContext();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const categories = getCategories(products);

  const filteredProducts = filterProducts(products, filter);

  const handleLoadMoreProducts = () => {
    getData();
    setPage((prev) => prev + 1);
  };

  const handleNewFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    getData();
  };

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${filter}?limit=20&skip=20`,
        { next: { revalidate: 3600 } }
      );
      if (!response.ok) {
        console.error(`${response.status}`);
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      setProducts((prev) => [...prev, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [page, filter]);

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
                onChange={(event) => handleNewFilter(event)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          );
        })}
        <button onClick={() => setFilter("")}>Reset</button>
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
      <>{loading && "...Loading More Products"}</>
      <Pagination
        itemsPerPage={itemsPerPage}
        url={"https://dummyjson.com/products"}
        handleLoadMoreProducts={handleLoadMoreProducts}
        page={page}
      />
    </>
  );
};
