import { moveWindow, Position } from '@tauri-apps/plugin-positioner';
// when using `"withGlobalTauri": true`, you may use
// const { moveWindow, Position } = window.__TAURI__.positioner;

export const hookWindow = moveWindow(Position.BottomRight);