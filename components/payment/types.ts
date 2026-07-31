export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded";

export type PaymentMethod =
  | "Card"
  | "Bank Transfer"
  | "PayPal"
  | "Cash";

export interface Payment {
  id: string;

  orderId: string;

  transactionId: string;

  method: PaymentMethod;

  amount: number;

  status: PaymentStatus;

  paidAt: string;

  createdAt: string;
}

export interface PaymentStat {
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "flat" | "neg";
}

export const statusStyles: Record<PaymentStatus, string> = {
  Pending: "border-amber-200 bg-amber-50 text-amber-600",
  Paid: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Failed: "border-rose-200 bg-rose-50 text-rose-600",
  Refunded: "border-slate-200 bg-slate-100 text-slate-600",
};

export const statusDot: Record<PaymentStatus, string> = {
  Pending: "bg-amber-500",
  Paid: "bg-emerald-500",
  Failed: "bg-rose-500",
  Refunded: "bg-slate-500",
};