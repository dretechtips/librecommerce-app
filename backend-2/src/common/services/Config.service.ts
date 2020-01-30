import { Injectable } from "@nestjs/common";
import DirectoryService from "./Directory.service";
import path from "path";

@Injectable()
class ConfigService {
  private dir = "./config";
  constructor(private readonly directory: DirectoryService) {
    this.init();
  }
  private async init() {
    const exists = await this.directory.doesDirExist(this.dir);
    if (!exists) this.makeDir();
  }
  private makeDir() {
    this.directory.makeDir(this.dir);
  }
  /**
   * @typedef D Config Return Type
   */
  public async get<D>(namespace: string, fileName: string): Promise<D> {
    const data = (await this.directory.serializeDataAsString(
      path.join(this.dir, namespace, fileName + ".txt")
    )) as [string, string][];
    const object: any = {};
    for (let keyValue in data) {
      object[keyValue[0]] = keyValue[1];
    }
    return object as D;
  }
}

export default ConfigService;
