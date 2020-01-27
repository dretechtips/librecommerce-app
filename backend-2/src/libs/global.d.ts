import { ConsolePlus } from "../helper/Console";
import { HttpErrorHandler } from "../helper/HttpErrorHandler";
import { int } from "../type/Number";

declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus;
  }
}
