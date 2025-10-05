"use client";
import { usePathname, useRouter } from "next/navigation";

interface PaginationType {
  selectedCategory: string;
  currentPage: number;
}

export const Pagination = ({
  selectedCategory,
  currentPage,
}: PaginationType) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePagination = (selectedCategory: string) => {
    currentPage = currentPage + 1;
    router.push(`${pathname}?category=${selectedCategory}&page=${currentPage}`);
  };

  return (
    <div>
      {currentPage}
      <button onClick={() => handlePagination(selectedCategory)}>
        Load More Products
      </button>
    </div>
  );
};
