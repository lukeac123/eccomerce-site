import { u as useShoppingCartContext, a as useShoppingCartReducer, j as jsxRuntimeExports, b as IconShoppingBag, c as IconSquareX, I as IncrementComponent } from './IncrementComponent-3KFjqHKX.js';
import './index-DyEZL--u.js';

const ShoppingCart = () => {
  const shoppingCartItems = useShoppingCartContext();
  const dispatch = useShoppingCartReducer();
  const shoppingCartTotal = () => {
    return Object.keys(shoppingCartItems).reduce((acc, productId) => {
      return acc + shoppingCartItems[productId].price * shoppingCartItems[productId].qty;
    }, 0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        "aria-label": "shopping cart popover trigger",
        popoverTarget: "shoppingCartPopover",
        className: "shoppingCartIcon",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconShoppingBag, { "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "aria-label": "shoppingCartPopver",
        id: "shoppingCartPopover",
        className: "shoppingCart",
        popover: "manual",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              "aria-label": "shopping cart close button",
              popoverTarget: "shoppingCartPopover",
              popoverTargetAction: "hide",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSquareX, { "aria-hidden": true })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Shopping Cart" }),
          Object.values(shoppingCartItems).map((product) => {
            const { title, description, thumbnail, qty, id } = product;
            if (qty <= 0) return;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnail }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IncrementComponent, { product, productQuantity: qty })
            ] }, id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "Total:",
            `${shoppingCartTotal()}`
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dispatch({ type: "CLEAR_BASKET" }), children: "clear basket" })
        ]
      }
    )
  ] });
};

export { ShoppingCart };
//# sourceMappingURL=ShoppingCart-BbB3OjZU.js.map
