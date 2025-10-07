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

export async function ProductList({
  selectedCategory,
  currentPage,
  itemsPerPage,
}: ProductListType) {
  // For sharing the url, if products.length < 1, then load in all products. don't skip any

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
