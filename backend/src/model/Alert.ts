

enum TYPE {
  SERVER = "SERVER",
  DATABASE = "DATABASE",
  CLIENT = "CLIENT",
  PAYPAL = "PAYPAL",
  GOOGLE = "GOOGLE",
}

enum PRIORITY {
  DANGER,
  WARNING,
  INFO
}

export class Alert {
  private _message: string;
  private _priority: PRIORITY;
  private _type: TYPE;
  private _timestamp: Date;
  private _read: boolean;
  private _id: string;
  constructor(msg: string, priority: PRIORITY, type: TYPE) {
    this._message = msg;
    this._priority = priority;
    this._type = type;
    this._timestamp = new Date();
    this._read = false;
  }
  public setMessageAsRead(): void {
    this._read = true;
  }
  public getID(): string {
    return this._id;
  }
}

class AlertManager {
  private _alerts: Map<string, Alert>;
  constructor(alerts?: Alert[]) {
    this._alerts = new Map();
    if (!isNotSet(alerts)) {
      for (let i = 0; i < alerts.length; i++) {
        const alert: Alert = alerts[i];
        this._alerts.set(alert.getID(), alert);
      }
    }
  }
  public import() {
    // Get Message From Database
  }
  public add(alert: Alert, userID?: string[]) {
    if()
  }
  public remove() {
    
  }
}
