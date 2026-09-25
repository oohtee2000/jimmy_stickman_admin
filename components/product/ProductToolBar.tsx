"use client";

import {
  ChevronDown,
  Filter,
  Plus,
  Search,
} from "lucide-react";

interface ProductsToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function ProductsToolbar({
  query,
  onQueryChange,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by product or SKU..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          All Categories
          <ChevronDown className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          All Status
          <ChevronDown className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <Filter className="h-4 w-4" />
          More Filters
        </button>

         <a href="/products/create" className="flex">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
         
          <Plus className="h-4 w-4" />
          Add Product
        </button>
        </a>
      </div>
    </div>
  );
}