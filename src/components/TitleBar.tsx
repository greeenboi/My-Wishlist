import type { CSSProperties } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { CaretDownIcon, MinusIcon, SquareIcon, XIcon } from "@phosphor-icons/react";
import { formatMoney } from "../lib/format";
import type { MonthSummary } from "../db/types";

interface Props {
  summary: MonthSummary | null;
  onOpenBudget: () => void;
  onOpenMonth: () => void;
}

const appWindow = getCurrentWindow();

function usageColor(percent: number): string {
  if (percent < 60) return "text-success";
  if (percent < 90) return "text-warning";
  return "text-error";
}

export function TitleBar({ summary, onOpenBudget, onOpenMonth }: Props) {
  const percent = summary && summary.available > 0
    ? Math.round((summary.spent / summary.available) * 100)
    : summary?.spent ? 100 : 0;
  const tip = summary
    ? `${formatMoney(summary.spent)} of ${formatMoney(summary.available)} used`
    : "No budget set";

  return (
    <header data-tauri-drag-region className="navbar min-h-0 select-none bg-base-200 px-2 py-1.5">
      <div data-tauri-drag-region className="navbar-start">
        <div className="tooltip tooltip-right" data-tip={tip}>
          <div
            role="progressbar"
            className={`radial-progress text-[0.6rem] ${usageColor(percent)}`}
            style={{ "--value": Math.min(percent, 100), "--size": "2.25rem", "--thickness": "3px" } as CSSProperties}
          >
            {percent}%
          </div>
        </div>
      </div>

      <div data-tauri-drag-region className="navbar-center">
        <div className="dropdown dropdown-center">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm text-base font-semibold">
            My Wishlist <CaretDownIcon size={14} />
          </div>
          <ul tabIndex={0} className="menu dropdown-content z-10 w-48 rounded-box bg-base-100 p-2 shadow-sm">
            <li><button onClick={onOpenBudget}>Salary & budget</button></li>
            <li><button onClick={onOpenMonth}>This month</button></li>
          </ul>
        </div>
      </div>

      <div className="navbar-end gap-1">
        <button className="btn btn-square btn-ghost btn-xs hover:btn-info" onClick={() => appWindow.minimize()}>
          <MinusIcon size={14} />
        </button>
        <button className="btn btn-square btn-ghost btn-xs hover:btn-accent" onClick={() => appWindow.toggleMaximize()}>
          <SquareIcon size={12} />
        </button>
        <button className="btn btn-square btn-ghost btn-xs hover:btn-error" onClick={() => appWindow.close()}>
          <XIcon size={14} />
        </button>
      </div>
    </header>
  );
}
