declare module "ups_node" {
  export class AddressValidation extends Default {
    makeRequest(
      options: AddressValidiationData,
      callback: (data: any) => void
    ): void;
  }

  export interface AddressValidiationData {
    customerContext: string;
    city: string;
    stateProvinceCode: string;
  }
}
