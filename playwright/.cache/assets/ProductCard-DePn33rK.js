import { j as jsxRuntimeExports, I as IncrementComponent } from './IncrementComponent-3KFjqHKX.js';
import { r as reactExports } from './index-DyEZL--u.js';

const ProductCard = reactExports.memo(
  ({ product, productQuantity }) => {
    const { title, description, thumbnail, category, availabilityStatus } = product;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "productCard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "productCardContent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnail, className: "productCardImage", alt: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: availabilityStatus }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IncrementComponent,
        {
          product,
          productQuantity
        }
      )
    ] }) });
  }
);

export { ProductCard };
//# sourceMappingURL=ProductCard-DePn33rK.js.map
