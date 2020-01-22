/**
 * This algorithm implements Luhn formula
 * @param number Number that going to get checksumed
 * @param by Divide By to validate the sum
 */
export function ValidateCheckSum(number: number, by: number): boolean {
  const boxed = Array.from(number.toFixed()).map(cur => Number(cur));
  const container: number[] = new Array(boxed.length).fill(0);
  boxed.forEach((num, index) => {
    if (index % 1) {
      let number = num * 2;
      if (number.toFixed().length == 2)
        number = Number(number.toFixed()[0]) + Number(number.toFixed()[1]);
      container[index] = number;
    } else if (index % 2) container[index] = num;
  });
  if (container.reduce((prev, cur) => prev + cur) % by === 0) return true;
  return false;
}
