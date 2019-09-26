import { Request, Response } from "express";
import { SpeechFilter, SFManager } from "../model/SpeechFilter";
import { SpeechFilterBody } from "../interface/SpeechFilter.interface";
import { HttpMethod } from "../decorator/HttpMethod";

export class SFController {
  private static _manager: SFManager = new SFManager("/speech-filter");
  public static import(filename: string): SpeechFilter {
    return this._manager.import(filename);
  }
  @HttpMethod("POST")
  public static add(req: Request, res: Response): void {
    try {
      const SFConfig: SpeechFilterBody = req.body.speechFilter;
      this._manager.add(SFConfig.words.split(','), SFConfig.name);
      res.send({ success: true });
    }
    catch (e) {
      res.sendError(e, "System was unable to add another speech filter.");
    }
  }
  @HttpMethod("DELETE")
  public static remove(req: Request, res: Response): void {
    try {
      const SFName: string = req.body.speechFilter.name;
      const SFExists: boolean = this._manager.exists(SFName);
      if (SFExists) {
        this._manager.remove(SFName);
      }
      else throw new Error("This Speech Filter doesn't even exists.");
      res.send({ success: true });
    }
    catch (e) {
      res.sendError(e, "System was unable to delete the speech filter.");
    }
  }
  @HttpMethod("PATCH")
  public static update(req: Request, res: Response): void {
    try {
      const SFConfig: SpeechFilterBody = req.body.speechFilter;
      const SFExists: boolean = this._manager.exists(SFConfig.name);
      if (SFExists) {
        const SF: SpeechFilter = this._manager.import(SFConfig.name);
        SF.setWords(SFConfig.words.split(","));
      }
      res.send({ success: true });
    }
    catch (e) {
      res.sendError(e, "System was unable to update the speech filter.");
    }
  }
  @HttpMethod("GET")
  public static list(req: Request, res: Response): void {
    try {
      const SFs: SpeechFilter[] = this._manager.importAll();
      const SFBodys: SpeechFilterBody[] = SFs.map(cur => cur.toPrimObj());
      res.send({ success: true, speechfilters: SFBodys });
    }
    catch (e) {
      res.sendError(e, "System was unable to list the speech filter(s)");
    }
  }
}