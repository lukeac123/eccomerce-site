import { test, expect } from "../../playwright/accessibilityTest";
import AxeBuilder from "@axe-core/playwright";
import { ShoppingCart } from "./ShoppingCart";

test("Popover Trigger + classes applied", async ({ mount }) => {
  const component = await mount(<ShoppingCart />);
  const basketButton = component.getByRole("button", {
    name: "shopping cart popover",
  });
  await basketButton.click();
  const basket = component.getByLabel("ShoppingCartPopver");

  await expect(basket).toBeVisible();
  await expect(basket).toHaveClass("shoppingCart");
});

test("Close Button", async ({ mount }) => {
  const component = await mount(<ShoppingCart />);
  const shoppingCartTrigger = component.getByRole("button", {
    name: "shopping cart popover",
  });
  await shoppingCartTrigger.click();
  const basket = component.getByLabel("ShoppingCartPopver");

  await expect(basket).toBeVisible();
});

test("Shopping cart remains open on click away", async ({ mount }) => {
  const component = await mount(<ShoppingCart />);
  const shoppingCartTrigger = component.getByRole("button", {
    name: "shopping cart popover",
  });
  await shoppingCartTrigger.click();
  const basket = component.getByLabel("ShoppingCartPopver");
  await basket.blur();

  await expect(basket).toBeVisible();
});

test("Accessibility", async ({ page, mount }) => {
  await mount(<ShoppingCart />);
  const accessibilityScanResults = await new AxeBuilder({
    page: page,
  }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
