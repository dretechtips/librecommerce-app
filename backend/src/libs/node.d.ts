import { ConsolePlus } from '../helper/Console';

declare namespace NodeJS {
  interface Global {
    hconsole: ConsolePlus;
  }
}
