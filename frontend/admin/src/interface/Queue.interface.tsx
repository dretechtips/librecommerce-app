import { ListItemAction } from "./List.interface";

export interface QueueProps {
  getAvaliable: () => Promise<QueueProcess[]>;
  getHalted: () => Promise<QueueProcess[]>;
  complete: (id: string) => Promise<void>;
  halt: (id: string) => Promise<void>;
  details: string;
  name: string;
}

export interface QueueUIProps extends QueueProps {
  avaliable: QueueItem;
  halted: QueueItem;
}

export interface QueueState {
  avaliable: QueueProcess[];
  halted: QueueProcess[];
  toDetails: string | null;
}

export interface QueueProcess {
  value: string;
  id: string;
}

export interface QueueItem {
  actions: ListItemAction[];
  process: QueueProcess[];
}
