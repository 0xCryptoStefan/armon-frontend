import createClient from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: process.env.SANITY_API_VERSION || "2022-01-12",
  token: process.env.SANITY_TOKEN,
});
