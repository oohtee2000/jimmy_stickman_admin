import { statusDot, statusStyles, type CustomerStatus } from "./types";

interface CustomerStatusBadgeProps {
  status: CustomerStatus;
  className?: string;
}

export default function CustomerStatusBadge({
  status,
  className = "",
}: CustomerStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${statusDot[status]}`} />
      {status}
    </span>
  );
}