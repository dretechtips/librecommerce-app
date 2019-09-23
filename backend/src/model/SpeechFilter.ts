import fs = require('fs');
// VS is bugged ignore this v
import { } from "../interface/Ban.interface";

export class SpeechFilter {
  private _words: string[];
  constructor(words: string[]) {
    this._words = words;
  }
  public save(): void {
    try {
      fs.exists('/filter', (exists) => {
        if (!exists)
          fs.mkdir('/filter', (err) => {
            if (err) throw err;
            fs.writeFile('/filter/words.csv', this._words.toString(), (err) => {
              if (err) throw err;
            })
          });
        else
          fs.writeFile('/filter/words.csv', this._words.toString(), (err) => {
            if (err) throw err;
          });
      });
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public static importDefault(): SpeechFilter {
    try {

    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public isSafe(msg: string): boolean {
    for (let i = 0; i < this._words.length; i++) {
      const search: RegExp = new RegExp(this._words[i], 'i');
      const result: number = msg.search(search);
      if (result !== -1)
        return false;
    }
    return true;
  }
}