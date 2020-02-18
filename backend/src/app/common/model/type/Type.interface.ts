export interface DataType<Out, In = Out> {
  get(value: Out): In;
  set(value: In): Out;
}
