export enum AccountType {
  CUSTOMER,
  USER,
  NONE
}

export interface TypeDependentService {
  isAccountType(id: string): Promise<boolean>;
}
