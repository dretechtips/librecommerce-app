import { IPAddress } from '../type/Location';

export interface DefaultState {
  id: string;
  timestamp: Date;
}

export type State<T = {}> = DefaultState & T;

type Safe = boolean | number | string | boolean[] | number[] | string[] | null;

export type PropSafe = {
  [key: string]: Safe;
};

export interface DefaultProps {
  id: string;
  timestamp: string;
}

export type Props<T extends PropSafe = {}> = DefaultProps & T;

export interface IModel {
  readonly database: string;
  readonly collection: string;
}
