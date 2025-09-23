import { AppHeader } from "../components";
import { Suspense, lazy } from "react";
import "./page.css";

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
    //TODO: Needs to be a better fallback than just the appHeader ?
    return (
      <>
        <AppHeader />
      </>
    );
  }
  const data = await response.json();

  const products = data.products;
  return (
    <div className="homePage">
      <h2>Product Items</h2>
      <Suspense fallback={<>...Loading Product Items</>}>
        <ProductGrid initialProducts={products} itemsPerPage={itemsPerPage} />
      </Suspense>
    </div>
  );
}
