import { ArrowDownRightIcon, ListPlusIcon, PlusIcon } from "@phosphor-icons/react";
import { moveToBottomRight } from "../hooks/move-window";

interface Props {
  onAdd: () => void;
}

export function Fab({ onAdd }: Props) {
  return (
    <div className="fab">
      <div tabIndex={0} role="button" className="btn btn-circle btn-lg btn-primary">
        <PlusIcon size={24} weight="bold" />
      </div>
      <div>
        Add item
        <button className="btn btn-circle btn-lg" onClick={onAdd}>
          <ListPlusIcon size={22} />
        </button>
      </div>
      <div>
        Move to corner
        <button className="btn btn-circle btn-lg" onClick={moveToBottomRight}>
          <ArrowDownRightIcon size={22} />
        </button>
      </div>
    </div>
  );
}
