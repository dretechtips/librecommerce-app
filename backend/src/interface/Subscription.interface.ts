// Remove package 

export namespace ISubscription {
  export namespace Admin {
    export interface Body {
      name: string;
      productsID: string[];
      discount: number;
    }
  }
  export namespace Client {
    export interface Body {
      name: string;
      productsID: string[];
    }
  }
}
