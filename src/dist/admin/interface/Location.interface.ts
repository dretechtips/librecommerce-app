export interface AddressConstructor
{
  streetNum: number,
  route: string,
  locatity?: string,
  county?: string,
  state: string,
  country: string,
  zipCode: number, 
}

export interface PhoneNumConstructor
{
  accessCode?: number,
  countryCode: number,
  areaCode: number,
  localCode: number,
}
