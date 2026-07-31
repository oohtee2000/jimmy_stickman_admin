import type { Order, OrderStat } from "./types";

export const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-1001",
    customerId: "CUS-1001",

    subtotal: 120,
    shipping: 10,
    tax: 6,
    discount: 0,
    total: 136,

    paymentMethod: "Credit Card",

    status: "Completed",

    createdAt: "2026-07-23",
  },

  {
    id: "2",
    orderNumber: "ORD-1002",
    customerId: "CUS-1002",

    subtotal: 2499,
    shipping: 0,
    tax: 124.95,
    discount: 100,
    total: 2523.95,

    paymentMethod: "PayPal",

    status: "Processing",

    createdAt: "2026-07-22",
  },

  {
    id: "3",
    orderNumber: "ORD-1003",
    customerId: "CUS-1003",

    subtotal: 1199,
    shipping: 15,
    tax: 59.95,
    discount: 0,
    total: 1273.95,

    paymentMethod: "Apple Pay",

    status: "Pending",

    createdAt: "2026-07-20",
  },

  {
    id: "4",
    orderNumber: "ORD-1004",
    customerId: "CUS-1004",

    subtotal: 999,
    shipping: 10,
    tax: 49.95,
    discount: 50,
    total: 1008.95,

    paymentMethod: "Debit Card",

    status: "Cancelled",

    createdAt: "2026-07-18",
  },

  {
    id: "5",
    orderNumber: "ORD-1005",
    customerId: "CUS-1005",

    subtotal: 399,
    shipping: 10,
    tax: 19.95,
    discount: 20,
    total: 408.95,

    paymentMethod: "Stripe",

    status: "Completed",

    createdAt: "2026-07-15",
  },

  {
    id: "6",
    orderNumber: "ORD-1006",
    customerId: "CUS-1006",

    subtotal: 1899,
    shipping: 20,
    tax: 94.95,
    discount: 100,
    total: 1913.95,

    paymentMethod: "Credit Card",

    status: "Processing",

    createdAt: "2026-07-12",
  },
];

export const orderStats: OrderStat[] = [
  {
    label: "Total Orders",
    value: "240,120",
    sub: "Total orders in the last 365 days",
    trend: "neg",
  },
  {
    label: "New Orders",
    value: "170,190",
    sub: "New orders in the last 365 days",
    trend: "flat",
  },
  {
    label: "Completed Orders",
    value: "140,530",
    sub: "Completed orders in the last 365 days",
    trend: "up",
  },
  {
    label: "Cancelled Orders",
    value: "99,349",
    sub: "Cancelled orders in the last 365 days",
    trend: "down",
  },
];