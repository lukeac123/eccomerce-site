import { ProductType, ReviewType } from "@/utils";
import { use } from "react";
import "./page.css";

function removeDuplicates(arr: ReviewType[]) {
  return arr.reduce((acc: ReviewType[], review: ReviewType) => {
    if (acc.some((element) => element.reviewerEmail === review.reviewerEmail))
      return acc;
    acc.push(review);
    return acc;
  }, []);
}

async function getData(productId: string) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {}
}

export default function Page({ params }: any) {
  const { productId }: { productId: string } = use(params);

  const product: ProductType = use(getData(productId));

  // Only one review per user per product
  const reviews = removeDuplicates(product.reviews);

  return (
    <div>
      <h1>{product.title}</h1>
      <ul>
        <li>{product.description}</li>
        <li>{product.price}</li>
        <li>{product.brand}</li>
        <li>{product.category}</li>
      </ul>
      <img src={product.thumbnail}></img>

      <div>
        {reviews.map((review: ReviewType) => {
          return (
            <ul key={`${review.reviewerEmail}`}>
              <li>{review.reviewerName}</li>
              <li>{review.rating}</li>
              <li>{review.date.slice(0, 10)}</li>
              <li>{review.comment}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
