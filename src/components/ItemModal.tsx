import type { FormEvent } from "react";
import { Modal } from "./Modal";
import { addItem, updateItem } from "../db/items";
import type { Item } from "../db/types";

interface Props {
  item?: Item;
  onClose: () => void;
  onSaved: () => void;
}

export function ItemModal({ item, onClose, onSaved }: Props) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = {
      name: String(form.get("name")),
      tag: String(form.get("tag")) || null,
      link: String(form.get("link")) || null,
      price: Number(form.get("price")),
      priority: Number(form.get("priority")),
    };
    await (item ? updateItem(item.id, values) : addItem(values));
    onSaved();
    onClose();
  }

  return (
    <Modal title={item ? "Edit item" : "Add item"} onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input name="name" className="input w-full" placeholder="Name" defaultValue={item?.name} required autoFocus />
        <input name="price" type="number" min="0" step="0.01" className="input w-full" placeholder="Price" defaultValue={item?.price} required />
        <input name="tag" className="input w-full" placeholder="Tag (optional)" defaultValue={item?.tag ?? ""} />
        <input name="link" type="url" className="input w-full" placeholder="Link (optional)" defaultValue={item?.link ?? ""} />
        <select name="priority" className="select w-full" defaultValue={String(item?.priority ?? 1)}>
          <option value="2">High priority</option>
          <option value="1">Normal priority</option>
          <option value="0">Low priority</option>
        </select>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">{item ? "Save" : "Add"}</button>
        </div>
      </form>
    </Modal>
  );
}
