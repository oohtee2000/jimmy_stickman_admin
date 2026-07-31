"use client";

import { Calendar, ChevronDown, Filter, Search } from "lucide-react";

interface CustomersToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function CustomersToolbar({
  query,
  onQueryChange,
}: CustomersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, email, phone..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          All Status
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Joined Date */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <Calendar className="h-4 w-4" />
          Joined Date
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* More Filters */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <Filter className="h-4 w-4" />
          More Filters
        </button>
      </div>
    </div>
  );
}