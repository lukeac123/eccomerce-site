"use client";
import { IncrementComponentTypes, useShoppingCartReducer } from "../../utils";
import { IconShoppingBagPlus, IconShoppingBagMinus } from "@tabler/icons-react";
import "./IncrementComponent.css";

export const IncrementComponent = ({
  productQuantity,
  product,
}: IncrementComponentTypes) => {
  const dispatch = useShoppingCartReducer();

  return (
    <div className="incrementComponent">
      {productQuantity >= 0 ? (
        <>
          <button
            aria-label="decrement quantity"
            onClick={() => dispatch({ type: "DECREMENT_ITEM", item: product })}
          >
            <IconShoppingBagMinus />
          </button>
          <input
            aria-label="product quantity"
            type="number"
            value={productQuantity}
            onChange={(event) =>
              dispatch({ type: "CUSTOM_INPUT", item: product, event: event })
            }
          />
          <button
            aria-label="increment quantity"
            onClick={() => dispatch({ type: "INCREMENT_ITEM", item: product })}
          >
            <IconShoppingBagPlus />
          </button>
        </>
      ) : (
        <button
          aria-label="add to cart"
          onClick={() => dispatch({ type: "ADD_TO_BASKET", item: product })}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};
