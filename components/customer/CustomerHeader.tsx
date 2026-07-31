import Link from "next/link";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomersHeader() {
  return (
    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Customers
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your customers, view their activity, and monitor account
          status.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/customers/create"
          className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Link>

        <Button variant="outline">
          <span className="hidden sm:inline">More Actions</span>
          <MoreHorizontal className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}