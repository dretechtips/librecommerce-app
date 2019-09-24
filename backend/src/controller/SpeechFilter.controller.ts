import { Request, Response } from "express";
import { SpeechFilter, SFManager } from "../model/SpeechFilter";
import { SpeechFilterBody } from "../interface/SpeechFilter.interface";

export class SFController {
  private static _manager: SFManager = new SFManager("/speech-filter");
  public static getManager() {
    return this._manager;
  }
  public static add(req: Request, res: Response) {
    try {
      const SFConfig: SpeechFilterBody = req.body.speechFilter;
      this._manager.add(SFConfig.words.split(','), SFConfig.name);
      res.send({ success: true });
    }
    catch (e) {
      res.sendError(e, "System was unable to add another speech filter.");
    }
  }
  public static remove(req: Request, res: Response) {
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
  public static update(req: Request, res: Response) {
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
  public static list(req: Request, res: Response) {
    try {
      res.send({ success: true, speechfilters: "" });
    }
    catch (e) {
      res.sendError(e, "System was unable to list the speech filter(s)");
    }
  }
}