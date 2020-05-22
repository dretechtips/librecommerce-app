import CostSchema from "./Cost.schema";

export type ExtractCostType<T> = T extends CostSchema<infer D> ? D : never;
