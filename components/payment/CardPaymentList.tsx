import { MoreHorizontal } from "lucide-react";

import type { Payment } from "./types";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface PaymentsCardListProps {
  payments: Payment[];
}

export default function PaymentsCardList({
  payments,
}: PaymentsCardListProps) {
  return (
    <ul className="divide-y divide-slate-100 md:hidden">
      {payments.map((payment) => (
        <li key={payment.id} className="p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">
                  {payment.transactionId}
                </p>

                <p className="text-xs text-slate-400">
                  Order #{payment.orderId}
                </p>
              </div>

              <PaymentStatusBadge
                status={payment.status}
                className="shrink-0"
              />
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Amount</p>
                <p className="font-semibold text-slate-900">
                  ${payment.amount.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Method</p>
                <p className="font-medium text-slate-900">
                  {payment.method}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Paid At</p>
                <p className="font-medium text-slate-900">
                  {payment.paidAt}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Created</p>
                <p className="font-medium text-slate-900">
                  {payment.createdAt}
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
      ))}
    </ul>
  );
}