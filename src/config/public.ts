const DEFAULT_API_URL = "http://localhost:3001";
const DEFAULT_DEVELOPMENT_ROOT = "lvh.me";

export const publicConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL,
  developmentRootUrl:
    process.env.NEXT_PUBLIC_DEVELOPMENT_APP_ROOT_URL ??
    DEFAULT_DEVELOPMENT_ROOT,
  productionRootUrl: process.env.NEXT_PUBLIC_PRODUCTION_APP_ROOT_URL ?? "",
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === "production",
};

export function getAppRootDomain() {
  return publicConfig.isProduction
    ? publicConfig.productionRootUrl
    : publicConfig.developmentRootUrl;
}
