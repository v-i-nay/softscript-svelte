import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


// Initialize Sanity Client
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2024-03-01",
});

// Image URL Builder
const builder = imageUrlBuilder(client);

// ✅ Use the correct type for `source`
export const getSanityImageUrl = (source:any) => {
  return source ? builder.image(source).url() : "";
};

export default client;
