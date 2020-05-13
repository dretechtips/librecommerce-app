export class InvalidDOTException extends Error {
  public name: string = "Invalid DOT";
  public message: string = "Invalid DOT type used";
  constructor() {
    super();
  }
}

export default InvalidDOTException;