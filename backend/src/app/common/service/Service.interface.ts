import Service from "./Service.factory";

export type ExtractServiceModel<T> = T extends Service<infer D> ? D : never;
