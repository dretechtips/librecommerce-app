import fs from "fs";
import { Injectable } from "@nestjs/common";
import InvalidDOTException from "../exception/InvalidDOT.exception";

/**
 * @todo Dynamic Configurations
 */
@Injectable()
export class ConfigService {
  
  private static path = "./config/"
  
  /**
   * Saves the config to the directory
   * @warning This method doesn't save to a database
   * @param path Path relative to the config file
   * @param config Config DOT
   * @param validatefn Config Validation Function
   */
  public async save<T>(path: string, config: T, validatefn?: (dot: any) => Promise<boolean>): Promise<void> {
    if(validatefn) {
      if(!(await validatefn(config)))
        throw new InvalidDOTException();
    }
    fs.writeFile(ConfigService.path + path + ".cfg", this.configToString(config), err => {
      if(err)
        throw err;
      console.log("Config [" + path + "]: " + "Has successfully loaded");
    })
    
  }

  /**
   * Saves but on exit instead
   * @see this.save
   */
  public saveOnExit<T>(path: string, config: T, validatefn?: (dot: any) => Promise<boolean>): Promise<void> {
    process.on("beforeExit", () => this.save(path, config, validatefn));
  }

  public async get<T>(path: string, validatefn?: (dot: any) => Promise<boolean>): Promise<T> {
    return new Promise((res, rej) => {
      fs.readFile(ConfigService.path + path + ".cfg", { encoding: "UTF-8" }, (err, data) => {
        if(err)
          rej(err)
        const config = this.stringToConfig(data);
        if((validatefn && validatefn(config)) || !validatefn)
          return config;
        throw new InvalidDOTException();
      })
    })
  }

  private configToString<T>(config: T): string {
    return Object.keys(config)
      .map(key => key + "\n" + config[key] + "\n" )
      .reduce((prev, cur) => prev + cur);
  }

}


export default ConfigService;