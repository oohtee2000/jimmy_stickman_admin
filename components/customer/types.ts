export type CustomerStatus =
  | "Active"
  | "Inactive"
  | "Blocked";

export interface Customer {
  id: string;

  name: string;
  email: string;
  phone: string;

  avatar: string;

  totalOrders: number;
  totalSpent: number;

  joinedAt: string;
  lastOrderAt: string;

  status: CustomerStatus;
}

export interface CustomerStat {
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "flat" | "neg";
}

export const statusStyles: Record<CustomerStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Inactive: "border-slate-200 bg-slate-100 text-slate-600",
  Blocked: "border-rose-200 bg-rose-50 text-rose-600",
};

export const statusDot: Record<CustomerStatus, string> = {
  Active: "bg-emerald-500",
  Inactive: "bg-slate-500",
  Blocked: "bg-rose-500",
};

export function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}