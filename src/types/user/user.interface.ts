export type Role = "STUDENT" | "TUTOR" | "ADMIN";

export interface IUserInfo {
  id: string;
  email: string;
  name: string;
  password?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role;
}
