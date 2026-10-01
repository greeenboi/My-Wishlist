import { useState } from "react";
import { TitleBar } from "./components/TitleBar";
import { WishlistItems } from "./components/WishlistItems";
import { Fab } from "./components/Fab";
import { ItemModal } from "./components/ItemModal";
import { BudgetModal } from "./components/BudgetModal";
import { MonthModal } from "./components/MonthModal";
import { useWishlist } from "./hooks/use-wishlist";
import { buyItem, deleteItem, unbuyItem } from "./db/items";
import type { Item } from "./db/types";
import "./App.css";

type ModalName = "item" | "budget" | "month" | null;

function App() {
  const { plan, summary, bought, refresh } = useWishlist();
  const [modal, setModal] = useState<ModalName>(null);
  const [editing, setEditing] = useState<Item | null>(null);
  const closeModal = () => setModal(null);

  async function run(action: Promise<void>) {
    await action;
    await refresh();
  }

  return (
    <div className="flex h-screen flex-col bg-base-100">
      <TitleBar summary={summary} onOpenBudget={() => setModal("budget")} onOpenMonth={() => setModal("month")} />

      <main className="flex-1 overflow-y-auto pb-24">
        {!summary && (
          <div role="alert" className="alert alert-info alert-soft m-3 flex justify-between">
            <span>Set your budget to start planning.</span>
            <button className="btn btn-sm" onClick={() => setModal("budget")}>Set up</button>
          </div>
        )}
        <WishlistItems
          plan={plan}
          onBuy={(id) => run(buyItem(id))}
          onDelete={(id) => run(deleteItem(id))}
          onEdit={setEditing}
        />
      </main>

      <Fab onAdd={() => setModal("item")} />

      {modal === "item" && <ItemModal onClose={closeModal} onSaved={refresh} />}
      {editing && <ItemModal key={editing.id} item={editing} onClose={() => setEditing(null)} onSaved={refresh} />}
      {modal === "budget" && <BudgetModal summary={summary} onClose={closeModal} onSaved={refresh} />}
      {modal === "month" && (
        <MonthModal summary={summary} bought={bought} onUndo={(id) => run(unbuyItem(id))} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
