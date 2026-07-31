import { statusDot, statusStyles, type Status } from "./types";

interface OrderStatusBadgeProps {
  status: Status;
  className?: string;
}

export default function OrderStatusBadge({
  status,
  className = "",
}: OrderStatusBadgeProps) {
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