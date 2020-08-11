export const apiEndpointURL = process.browser
  ? process.env.NEXT_PUBLIC_GITANPOT_API_ENDPOINT_URL ?? "http://localhost:3000/api"
  : process.env.NEXT_PUBLIC_GITANPOT_API_BACKEND_URL ?? "http://localhost:9999/api";
