import { ListItem, ListItems } from "./List.interface";

export interface ActivatorProps {
  name: string;
  activate: (id: string) => Promise<void>;
  deactivate: (id: string) => Promise<void>;
  getActivated: () => Promise<ListItem[]>;
  getDeactivated: () => Promise<ListItem[]>;
}

export interface ActivatorUIProps extends ActivatorProps {
  activated: ListItems;
  deactivated: ListItems;
}

export interface ActivatorState {
  toAdd: boolean;
  activated: ListItem[];
  deactivated: ListItem[];
}
