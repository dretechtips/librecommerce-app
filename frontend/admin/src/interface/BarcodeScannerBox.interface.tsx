export interface BarcodeScannerState {
  mode: BarcodeScannerMode;
  value: string;
  error: Error | null;
  scanType: BarcodeScannerType;
}

export interface BarcodeScannerProps {

}

export interface BarcodeScannerUIProps {
  mode: BarcodeScannerMode;
  value: string;
  start: () => void;
  init: (ref: HTMLDivElement | null) => void;
  exit: () => void;
  fullscreen: () => void;
  error: Error | null;
  cameraSetup: (ref: HTMLVideoElement | null) => void;
  updateScanner: (id: BarcodeScannerType) => void;
}

export type BarcodeScannerMode = "scanning" | "complete" | "standby" | "error" | "selecting";

export type BarcodeScannerType = "code_128" | "ean" | "code_39" | "codabar" | "upc" | "i2of5" | "code_93"