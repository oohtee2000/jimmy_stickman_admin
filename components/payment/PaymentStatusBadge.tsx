import { statusDot, statusStyles, type PaymentStatus } from "./types";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export default function PaymentStatusBadge({
  status,
  className = "",
}: PaymentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${statusStyles[status]} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`}
      />

      {status}
    </span>
  );
}