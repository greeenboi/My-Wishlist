import { Modal } from "./Modal";
import { formatMoney } from "../lib/format";
import type { Item, MonthSummary } from "../db/types";

interface Props {
  summary: MonthSummary | null;
  bought: Item[];
  onUndo: (id: number) => void;
  onClose: () => void;
}

export function MonthModal({ summary, bought, onUndo, onClose }: Props) {
  const rows = summary
    ? [
        ["Budget", summary.budget],
        ["Carried over", summary.carry_in],
        ["Available", summary.available],
        ["Spent", summary.spent],
        ["Remaining", summary.remaining],
      ] as const
    : [];

  return (
    <Modal title="This month" onClose={onClose}>
      {summary ? (
        <table className="table table-sm">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <td>{label}</td>
                <td className="text-right font-medium">{formatMoney(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="opacity-60">No budget set yet.</p>
      )}

      <div className="divider">Bought</div>
      {bought.length === 0 ? (
        <p className="text-center text-sm opacity-60">Nothing bought this month.</p>
      ) : (
        <ul className="list">
          {bought.map((item) => (
            <li key={item.id} className="list-row items-center">
              <div className="list-col-grow">{item.name}</div>
              <div>{formatMoney(item.bought_price ?? item.price)}</div>
              <button className="btn btn-ghost btn-xs" onClick={() => onUndo(item.id)}>Undo</button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
