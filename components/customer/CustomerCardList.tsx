"use client";

import { MoreHorizontal } from "lucide-react";

import type { Customer } from "./types";
import CustomerStatusBadge from "./CustomerStatusBadge";

interface CustomerCardListProps {
  customers: Customer[];
}

export default function CustomerCardList({
  customers,
}: CustomerCardListProps) {
  return (
    <ul className="divide-y divide-slate-100 md:hidden">
      {customers.map((customer) => (
        <li key={customer.id} className="p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-slate-900">
                    {customer.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {customer.email}
                  </p>
                </div>
              </div>

              {/* <CustomerStatusBadge
                status={customer.status}
                className="shrink-0"
              /> */}
              <span>{customer.status}</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Customer ID</p>
                <p className="font-medium text-slate-900">
                  {customer.id}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Phone</p>
                <p className="font-medium text-slate-900">
                  {customer.phone}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Orders</p>
                <p className="font-medium text-slate-900">
                  {customer.totalOrders}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Total Spent</p>
                <p className="font-semibold text-slate-900">
                  ${customer.totalSpent.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Joined</p>
                <p className="font-medium text-slate-900">
                  {customer.joinedAt}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Last Order</p>
                <p className="font-medium text-slate-900">
                  {customer.lastOrderAt}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                View Profile
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