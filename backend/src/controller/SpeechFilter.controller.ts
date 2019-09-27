import { Request, Response } from "express";
import { SpeechFilter, SFManager } from "../model/SpeechFilter";
import { SpeechFilterBody } from "../interface/SpeechFilter.interface";
import { HttpMethod } from "../decorator/HttpMethod";

export class SFController {
  private static _manager: SFManager = new SFManager("/speech-filter");
  public static import(filename: string): SpeechFilter {
    return this._manager.import(filename);
  }
  @HttpMethod("POST", "System was unable to add another speech filter.")
  public static add(req: Request, res: Response): void {
    const SFConfig: SpeechFilterBody = req.body.speechFilter;
    this._manager.add(SFConfig.words.split(','), SFConfig.name);
  }
  @HttpMethod("DELETE", "System was unable to delete the speech filter.")
  public static remove(req: Request, res: Response): void {
    const SFName: string = req.body.speechFilter.name;
    const SFExists: boolean = this._manager.exists(SFName);
    if (SFExists) {
      this._manager.remove(SFName);
    }
    else throw new Error("This Speech Filter doesn't even exists.");
  }
  @HttpMethod("PATCH", "System was unable to update the speech filter.")
  public static update(req: Request, res: Response): void {
    const SFConfig: SpeechFilterBody = req.body.speechFilter;
    const SFExists: boolean = this._manager.exists(SFConfig.name);
    if (SFExists) {
      const SF: SpeechFilter = this._manager.import(SFConfig.name);
      SF.setWords(SFConfig.words.split(","));
    }
  }
  @HttpMethod("GET", "System was unable to list the speech filter(s)")
  public static list(req: Request, res: Response): void {
    const SFs: SpeechFilter[] = this._manager.importAll();
    const SFBodys: SpeechFilterBody[] = SFs.map(cur => cur.toPrimObj());
    res.send({ success: true, speechFilters: SFBodys });
  }
}