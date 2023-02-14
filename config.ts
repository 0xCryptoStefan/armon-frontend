import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import * as dotenv from "dotenv";
dotenv.config();

// require("dotenv").config();

// Only ever define the env names as strings here!
// Prevent typos everywhere else
const configNames = /** @type {const} */ {
  SANITY_PROJECT_ID: "SANITY_PROJECT_ID",
  SANITY_DATASET: "SANITY_DATASET",
  SANITY_API_VERSION: "SANITY_API_VERSION",
  SANITY_TOKEN: "SANITY_TOKEN",
  // SANITY_USE_CDN: "SANITY_USE_CDN",
};

const configSchema = z.object({
  [configNames.SANITY_PROJECT_ID]: z.string().trim().min(1),
  [configNames.SANITY_DATASET]: z.string().trim().min(1),
  [configNames.SANITY_API_VERSION]: z.string().trim().min(1),
  [configNames.SANITY_TOKEN]: z.string().trim().min(1),
});

// try {
// throws error if DATABASE_URL missing!
const config = configSchema.parse({
  [configNames.SANITY_PROJECT_ID]: process.env.SANITY_PROJECT_ID,
  [configNames.SANITY_DATASET]: process.env.SANITY_PROJECT_ID || "production",
  [configNames.SANITY_API_VERSION]:
    process.env.SANITY_API_VERSION || "2022-02-12",
  [configNames.SANITY_TOKEN]: process.env.SANITY_TOKEN,
});
// } catch (err) {
//   const validationError = fromZodError(err);
//   throw new Error(validationError.message);
// }

export default config;
