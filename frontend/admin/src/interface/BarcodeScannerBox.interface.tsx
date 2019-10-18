export interface BarcodeScannerState {
  mode: BarcodeScannerMode;
  value: string;
  error: Error | null;
}

export interface BarcodeScannerProps {

}

export interface BarcodeScannerUIProps {
  mode: BarcodeScannerMode;
  value: string;
  start: () => void;
  init: (ref: HTMLDivElement | null) => void;
  exit: () => void;
  error: Error | null;
}

export type BarcodeScannerMode = "scanning" | "complete" | "standby" | "error"