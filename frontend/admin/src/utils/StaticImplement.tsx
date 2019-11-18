export function StaticImplement<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export default StaticImplement;
