import { ListItemAction, ListItem } from "./List.interface";

export interface ServerSelectProps {
  lookupURL: string;
  children: (servers: ServerData[], selectedID: string) => JSX.Element;
}

export interface ServerSelectUIProps extends ServerSelectProps {
  select: (id: string) => void;
  servers: ServerData[];
  convert: (value: ServerData) => ListItem;
}

export interface ServerSelectState {
  servers: ServerData[];
  selectedID: string | null;
}

export interface ServerData {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  ipAddress: string;
  type: ServerType;
}

export type ServerType = "database" | "compute" | "storage" | "load_balancer";
