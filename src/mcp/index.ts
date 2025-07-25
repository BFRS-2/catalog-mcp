import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { initializeTools } from "@/mcp/tools";

export const mcpServer = new McpServer({
  name: "catalog-mcp",
  version: "1.0.0",
});

initializeTools(mcpServer);
