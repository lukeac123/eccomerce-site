import { Suspense } from "react";
import { FilterForm, ProductList, Pagination } from "../components";
import styles from "./page.module.css";

//TODO: Look at how many times components are re-rendering, Padingation seems to re-render a lot
//TODO: Stop page from scrolling back to the top on re-renders
//TODO: Maybe Add limit and skip to give more flexibility. If i want to share the url with someone else,
// will it load all the poroducts ? Maybe pagination shouldn't use search url ??

const ITEMS_PER_PAGE = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = await searchParams;

  const selectedCategory = params.category ?? "";
  const currentPage = parseInt(params.page ?? 0);

  return (
    <div className={styles.appContent}>
      <h2>Product Items</h2>
      {/* <FilterForm /> */}
      <Suspense fallback={<>...Fallback</>}>
        <ProductList
          selectedCategory={selectedCategory}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
        />
      </Suspense>
      {/* <Pagination
        selectedCategory={selectedCategory}
        currentPage={currentPage}
      /> */}
    </div>
  );
}
