import { ConsolePlus } from "../model/Console";
import { HttpErrorHandler } from "../helper/HttpErrorHandler";
import { NotSet } from "../helper/NotSet";


declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus;
    isNotSet: NotSet;
  }
}

declare global {
  const hconsole: ConsolePlus;
  const isNotSet: NotSet;
}





