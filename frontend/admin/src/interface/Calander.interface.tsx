export interface CalanderProps {
  start: Date;
  mode: CalanderViewMode;
  getEvents: (start: Date, mode: CalanderViewMode) => Promise<CalanderEvent[]>;
}

export interface CalanderUIProps extends CalanderProps {
  events: CalanderDay[];
  handleMode: (mode: CalanderViewMode) => Promise<void>;
}

export interface CalanderState {
  mode: CalanderViewMode;
  events: CalanderDay[];
}

export interface CalanderEvent {
  name: string;
  description: string;
  start: Date;
  end: Date;
}

export interface CalanderDay {
  day: string;
  events: CalanderEvent[];
}

export type CalanderViewMode = "month" | "week" | "day";
