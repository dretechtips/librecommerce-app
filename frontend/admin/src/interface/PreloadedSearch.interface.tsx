import { ListItem, ListItemAction } from "./List.interface";

export interface PreloadedSearchProps<T> {
  placeholder: string;
  items: T[];
  convert: (data: T) => ListItem;
  actions?: ListItemAction[];
}

export interface PreloadedSearchUIProps<T> extends PreloadedSearchProps<T> {
  filtered: any[];
  selectedID: string | null;
  select: (id: string) => void;
  filter: (value: string) => void;
}

export interface PreloadedSearchState<T> {
  filtered: T[];
  selectedID: string | null;
}
