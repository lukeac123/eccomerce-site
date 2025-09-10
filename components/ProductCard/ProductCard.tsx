import { memo } from "react";
import { ProductCardType } from "../types";
import { IncrementComponent } from "../IncrementComponent/IncrementComponent";
import "./ProductCard.css";

export const ProductCard = memo(
  ({ product, productQuantity }: ProductCardType) => {
    const { title, description, thumbnail, category, availabilityStatus } =
      product;

    return (
      <div className="productCard">
        <div className="productCardContent">
          <img src={thumbnail} className="productCardImage" alt={title} />
          <h2>{title}</h2>
          <div>{description}</div>
          <div>{category}</div>
          <div>{availabilityStatus}</div>
          <IncrementComponent
            product={product}
            productQuantity={productQuantity}
          />
        </div>
      </div>
    );
  }
);
