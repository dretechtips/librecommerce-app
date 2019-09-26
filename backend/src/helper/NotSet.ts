export type NotSet = (x: any) => boolean;

const isNotSet  = function (x: any): boolean {
  return (x === undefined || x === null);
}