import Model from "src/app/common/model/Model.factory";

type Storable =
  | boolean
  | number
  | string
  | boolean[]
  | number[]
  | string[]
  | null
  | { [x: string]: Storable };

export interface DefaultPersistantData {
  timestamp: string;
}

export type PersistantData<T> = {
  [C in keyof T]: T[C] extends Storable ? T[C] : never;
};

export interface PersistableData {
  persist(): Storable;
}

export type ExtractData<T extends ReturnType<typeof Model>> = ReturnType<
  InstanceType<T>["data"]
>;
