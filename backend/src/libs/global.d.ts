import { ConsolePlus } from "../helper/Console";
import { HttpErrorHandler } from "../helper/HttpErrorHandler";

declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus;
  }
}
