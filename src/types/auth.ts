export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  image: string | null;
  accessToken?: string;
}
