import { WeekEvents } from '../type/Events';
import { TimeRange } from '../type/Range';
import { SingleEventBody } from './Events.interface';

export interface Constructor {
  userID: string;
  events: WeekEvents;
  hasOverTime: boolean;
}

export interface Value extends Constructor {
  id: string;
}

export interface NewBody {
  userID: string;
  events: SingleEventBody[];
  hasOverTime: boolean;
}

export interface ExistingBody extends NewBody {
  id: string;
}

export interface SearchQuery {
  id: string;
  userID: string;
  hasOverTime: boolean;
}
