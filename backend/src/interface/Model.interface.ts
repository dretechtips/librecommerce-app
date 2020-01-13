import { IPAddress } from '../type/Location';

export interface DefaultState {
  id: string;
  timestamp: Date;
}

export type State<T = {}> = DefaultState & T;

type Safe = boolean | number | string | boolean[] | number[] | string[] | null;

type Storable = boolean | number | string | boolean[] | number[] | string[] | null | { [x: string]: Storable };

export type PropSafe = {
  [key: string]: Safe;
};

export interface DefaultProps {
  id: string;
  timestamp: string;
}

export interface DefaultPersistantData {
  id: string;
  timestamp: string;
}

export type Props<T extends PropSafe = {}> = DefaultProps & T;

export type PersistantData<T> = {
  [C in keyof T]: T[C] extends Storable ? T[C] : never;
};

export interface IModel {
  readonly database: string;
  readonly collection: string;
}

export interface PersistableData {
  persist(): Storable;
}
