import { MoreHorizontal } from "lucide-react";
import type { Order } from "./types";


import type { Customer } from "@/components/customer/types";

interface OrdersTableProps {
  orders: Order[];
  customers: Customer[];
}


const statusStyles: Record<Order["status"], string> = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};


export default function OrdersTable({
  orders, customers
}: OrdersTableProps) {


  const customerMap = new Map(
  customers.map((customer) => [customer.id, customer])
);


  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Order
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Customer
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Total
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Payment
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Status
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Date
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
  const customer = customerMap.get(order.customerId);

  return (
            <tr
              key={order.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              {/* Order */}
              <td className="px-4 py-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {order.orderNumber}
                  </p>

                  <p className="text-xs text-slate-400">
                    #{order.id}
                  </p>
                </div>
              </td>

              {/* Customer */}
             
<td className="px-4 py-4">
  <div>
    <p className="font-medium text-slate-900">
      {customer?.name ?? "Unknown Customer"}
    </p>

    <p className="text-xs text-slate-400">
      {order.customerId}
    </p>
  </div>
</td>

              {/* Total */}
              <td className="px-4 py-4">
                <p className="font-semibold text-slate-900">
                  ${order.total.toFixed(2)}
                </p>

                <p className="text-xs text-slate-400">
                  Subtotal: ${order.subtotal.toFixed(2)}
                </p>
              </td>

              {/* Payment */}
              <td className="px-4 py-4">
                <p className="font-medium text-slate-900">
                  {order.paymentMethod}
                </p>
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <span
  className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
>
  {order.status}
</span>
              </td>

              {/* Date */}
              <td className="px-4 py-4">
                <p className="text-slate-700">
                  {order.createdAt}
                </p>
              </td>

              {/* Action */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <button className="text-sm text-slate-600 hover:text-slate-900">
                    View
                  </button>

                  <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
           );
})}
        </tbody>
      </table>
    </div>
  );
}