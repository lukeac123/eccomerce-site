"use client";
import { memo } from "react";

interface PaginationType {
  url: string;
  handleLoadMoreProducts: () => void;
  page: number;
  itemsPerPage: number;
}

export const Pagination = memo(({ handleLoadMoreProducts }: PaginationType) => {
  return (
    <div>
      <button onClick={() => handleLoadMoreProducts()}>
        Load More Products
      </button>
    </div>
  );
});
