export class HttpError extends Error {
  private _notifyClient: boolean;
  constructor(msg: string, notifyClient?: boolean) {
    super(msg);
    this.name = "Program Error";
    if (notifyClient)
      this._notifyClient = true;
    else
      this._notifyClient = false;
  }
  public canNofifyClient(): boolean {
    return this._notifyClient;
  }
}

export class ServerError extends HttpError {
  constructor(msg: string, notifyClient?: boolean) {
    super(msg, notifyClient);
    this.name = "Server Error";
  }
}

export class ClientError extends HttpError {
  constructor(msg: string, notifyClient?: boolean) {
    super(msg, notifyClient);
    this.name = "Client Error";
  }
}

export class DatabaseError extends HttpError {
  constructor(msg: string, notifyClient?: boolean) {
    super(msg, notifyClient);
    this.name = "Database Error";
  }
}

export class UserError extends HttpError {
  constructor(msg: string, notifyClient?: boolean) {
    super(msg, notifyClient);
    this.name = "User Error";
  }
}
