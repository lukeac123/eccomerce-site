import { IconShoppingBag } from "@tabler/icons-react";
import {
  ProductType,
  useShoppingCartContext,
  useShoppingCartReducer,
} from "../../utils";
import { IncrementComponent } from "../IncrementComponent/IncrementComponent";
import { IconSquareX } from "@tabler/icons-react";
import "./ShoppingCart.css";

export const ShoppingCart = () => {
  const shoppingCartItems = useShoppingCartContext();

  const dispatch = useShoppingCartReducer();

  const shoppingCartTotal = () => {
    return Object.keys(shoppingCartItems).reduce((acc, productId) => {
      return (
        acc +
        shoppingCartItems[productId].price * shoppingCartItems[productId].qty
      );
    }, 0);
  };

  return (
    <>
      <button
        aria-label="shopping cart popover trigger"
        popoverTarget="shoppingCartPopover"
        className="shoppingCartIcon"
      >
        <IconShoppingBag aria-hidden />
      </button>
      <div
        aria-label="shoppingCartPopver"
        id="shoppingCartPopover"
        className="shoppingCart"
        popover="manual"
      >
        <button
          aria-label="shopping cart close button"
          popoverTarget="shoppingCartPopover"
          popoverTargetAction="hide"
        >
          <IconSquareX aria-hidden />
        </button>
        <h2>Shopping Cart</h2>
        {Object.values(shoppingCartItems).map((product: ProductType) => {
          const { title, description, thumbnail, qty, id } = product;
          if (qty <= 0) return;
          return (
            <div key={id}>
              <h2>{title}</h2>
              <div>{description}</div>
              <img src={thumbnail} />
              <IncrementComponent product={product} productQuantity={qty} />
            </div>
          );
        })}
        <div>Total:{`${shoppingCartTotal()}`}</div>
        <button onClick={() => dispatch({ type: "CLEAR_BASKET" })}>
          clear basket
        </button>
      </div>
    </>
  );
};
