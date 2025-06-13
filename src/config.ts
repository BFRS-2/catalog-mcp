export const API_DOMAINS = {
  SHIPROCKET: process.env.API_BASE_SHIPROCKET ?? "https://apiv2.shiprocket.in",
  SERVICEABILITY:
    process.env.API_BASE_SERVICEABILITY ??
    "https://serviceability.shiprocket.in",
  SR_CATALOG:
    process.env.API_BASE_SR_CATALOG ?? "https://sr-catalog-go.shiprocket.in",
};
