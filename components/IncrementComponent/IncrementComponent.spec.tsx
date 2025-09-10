import { IncrementComponent } from "./IncrementComponent";
import { test, expect } from "../../playwright/accessibilityTest";
import AxeBuilder from "@axe-core/playwright";
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

test("Add To Basket Button Is Visible on Inital Render", async ({ mount }) => {
  const component = await mount(
    <IncrementComponent product={mockProduct} productQuantity={undefined} />
  );
  const addToBasketButton = component.getByRole("button", {
    name: "add to cart",
  });
  await expect(addToBasketButton).toBeVisible();
});

test("Correct quanity is shown in input field", async ({ mount }) => {
  const component = await mount(
    <IncrementComponent product={mockProduct} productQuantity={1} />
  );
  const textbox = await component.getByLabel("product quantity");
  await expect(textbox).toHaveValue("1");
});

test("Accessibility", async ({ page, mount }) => {
  await mount(<IncrementComponent product={mockProduct} productQuantity={1} />);
  const accessibilityScanResults = await new AxeBuilder({
    page: page,
  }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
