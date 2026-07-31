import { MoreHorizontal } from "lucide-react";

import type { Payment } from "./types";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsTable({
  payments,
}: PaymentsTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Transaction
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Order
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Amount
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Method
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Status
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Paid At
            </th>

            <th className="px-4 py-3 text-sm font-medium text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b border-slate-100 transition-colors hover:bg-slate-50"
            >
              {/* Transaction */}
              <td className="px-4 py-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {payment.transactionId}
                  </p>

                  <p className="text-xs text-slate-400">
                    #{payment.id}
                  </p>
                </div>
              </td>

              {/* Order */}
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {payment.orderId}
                  </p>

                  <p className="text-xs text-slate-400">
                    Order Reference
                  </p>
                </div>
              </td>

              {/* Amount */}
              <td className="px-4 py-4">
                <p className="font-semibold text-slate-900">
                  ${payment.amount.toFixed(2)}
                </p>
              </td>

              {/* Method */}
              <td className="px-4 py-4">
                <p className="font-medium text-slate-900">
                  {payment.method}
                </p>
              </td>

              {/* Status */}
              <td className="px-4 py-4">
                <PaymentStatusBadge status={payment.status} />
              </td>

              {/* Paid At */}
              <td className="px-4 py-4">
                <div>
                  <p className="text-slate-900">
                    {payment.paidAt}
                  </p>

                  <p className="text-xs text-slate-400">
                    Created {payment.createdAt}
                  </p>
                </div>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}