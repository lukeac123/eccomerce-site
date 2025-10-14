"use client";

import { startTransition, useState } from "react";
import { setPage } from "./action";

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = () => {
    setCurrentPage((prev) => prev + 1);
    startTransition(() => {
      setPage(`${currentPage}`);
    });
  };

  return (
    <div>
      {currentPage}
      <button onClick={handlePagination}>Load More Products</button>
    </div>
  );
};
