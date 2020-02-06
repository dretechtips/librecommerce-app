import { Injectable, Inject } from "@nestjs/common";
import fs from "fs";
import { Mongoose, connect } from "mongoose";

@Injectable()
export class DatabaseService {
  private domain: string;
  private username: string;
  private password: string;
  constructor(@Inject("DATABASE_CONFIG") configPath: string) {
    const file: string = fs.readFileSync(configPath, { encoding: "UTF-8" });
    const pairs = file.split("\n");
    pairs.forEach(this.setFields);
    this.login();
  }
  private setFields(s: string) {
    const cur = s.split(" ");
    if (cur[0] === "DOMAIN") this.domain = cur[1];
    if (cur[0] === "USERNAME") this.username = cur[1];
    if (cur[0] === "PASSWORD") this.password = cur[1];
  }
  private login() {
    if (this.domain && this.username && this.password)
      connect(
        "mongodb://" + this.username + ":" + this.password + "@" + this.domain
      );
    throw new Error("Fields were not set properly.");
  }
}

export default DatabaseService;
