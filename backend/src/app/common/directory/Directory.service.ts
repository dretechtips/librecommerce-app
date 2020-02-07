import { Injectable } from "@nestjs/common";
import fs from "fs";

@Injectable()
class DirectoryService {
  public doesDirExist(path: string): Promise<boolean> {
    return new Promise((res, rej) => {
      fs.access(path, error => {
        if (error?.code === "ENOENT") res(false);
        if (error) rej(error);
        res(true);
      });
    });
  }
  public makeDir(path: string): Promise<void> {
    return new Promise((res, rej) => {
      fs.mkdir(path, error => {
        if (error) rej(error);
        res();
      });
    });
  }
  public getFileAsString(path: string): Promise<string> {
    return new Promise((res, rej) => {
      fs.readFile(path, { encoding: "UTF-8" }, (error, data) => {
        if (error) rej(error);
        res(data);
      });
    });
  }
  public serializeDataAsString(path: string): Promise<string[][]> {
    return this.getFileAsString(path).then(cur => {
      return cur.split("\n").map(cur => cur.split(" "));
    });
  }
}

export default DirectoryService;
