import type { FormEvent } from "react";
import { Modal } from "./Modal";
import { setMonth } from "../db/months";
import { currentMonth } from "../lib/month";
import type { MonthSummary } from "../db/types";

interface Props {
  summary: MonthSummary | null;
  onClose: () => void;
  onSaved: () => void;
}

export function BudgetModal({ summary, onClose, onSaved }: Props) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await setMonth({
      month: currentMonth(),
      salary: Number(form.get("salary")),
      budget: Number(form.get("budget")),
    });
    onSaved();
    onClose();
  }

  return (
    <Modal title="Salary & budget" onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="floating-label">
          <span>Monthly salary</span>
          <input name="salary" type="number" min="0" step="0.01" className="input w-full" placeholder="Monthly salary" defaultValue={summary?.salary} required />
        </label>
        <label className="floating-label">
          <span>Wishlist budget per month</span>
          <input name="budget" type="number" min="0" step="0.01" className="input w-full" placeholder="Wishlist budget per month" defaultValue={summary?.budget} required />
        </label>
        <p className="text-xs opacity-60">Applies from this month onward. Unspent budget carries over.</p>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </Modal>
  );
}
