"use client";
import { ProductType } from "../../utils";
import { ProductCard } from "../ProductCard";
import "./ProductList.css";
import { useQuery } from "@tanstack/react-query";

interface ProductListType {
  selectedCategory?: string;
  itemsPerPage: number;
  currentPage: number;
}

let newProductsData: [] = [];

export function ProductList({
  selectedCategory,
  currentPage,
  itemsPerPage,
}: ProductListType) {
  const fetchUrl =
    selectedCategory === ""
      ? `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          currentPage * itemsPerPage
        }`
      : `https://dummyjson.com/products/category/${selectedCategory}?limit=${itemsPerPage}&skip=${
          currentPage * itemsPerPage
        }`;

  // Status - information about the data: Do we have any or not?
  // fetchStatus gives information about the queryFn: Is it running or not?
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(fetchUrl).then((res) => res.json()),
  });

  if (isPending) return <>...loading</>;

  if (error) return <>{error.message}</>;

  // products =
  //   currentPage > 0 ? [...products, ...newProductsData] : newProductsData;

  return (
    <div className="productsContainer">
      {data &&
        data.products.map((product: ProductType) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              // productQuantity={productQuantity}
            />
          );
        })}
      {newProductsData.length < 1 && <>No More Products</>}
    </div>
  );
}
