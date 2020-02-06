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
   * @params path from config
   */
  public async get<D>(configPath: string): Promise<D> {
    const data = (await this.directory.serializeDataAsString(
      path.join(this.dir, configPath)
    )) as [string, string][];
    const object: any = {};
    for (let keyValue in data) {
      object[keyValue[0]] = keyValue[1];
    }
    return object as D;
  }
}

export default ConfigService;
