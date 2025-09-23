"use client";
import {
  useShoppingCartContext,
  filterProducts,
  ProductType,
} from "../../utils";
import { ProductCard } from "../ProductCard";
import { Pagination } from "../Pagination";
import { useState, useCallback, useEffect } from "react";
import "./ProductGrid.css";

interface ProductGridType {
  initialProducts: ProductType[];
  itemsPerPage: number;
}

export const ProductGrid = ({
  initialProducts,
  itemsPerPage,
}: ProductGridType) => {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const shoppingCartItems = useShoppingCartContext();
  const [filter, setFilter] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [noMoreProducts, setNoMoreProducts] = useState(false);
  const [categories, setCategories] = useState<[] | null>(null);
  const filteredProducts = filterProducts(products, filter);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        if (!response.ok) {
          console.error(`Error loading categories ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(
            `Error in categories fetch, ProductGrid.tsx, ${error.message}`
          );
        }
      }
    }
    getCategories();
  }, []);

  const handleLoadMoreProducts = () => {
    getData(filter, page);
  };

  // On filter change, reset set the filter and return back to page 1
  const handleFilterChange = (filter: string | null) => {
    setPage(0);
    setNoMoreProducts(false);
    setFilter(filter);
    getData(filter, 0);
  };

  const getData = useCallback(
    async (filter: string | null, page: number) => {
      setLoading(true);
      try {
        const url =
          filter === "" || !filter
            ? `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
                page * itemsPerPage
              }`
            : `https://dummyjson.com/products/category/${filter}?limit=${itemsPerPage}&skip=${
                page * itemsPerPage
              }`;
        const response = await fetch(url, { next: { revalidate: 3600 } });
        if (!response.ok) {
          console.error(`${response.status}`);
          throw new Error(`${response.status}`);
        }
        const data = await response.json();

        if (data.products.length === 0) {
          setNoMoreProducts(true);
          setLoading(false);
          return;
        }

        // Check if load more products or change filter
        page === 0
          ? setProducts(data.products)
          : setProducts((prev) => [...prev, ...data.products]);

        setLoading(false);
        setPage((prev) => prev + 1);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Error, ProductGrid.tsx, ${error.message}`);
        }
        setLoading(false);
      }
    },
    [page, filter, itemsPerPage]
  );

  return (
    <>
      <div>
        {categories &&
          categories.map((category: { name: string; slug: string }) => {
            return (
              <div key={category.name}>
                <input
                  id={category.slug}
                  name={category.slug}
                  value={category.slug}
                  type="checkbox"
                  checked={filter === category.slug}
                  onChange={(event) => handleFilterChange(event.target.value)}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            );
          })}
        <button onClick={() => handleFilterChange("")}>Reset</button>
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
      <>{noMoreProducts && "No More Products"}</>
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
