import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z as zod } from "zod";
import axios from "axios";
import { AxiosError } from "axios";
import { API_DOMAINS } from "@/config";

export const initializeTools = (server: McpServer) => {
  server.tool(
    "catalogue_search",
    `Get related products from catalogue based on product title

    Args:
        title: String representing product title to search in the catalogue

    Returns: Dictionary containing the following info for each product:
        id: String representing unique identifier of the product
        product_id: String representing ProductID
        name: String representing name of the product
        category: String representing main category of the product
        sub_category: String representing Sub-category of the product
        company_id: Integer representing company id of the product
        brand: String representing brand name of the product
        long_desc: String representing description of the product
        mrp: Integer representing Maximum retail price
        offer_price: Integer representing Discounted price if available
        available_quantity: Integer representing Number of items in stock
        store_url: String representing URL of the store
        product_link: String representing Direct link to the product page
        product_cover_image: String representing Main image of the product
        cdn_images: Array of product image URLs
        l1_category: String representing Level 1 category
        l2_category: String representing Level 2 category
        l3_category: String representing Level 3 category
    `,
    {
      title: zod.string(),
    },
    async ({ title: productTitle }, context) => {
      const catalogueUrl = `${API_DOMAINS.SR_CATALOG}/v2/catalog/product/search?title=${productTitle}`;

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
              text: `Unable to search catalogue due to some error`,
            },
          ],
        };
      }
    }
  );
};
