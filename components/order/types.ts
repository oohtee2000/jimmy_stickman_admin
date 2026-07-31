export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Completed"
  | "Cancelled";

export interface Order {
  id: string;

  orderNumber: string;

  customerId: string;

  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;

  paymentMethod: string;

  status: OrderStatus;

  createdAt: string;
}

export interface OrderItem {
  id: string;

  orderId: string;
  productId: string;

  quantity: number;

  unitPrice: number;

  color?: string;
  size?: string;

  total: number;
}

export interface OrderStat {
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "flat" | "neg";
}

export const statusStyles: Record<OrderStatus, string> = {
  Pending: "border-amber-200 bg-amber-50 text-amber-600",
  Processing: "border-blue-200 bg-blue-50 text-blue-600",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Cancelled: "border-rose-200 bg-rose-50 text-rose-600",
};

export const statusDot: Record<OrderStatus, string> = {
  Pending: "bg-amber-500",
  Processing: "bg-blue-500",
  Completed: "bg-emerald-500",
  Cancelled: "bg-rose-500",
};