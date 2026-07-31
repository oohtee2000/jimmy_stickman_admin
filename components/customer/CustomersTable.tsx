import { MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { initials } from "./types";
import type { Customer } from "./types";
import CustomerStatusBadge from "./CustomerStatusBadge";

interface CustomersTableProps {
  customers: Customer[];
}

export default function CustomersTable({
  customers,
}: CustomersTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Customer
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Contact
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Orders
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Total Spent
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Status
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Last Order
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-slate-100 transition-colors hover:bg-slate-50"
            >
              {/* Customer */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={customer.avatar}
                      alt={customer.name}
                    />
                    <AvatarFallback>
                      {initials(customer.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium text-slate-900">
                      {customer.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {customer.id}
                    </p>
                  </div>
                </div>
              </td>

              {/* Contact */}
              <td className="px-4 py-4">
                <p className="font-medium text-slate-900">
                  {customer.email}
                </p>

                <p className="text-xs text-slate-400">
                  {customer.phone}
                </p>
              </td>

              {/* Orders */}
              <td className="px-4 py-4">
                <span className="font-semibold text-slate-900">
                  {customer.totalOrders}
                </span>
              </td>

              {/* Total Spent */}
              <td className="px-4 py-4">
                <span className="font-semibold text-slate-900">
                  ${customer.totalSpent.toFixed(2)}
                </span>
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                {/* <CustomerStatusBadge status={customer.status} />
                 */}
                 <span>{customer.status}</span>
              </td>

              {/* Last Order */}
              <td className="px-4 py-4">
                <p className="text-slate-700">
                  {customer.lastOrderAt}
                </p>
              </td>

              {/* Actions */}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}