"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";



interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


export default function ProductsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductsPaginationProps)  {

  const pages = Array.from(
  { length: totalPages },
  (_, index) => index + 1
);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Previous */}
      <button
  type="button"
  disabled={currentPage === 1}
  onClick={() => onPageChange(currentPage - 1)}
  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
>
  <ArrowLeft className="h-4 w-4" />
  Previous
</button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 text-sm">
        {pages.map((page) => (
          <button
  key={page}
  type="button"
  onClick={() => onPageChange(page)}
  className={`grid h-8 min-w-8 place-items-center rounded-md px-2 transition ${
    currentPage === page
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-slate-100"
  }`}
>
  {page}
</button>
        ))}
      </div>

      {/* Next */}
      <button
  type="button"
  disabled={currentPage === totalPages}
  onClick={() => onPageChange(currentPage + 1)}
  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Next
  <ArrowRight className="h-4 w-4" />
</button>
    </div>
  );
}