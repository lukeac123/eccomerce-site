import { cookies } from "next/headers";
import { ProductType } from "../../utils";
import { ProductCard } from "../ProductCard";
import "./ProductList.css";

interface ProductListType {
  selectedCategory?: string;
  itemsPerPage: number;
  currentPage: number;
}

let products: [] = [];
let newProductsData: [] = [];

export async function ProductList({ itemsPerPage }: ProductListType) {
  const cookieStore = await cookies();
  const selectedCategory = cookieStore.get("category")?.value ?? "";

  const currentPage = parseInt(cookieStore.get("page")?.value ?? 0);

  const fetchUrl =
    selectedCategory === ""
      ? `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          currentPage * itemsPerPage
        }`
      : `https://dummyjson.com/products/category/${selectedCategory}?limit=${itemsPerPage}&skip=${
          currentPage * itemsPerPage
        }`;

  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    newProductsData = data.products;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  // console.log(selectedCategory, currentPage, products, newProductsData);

  products =
    currentPage > 0 ? [...products, ...newProductsData] : newProductsData;

  return (
    <div className="productsContainer">
      {products.map((product: ProductType) => {
        // const productQuantity =
        //   [product.id] && shoppingCartItems[product.id].qty;
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
