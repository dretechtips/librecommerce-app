export namespace IAlert {
  export namespace Send {
    export interface Body {
      msg: string;
      all: boolean;
      clientIDs: string[];
      adminIDs: string[];
      level: LEVEL;
    }
    export interface Constructor {
      msg: string;
      all: boolean;
      clientIDs: string[];
      adminIDs: string[];
      level: LEVEL;
    }
    export interface Value extends Constructor {
      timestamp: Date;
    }
  }
  export namespace Recieve {
    export interface Constructor {
      msg: string;
      senderID: string;
      level: LEVEL;
    }
  }
  export enum LEVEL {
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger",
  }
}
