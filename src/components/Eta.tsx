import { useEffect, useState } from "react";
import { formatCountdown, formatMonth } from "../lib/format";
import { monthStart } from "../lib/month";
import type { PlannedItem } from "../db/types";

export function Eta({ monthsAway, targetMonth }: PlannedItem) {
  const [hovered, setHovered] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!hovered) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [hovered]);

  if (monthsAway === null || targetMonth === null) return <span>Set a budget to plan</span>;
  if (monthsAway === 0) return <span className="text-success">Affordable now</span>;

  return (
    <span
      className="tooltip tooltip-bottom"
      data-tip={formatCountdown(monthStart(targetMonth).getTime() - now)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {monthsAway} mo · {formatMonth(targetMonth)}
    </span>
  );
}
