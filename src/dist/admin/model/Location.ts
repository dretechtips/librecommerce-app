import { AddressConstructor } from "../interface/Location.interface";
import { Algorithms } from "../model/Algorithms";
import { Char } from "./Char";

export class Address implements AddressConstructor
{
  streetNum = -1;
  route = "N/A";
  locatity = "N/A";
  county = "N/A";
  state = "N/A";
  country = "N/A";
  zipCode = -1;
  constructor(address?: AddressConstructor)
  {
    this.streetNum = address.streetNum;
    this.route = address.route;
    this.locatity = address.locatity;
    this.county = address.county;
    this.state = address.state;
    this.country = address.country;
    this.zipCode = address.zipCode;
  };
  public static splitStreet(street: string): [number, string]
  {
    const streetSplit: string[] = street.replace(/,/gm, '').split(' ').filter(cur => cur !== '');
    if(parseInt(streetSplit[0]) !== NaN && parseInt(streetSplit[1]) === NaN)
    {
      return [parseInt(streetSplit[0]), streetSplit[1]];
    }
  }
  public async validation(): Promise<boolean>
  {
    // Use Google Geocoding API
  }
  
}

export class EmailAddress
{
  private emailAddy: string;
  constructor(emailAddress: string)
  {
    this.emailAddy = emailAddress;
  }
  public validation(): boolean
  {
    const atIndex: number = Algorithms.String.reverseSearchForChar(this.emailAddy, new Char("@"));
    const dotIndex: number = Algorithms.String.reverseSearchForChar(this.emailAddy, new Char("."));
    if(atIndex < dotIndex)
    {
      return true;
    }
    else if (atIndex ===  -1 && dotIndex === -1)
    {
      return false;
    }
    else 
    {
      return false
    }
  }
}