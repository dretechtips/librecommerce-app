import { ConsolePlus } from "../model/Console";


declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus
  }
}