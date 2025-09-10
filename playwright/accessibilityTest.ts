import { test as baseTest } from "@playwright/experimental-ct-react";
import AxeBuilder from "@axe-core/playwright";

// Extend the base test to include `toHaveNoAccessibilityIssues`
export const test = baseTest.extend<{
  expectAccessible: (page: import("@playwright/test").Page) => Promise<void>;
}>({
  expectAccessible: async ({}, use) => {
    // Provide a helper function
    await use(async (page) => {
      const results = await new AxeBuilder({ page }).analyze();
      if (results.violations.length > 0) {
        console.log("Accessibility violations:", results.violations);
      }
      expect(results.violations).toEqual([]);
    });
  },
});

export { expect } from "@playwright/test";
