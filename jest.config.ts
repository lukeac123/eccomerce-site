/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"transpileOnly": true} */

import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testMatch: [
    "<rootDir>/components/**/*.test.ts",
    "<rootDir>/components/**/*.test.tsx",
  ],
};

export default config;
