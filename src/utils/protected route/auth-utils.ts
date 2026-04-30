export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify",
];

export const commonProtectedRoutes = [
  "/my-profile",
  "/settings",
  "/change-password",
  "/reset-password",
];

export const getUnauthorizedRoute = (
  hostname: string,
  pathname: string,
): "UNAUTHORIZED" | null => {
  if (hostname !== "lvh.me" && hostname !== "risetogetherbd.shop") {
    return null;
  }

  if (isRouteMatches(pathname, studentProtectedRoutes)) {
    return "UNAUTHORIZED";
  }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "UNAUTHORIZED";
  }
  return null;
};

export const studentProtectedRoutes: RouteConfig = {
  exact: ["student.lvh.me", "student.risetogetherbd.shop"],
  patterns: [],
};

export const tutorProtectedRoutes: RouteConfig = {
  exact: ["tutor.lvh.me", "tutor.risetogetherbd.shop"],
  patterns: [],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: ["admin.lvh.me", "admin.risetogetherbd.shop"],
  patterns: [],
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig,
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
  hostname: string,
): "ADMIN" | "STUDENT" | "TUTOR" | null => {
  if (isRouteMatches(hostname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(hostname, studentProtectedRoutes)) {
    return "STUDENT";
  }
  if (isRouteMatches(hostname, tutorProtectedRoutes)) {
    return "TUTOR";
  }
  return null;
};

// export const getDefaultDashboardRoute = (role: IUserRole): string => {
//   if (role === "STUDENT") {
//     return "http://student.lvh.me:3000";
//   } else if (role === "TUTOR") {
//     return "http://tutor.lvh.me:3000";
//   } else if (role === "ADMIN") {
//     return "http://admin.lvh.me:3000";
//   } else {
//     return "http://lvh.me:3000";
//   }
// };

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

export const isCommonProtectedRoutes = (pathname: string) => {
  return commonProtectedRoutes.some((route: string) => route === pathname);
};
