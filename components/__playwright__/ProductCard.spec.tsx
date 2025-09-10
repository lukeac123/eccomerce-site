import { test, expect } from "../../playwright/accessibilityTest";
import AxeBuilder from "@axe-core/playwright";
import { ProductCard } from "../ProductCard";
import { ProductType } from "../../utils";

const mockProduct: ProductType = {
  id: 10,
  description: "Product Description",
  title: "Product",
  thumbnail: "./thumnail",
  category: "",
  availabilityStatus: "Low Stock",
  price: 10.99,
};

test("Renders the Component", async ({ mount }) => {
  const component = await mount(
    <ProductCard product={mockProduct} productQuantity={1} />
  );

  const heading = await component.getByRole("heading", { name: "Product" });
  const image = await component.getByAltText("Product");

  await expect(heading).toBeVisible();
  await expect(image).toBeVisible();
});

test("Accessibility", async ({ page, mount }) => {
  await mount(<ProductCard product={mockProduct} productQuantity={1} />);
  const accessibilityScanResults = await new AxeBuilder({
    page: page,
  }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
