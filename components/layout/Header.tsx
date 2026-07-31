import Link from "next/link";
import { MoreHorizontal, Plus } from "lucide-react";

interface HeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function Header({
  title,
  description,
  buttonText,
  buttonHref = "#",
}: HeaderProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {buttonText && (
          <Link
            href={buttonHref}
            className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            {buttonText}
          </Link>
        )}

        <button
          type="button"
          className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <span className="hidden sm:inline">
            More Actions
          </span>

          <MoreHorizontal className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}