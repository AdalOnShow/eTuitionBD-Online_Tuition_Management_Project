// "use server"
import envVars from "@/lib/env";
import { getCookie } from "./jsonwebtoken/getCookie";

const serverFetchHelper = async (endpoint: string, options: RequestInit) => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("access_token");

  const response = await fetch(`${envVars.api}${endpoint}`, {
    headers: {
      ...(accessToken && { Cookie: `access_token=${accessToken}` }),
      ...headers,
    },
    // credentials: "include",
    ...restOptions,
  });
  return response;
};

const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};

export default serverFetch;
