"use client";
import { useEffect, useState, memo } from "react";

interface PaginationType {
  url: string;
  onPaginationChange: (direction) => void;
  page: number;
  itemsPerPage: number;
}

export const Pagination = memo(
  ({ url, onPaginationChange, page, itemsPerPage }: PaginationType) => {
    const [dataLength, setDataLength] = useState<number>(null);

    const handlePaginationChange = (direction) => {
      onPaginationChange(direction);
    };

    useEffect(() => {
      async function getData() {
        try {
          const response = await fetch(url);
          if (!response.ok) return console.log("error fetching data");
          const data = await response.json();
          setDataLength(data.products.length);
        } catch (error) {
          console.log(error.message);
        }
      }
      setTimeout(getData, 3000);
    }, []);

    return (
      <div>
        <button onClick={() => handlePaginationChange("decrement")}>
          Previous Page
        </button>
        <span>
          {page + 1}&nbsp;
          {dataLength && `of ${Math.ceil(dataLength / itemsPerPage)}`}
        </span>
        <button onClick={() => handlePaginationChange("increment")}>
          Next Page
        </button>
      </div>
    );
  }
);
