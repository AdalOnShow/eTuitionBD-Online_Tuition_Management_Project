const envVars = {
  // APP_URL
  DEVELOPMENT_APP_ROOT_URL: process.env
    .NEXT_PUBLIC_DEVELOPMENT_APP_ROOT_URL as string,
  PRODUCTION_APP_ROOT_URL: process.env
    .NEXT_PUBLIC_PRODUCTION_APP_ROOT_URL as string,

  // API
  api: process.env.NEXT_PUBLIC_API_URL as string,

  // NODE_ENV
  node_env: process.env.NODE_ENV,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
    jwt_access_expires: process.env.JWT_ACCESS_EXPIRES as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES as string,
  },
};

export default envVars;
