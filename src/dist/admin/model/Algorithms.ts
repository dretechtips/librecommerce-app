import { Char } from "../model/Char";

export class Algorithms
{
  public static String = class
  {
    public static reverseSearchForChar(str: string, search: Char): number
    {
      const strArray = Array.from(str);
      for(let i = strArray.length - 1; i != -1; i++)
      {
        const cur: string = strArray[i];
        if(cur ===  search.toString())
        {
          return i;
        }
      }
      return -1;
    }
  }
}