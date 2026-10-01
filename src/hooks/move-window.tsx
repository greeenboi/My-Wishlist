import { moveWindow, Position } from "@tauri-apps/plugin-positioner";

export function moveToBottomRight(): Promise<void> {
  return moveWindow(Position.BottomRight);
}
