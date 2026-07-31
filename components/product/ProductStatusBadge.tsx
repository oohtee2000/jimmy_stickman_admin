import { statusDot, statusStyles, type ProductStatus } from "./types";

interface ProductStatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export default function ProductStatusBadge({
  status,
  className = "",
}: ProductStatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${statusStyles[status]} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`}
      />

      {status}
    </div>
  );
}