import { MoreHorizontal } from "lucide-react";

import type { Order } from "./types";

import type { Customer } from "@/components/customer/types";

interface OrdersCardListProps {
  orders: Order[];
  customers: Customer[];

}

const statusStyles: Record<Order["status"], string> = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};


export default function OrdersCardList({
  orders, customers
}: OrdersCardListProps) {

  const customerMap = new Map(
  customers.map((customer) => [customer.id, customer])
);
  
  return (
    <ul className="divide-y divide-slate-100 md:hidden">
     {orders.map((order) => {
  const customer = customerMap.get(order.customerId);

  return (
        <li key={order.id} className="p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">
                  {order.orderNumber}
                </p>

                <div>
  <p className="text-sm font-medium text-slate-900">
    {customer?.name ?? "Unknown Customer"}
  </p>

  <p className="text-xs text-slate-400">
    {customer?.email ?? order.customerId}
  </p>
</div>
              </div>

              <span
  className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
>
  {order.status}
</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Subtotal</p>
                <p className="font-medium text-slate-900">
                  ${order.subtotal.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Total</p>
                <p className="font-semibold text-slate-900">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Shipping</p>
                <p className="font-medium text-slate-900">
                  ${order.shipping.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Tax</p>
                <p className="font-medium text-slate-900">
                  ${order.tax.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Discount</p>
                <p className="font-medium text-slate-900">
                  ${order.discount.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Payment</p>
                <p className="font-medium text-slate-900">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-slate-400">Order Date</p>
                <p className="font-medium text-slate-900">
                  {order.createdAt}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                View Details
              </button>

              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-md transition hover:bg-slate-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </li>
        );
})}
    </ul>
  );
}