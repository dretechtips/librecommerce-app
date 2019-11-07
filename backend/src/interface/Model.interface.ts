import { IPAddress } from '../type/Location';

export interface DefaultState {
  id: string;
  timestamp: Date;
}

export type State<T = {}> = DefaultState & T;

export interface DefaultProps {
  id: string;
  timestamp: string;
}

export type Props<T = {}> = DefaultProps & T;
