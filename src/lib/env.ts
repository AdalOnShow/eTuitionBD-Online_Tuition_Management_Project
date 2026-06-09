import { serverConfig } from "@/config/server";

const envVars = {
  // APP_URL
  DEVELOPMENT_APP_ROOT_URL: serverConfig.developmentRootUrl,
  PRODUCTION_APP_ROOT_URL: serverConfig.productionRootUrl,

  // API
  api: serverConfig.apiUrl,

  // NODE_ENV
  node_env: serverConfig.nodeEnv,
  jwt: {
    jwt_access_secret: serverConfig.jwt.accessSecret,
    jwt_access_expires: serverConfig.jwt.accessExpires,
    jwt_refresh_secret: serverConfig.jwt.refreshSecret,
    jwt_refresh_expires: serverConfig.jwt.refreshExpires,
  },
};

export default envVars;
