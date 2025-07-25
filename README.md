# 🚀 Shiprocket Catalog MCP Integration

This is a Model Context Protocol (MCP) server for Shiprocket.

With this, you can:

- List Product Catalog
- Search Catelog by Brand names
- Search Catelog by Category

### Here's an example of what you can do when it's connected to Claude.

---

## 🛠️ Prerequisites

- Node (version > 20.0.0)
- Claude Desktop app (or Cursor)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/BFRS-2/catalog-mcp
cd catalog-mcp
```

### 2. Install Dependencies using the existing package.json

```bash
# Install dependencies
npm install

# Build the binary
npm run build
```

### 3. Connect to MCP server

Add the following to your `claude_desktop_config.json` or `mcp.json`

```bash
{
 "mcpServers": {
   "ShiprocketCatalog": {
     "command": "npm",
      "args": [
        "--prefix",
        "{{PATH_TO_SRC}}",
        "start",
        "--silent"
      ],
      "env": {
       "SELLER_EMAIL":"<Your Shiprocket Email>",
       "SELLER_PASSWORD":"<Your Shiprocket password>"
     }
   }
 }
}
```

For Claude, save this as claude_desktop_config.json in your Claude Desktop configuration directory at:

```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

For Cursor, save this as mcp.json in your Cursor configuration directory at:

```bash
~/.cursor/mcp.json
```

Open Claude Desktop and you should now see `Shiprocket` as an available integration.

Or restart Cursor.

## MCP Tools

Clients (Claude or Cursor) can access the following tools to interact with Shiprocket:

- `catalog_search` - To perform search on catalog
