import { AppHeader } from "../components";
import { ShoppingCartStateProvider } from "../utils/ShoppingCartState";
import { Suspense, lazy } from "react";
import styles from "./page.module.css";

const ProductGrid = lazy(async () => import("../components/ProductGrid"));

export default async function Home() {
  const itemsPerPage = 20;
  // Refresh data every hour
  const response = await fetch(
    `https://dummyjson.com/products?limit=${itemsPerPage}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!response.ok) {
    console.error(response.status);
    return (
      <>
        <AppHeader />
      </>
    );
  }
  const data = await response.json();

  const products = data.products;
  return (
    <ShoppingCartStateProvider>
      <AppHeader />
      <div className={styles.appContent}>
        <h2>Product Items</h2>
        <Suspense fallback={<>...Loading Product Items</>}>
          <ProductGrid initialProducts={products} itemsPerPage={itemsPerPage} />
        </Suspense>
      </div>
    </ShoppingCartStateProvider>
  );
}
