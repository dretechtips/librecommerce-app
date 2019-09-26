export class ServerError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "Server Error";
  }
}

export class ClientError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "Client Error";
  }
}

export class DatabaseError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "Database Error";
  }
}
