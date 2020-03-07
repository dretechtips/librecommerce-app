declare module "ups_node" {
  class Default {
    constructor(
      licenseID: string,
      userID: string,
      password: string
    ): AddressValidation;
    useSandbox(val: boolean): void;
    setJsonResponse(val: boolean): void;
    makeRequest(options: any, callback: (data: any) => void): void;
    test(): Promise<boolean>;
  }
}
