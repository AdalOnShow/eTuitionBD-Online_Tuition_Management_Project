import { publicConfig } from "@/config/public";

const DEFAULT_API_URL = "http://localhost:3001";

export function getApiBaseUrl() {
  return publicConfig.apiUrl ?? DEFAULT_API_URL;
}

export function getApiUrl(path: string) {
  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
