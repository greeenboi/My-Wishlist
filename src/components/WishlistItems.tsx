import { openUrl } from "@tauri-apps/plugin-opener";
import { ArrowSquareOutIcon, CheckIcon, TrashIcon } from "@phosphor-icons/react";
import { Eta } from "./Eta";
import { formatMoney } from "../lib/format";
import type { Item, PlannedItem } from "../db/types";

interface Props {
  plan: PlannedItem[];
  onBuy: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

export function WishlistItems({ plan, onBuy, onDelete, onEdit }: Props) {
  if (plan.length === 0) {
    return <p className="p-8 text-center opacity-60">Your wishlist is empty.</p>;
  }

  return (
    <ul className="list">
      {plan.map((planned) => {
        const { item } = planned;
        return (
          <li
            key={item.id}
            className="list-row items-center"
            onContextMenu={(e) => {
              e.preventDefault();
              onEdit(item);
            }}
          >
            <div className="list-col-grow">
              <div className="font-medium">{item.name}</div>
              <div className="flex items-center gap-2 text-xs opacity-70">
                {item.tag && <span className="badge badge-soft badge-xs">{item.tag}</span>}
                <Eta {...planned} />
              </div>
            </div>
            <div className="font-semibold">{formatMoney(item.price)}</div>
            <div className="flex">
              {item.link && (
                <button className="btn btn-square btn-ghost btn-sm" title="Open link" onClick={() => openUrl(item.link!)}>
                  <ArrowSquareOutIcon size={18} />
                </button>
              )}
              <button className="btn btn-square btn-ghost btn-sm" title="Mark bought" onClick={() => onBuy(item.id)}>
                <CheckIcon size={18} />
              </button>
              <button className="btn btn-square btn-ghost btn-sm" title="Delete" onClick={() => onDelete(item.id)}>
                <TrashIcon size={18} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
