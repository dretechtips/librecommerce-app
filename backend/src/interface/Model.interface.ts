import { IPAddress } from '../type/Location';

export interface DefaultState {
  id: string;
}

export type State<T = {}> = DefaultState & T;

export interface DefaultProps {
  id: string;
}

export type Props<T = {}> = DefaultProps & T;
