export type AdminRole =
  | "Super Admin"
  | "Admin"
  | "Manager"
  | "Support";

export type AdminStatus =
  | "Active"
  | "Inactive"
  | "Suspended";

export interface Admin {
  id: string;

  authId: string;      // Supabase auth.users.id

  name: string;
  email: string;
  phone?: string;

  avatar: string;

  role: AdminRole;

  lastLogin: string;

  createdAt: string;

  status: AdminStatus;
}