import fs = require("fs");

export class DirManager {
  private _dirName: string;
  private _files: Map<string, FileManager>;
  constructor(dirname: string) {
    const dirExists: boolean = fs.existsSync(dirname);
    if (!dirExists) {
      fs.mkdirSync(dirname);
    }
  }
  public addFile(filename: string, encoding: string): FileManager {
    const file: FileManager = new FileManager(filename, this._dirName);
    this._files.set(filename, file);
    return file;
  }
  public getFile(filename: string): FileManager {
    const file: FileManager = this._files.get(filename);
    if (!file)
      return null;
    else
      return file;
  }
  public deleteFile(filename: string): boolean {
    return this._files.delete(filename);
  }
  public getAllFile(): FileManager[] {
    const files: FileManager[] = Array.from(this._files.values());
    return files;
  }
}

export class FileManager {
  private _filename: string;
  private readonly _dirname: string;
  constructor(filename: string, dirname: string) {
    this._filename = filename;
    this._dirname = dirname;
  }
  private getPath(): string {
    return this._dirname + "/" + this._filename;
  }
  public getFileName(): string {
    return this._filename;
  }
  public changeFileName(filename: string) {
    fs.renameSync(this.getPath(), this._dirname + "/" + filename);
    this._filename = filename;
  }
  public addContent(content: string, encoding: string): void {
    try {
      fs.promises.writeFile(this.getPath(), content, { encoding });
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public removeFile(): void {
    try {
      fs.promises.unlink(this.getPath());
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public appendToFile(content: string): boolean {
    try {

    }
    catch (e) {

    }
  }
  public writeToFile(content: string, encoding: string): boolean {

  }
  public getFileContent(encoding: string): string {

  }
}