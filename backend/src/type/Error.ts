export class ProgramError extends Error {
  private _isMsgForClient: boolean;
  constructor(msg: string, isMsgForClient?: boolean) {
    super(msg);
    this.name = "Program Error";
    if (isMsgForClient)
      this._isMsgForClient = true;
    else
      this._isMsgForClient = false;
  }
  public isMsgForClient(): boolean {
    return this._isMsgForClient;
  }
}

export class ServerError extends ProgramError {
  constructor(msg: string, isMsgForClient?: boolean) {
    super(msg, isMsgForClient);
    this.name = "Server Error";
  }
}

export class ClientError extends ProgramError {
  constructor(msg: string, isMsgForClient?: boolean) {
    super(msg, isMsgForClient);
    this.name = "Client Error";
  }
}

export class DatabaseError extends ProgramError {
  constructor(msg: string, isMsgForClient?: boolean) {
    super(msg, isMsgForClient);
    this.name = "Database Error";
  }
}
