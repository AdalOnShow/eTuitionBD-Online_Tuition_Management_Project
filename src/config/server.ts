import "server-only";

import { publicConfig } from "@/config/public";

export const serverConfig = {
  ...publicConfig,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? "",
    accessExpires: process.env.JWT_ACCESS_EXPIRES ?? "",
    refreshSecret:
      process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET ?? "",
    refreshExpires: process.env.JWT_REFRESH_EXPIRES ?? "",
  },
};
