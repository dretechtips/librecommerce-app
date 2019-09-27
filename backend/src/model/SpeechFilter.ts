import fs = require('fs');
import cron = require('node-cron');
import { DirManager, FileManager } from './FileManager';
import { SpeechFilterBody } from "../interface/SpeechFilter.interface";
import uuid = require('uuid/v4');

export class SpeechFilter {
  private _file: FileManager;
  private _words: string[];
  private _deletable: boolean;
  private _id: string;
  constructor(words: string[], file: FileManager) {
    this._id = uuid();
    this._deletable = true;
    this._words = words;
    if (!words) this._words = [];
    this._file = file;
    this.setEvents();
  }
  private setEvents(): void {
    process.on("beforeExit", () => this.save());
    cron.schedule('0 2 * * *', () => this.save());
  }
  public getID(): string {
    return this._id;
  }
  public getFileName(): string {
    return this._file.getFileName();
  }
  public lock(): SpeechFilter {
    this._deletable = false;
    return this;
  }
  public save(): void {
    this._file.writeToFile(this.getWords().toString(), "utf-8");
  }
  public getWords(): string[] {
    return this._words;
  }
  public setWords(words: string[]) {
    this._words = words;
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
  public toPrimObj(): SpeechFilterBody {
    const SFBody: SpeechFilterBody = {
      name: this._file.getFileName(),
      words: this._file.getFileContent("utf-8")
    }
    return SFBody;
  }
}

export class SFManager {
  private _dir: DirManager;
  private _SFs: Map<string, SpeechFilter>;
  constructor(directory: string) {
    this._dir = new DirManager(directory);
    this._SFs = new Map();
  }
  public import(filename: string): SpeechFilter {
    let file: FileManager = this._dir.getFile(filename);
    if (!file)
      file = this.add([], filename);
    const content: string = file.getFileContent("utf-8");
    const SF: SpeechFilter =  new SpeechFilter(content.split(","), file);
    this._SFs.set(SF.getID(), SF);
    return SF;
  }
  public importAll(): SpeechFilter[] {
    const files: FileManager[] = this._dir.getAllFile();
    const filters = new Array<SpeechFilter>(files.length);
    if (!files)
      throw new Error("There is no file in this directory to import.");
    for (let i = 0; i < filters.length; i++) {
      filters[i] = new SpeechFilter(
        files[i].getFileContent("utf-8").split(','),
        files[i]);
    }
    return filters;
  }
  public add(words: string[], filename: string): FileManager {
    const file: FileManager = this._dir.addFile(filename, "utf-8");
    file.writeToFile(words.toString(), "utf-8");
    return file;
  }
  public remove(filename: string): boolean {
    return this._dir.deleteFile(filename);
  }
  public exists(filename: string): boolean {
    const file: FileManager = this._dir.getFile(filename);
    if (!file)
      return false;
    else
      return true;
  }
}
