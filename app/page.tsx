"use client";
import { AppHeader } from "../components";
import { ShoppingCartStateProvider } from "../utils/ShoppingCartState";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./page.module.css";
const ProductGrid = lazy(async () => import("../components/ProductGrid"));

function Fallback({ error, resetErrorBoundary }) {
  resetErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong: {error.message}</p>
    </div>
  );
}

export default function Home() {
  return (
    <ShoppingCartStateProvider>
      <AppHeader />
      <div className={styles.appContent}>
        <h2>Product Items</h2>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Suspense fallback={<>...Loading Product Items</>}>
            <ProductGrid />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ShoppingCartStateProvider>
  );
}
