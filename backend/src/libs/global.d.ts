import { ConsolePlus } from "../model/Console";
import { HttpErrorHandler } from "../helper/HttpErrorHandler";


declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus;
  }
}

declare global {
  const hconsole: ConsolePlus;
}





