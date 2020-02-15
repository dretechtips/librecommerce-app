export interface EventDOT {
  start: string;
  end: string;
  name: string;
  description: string;
}

export interface EventLink {
  eventID?: string;
}

export enum EventType {
  SINGLE,
  RECURRING
}
