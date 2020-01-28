import { Injectable, Scope } from "@nestjs/common";
import { Request, Response } from "express";

/**
 * Only inject to global services to create a request id => T
 * @typedef T Object getting stored for future use
 */
@Injectable({scope: Scope.TRANSIENT})
export class TagService<T> {
  private store: Map<string, T> = new Map();
  constructor() {}
  public add(req: Request, res: Response, dot: T) {
    const reqID = this.get(req);
    this.store.set(reqID, dot);
    res.on("finish", () => {
      this.store.delete(reqID);
    });
  }
  public get(req: Request): string {
    return req.cookies["uuid"];
  }
}

export default TagService;