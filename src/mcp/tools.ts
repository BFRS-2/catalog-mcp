import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z as zod } from "zod";
import axios from "axios";
import { AxiosError } from "axios";
import { API_DOMAINS } from "@/config";

export const initializeTools = (server: McpServer) => {
  server.tool(
    "catalogue_search",
    `Get product catalogue search

    Args:
        title: String representing product name

    Returns: Dictionary containing the following info for each product:
        id: Unique identifier of the product
        product_id: Product's unique ID
        name: Name of the product
        category: Main category of the product
        sub_category: Sub-category of the product
        brand: Brand name
        long_desc: Detailed description of the product
        mrp: Maximum retail price
        offer_price: Discounted price if available
        available_quantity: Number of items in stock
        store_url: URL of the store
        product_link: Direct link to the product page
        product_cover_image: Main image of the product
        cdn_images: Array of product image URLs
        l1_category: Level 1 category
        l2_category: Level 2 category
        l3_category: Level 3 category
    `,
    {
      title: zod.string(),
    },
    async ({ title: title }, context) => {
      const catalogueUrl = `${API_DOMAINS.SR_CATALOG}/v2/catalog/product/search?title=${title}`;

      try {
        const catalogueData = (await axios.get(catalogueUrl)).data;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(catalogueData),
            },
          ],
        };
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(err.response?.data);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: err.response?.data,
                }),
              },
            ],
          };
        } else if (err instanceof Error) {
          console.error(err.stack);
        }

        return {
          content: [
            {
              type: "text",
              text: `Unable to fetch expected date of delivery due to some error`,
            },
          ],
        };
      }
    }
  );
};
