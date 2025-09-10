import { test, expect } from "@playwright/test";
import { ProductType } from "@/utils";

const mockProduct: ProductType[] = [
  {
    id: 99,
    description: "These are you socks",
    title: "Socks",
    thumbnail: "./thumnail",
    category: "",
    availabilityStatus: "Low Stock",
    price: 10.99,
  },
  {
    id: 100,
    description: "This is your jumper",
    title: "Jumper",
    thumbnail: "./thumnail2",
    category: "",
    availabilityStatus: "Low Stock",
    price: 11.44,
  },
];

test("App Header", async ({ page }) => {
  await page.goto("./");
  const title = page.getByRole("heading", { level: 1 });
  await expect(title).toHaveText(/Eccomerce Product Page/);
});

test("fetch call", async ({ page }) => {
  await page.route("https://dummyjson.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ products: mockProduct }),
    });
  });
  await page.goto("./");
  const paginationButton = await page.getByRole("button", {
    name: "Load More Products",
  });
  await paginationButton.click();

  await expect(page.getByAltText("Socks")).toBeVisible();
  await expect(page.getByAltText("Jumper")).toBeVisible();
});
