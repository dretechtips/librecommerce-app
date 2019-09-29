import { AddressConstructor, PhoneNumConstructor } from "../interface/Location.interface";
import { Algorithms } from "../helper/Algorithms";
import { Char } from "./Char";
import { AddressInfo, isIPv4, isIPv6 } from "net";
import { Request } from "express";

export class Address
{
  private _streetNum: number = -1;
  private _route: string = "DEFAULT";
  private _locatity: string = "DEFAULT";
  private _county: string = "DEFAULT";
  private _state: string = "DEFAULT";
  private _country: string = "DEFAULT";
  private _zipCode: number = -1;
  constructor(address?: AddressConstructor | string)
  {
    if (address) {
      if (typeof address === "string") {

      }
      else {
        this._streetNum = address.streetNum;
        this._route = address.route;
        this._locatity = address.locatity ? address.locatity : "DEFAULT";
        this._county = address.county ? address.county : "DEFAULT";
        this._state = address.state;
        this._country = address.country;
        this._zipCode = address.zipCode;
      }
    }
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
  public getValue()
  {
    return this as AddressConstructor;
  }
}

export class EmailAddress
{
  private emailAddy: string;
  constructor(emailAddress: string)
  {
    try {
      this.emailAddy = emailAddress;
      if(!this.validation())
      {
        throw "Please check email address again!";
      }
    } catch (e) {
      const er: Error = e;
      hconsole.error(er.message);
    }
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
  public toString(): string
  {
    return this.emailAddy;
  }
}
//
// Fix PhoneNumber Automatic detection of the coutnry code
//
export class PhoneNum
{
  private _accessCode: number;
  private _countryCode: number;
  private _areaCode: number;
  private _localCode: number; 
  constructor(phoneNum: string | PhoneNumConstructor)
  {
    if(typeof phoneNum === "string")
    {
      this.strToPhoneNum(phoneNum);
    }
    else
    {
      if(phoneNum.accessCode) this._accessCode = phoneNum.accessCode;
      this._countryCode = phoneNum.countryCode;
      this._areaCode = phoneNum.areaCode;
      this._localCode = phoneNum.localCode;
    }
  }
  public toInt(): number
  {
    return parseInt(`${this._countryCode !== undefined ? this._accessCode : 1}${this._areaCode}${this._localCode}${this._accessCode}`);
  }
  public toString(): string
  {
    return `${this._countryCode !== undefined ? this._accessCode : '1'}${this._areaCode}${this._localCode}${this._accessCode}`;
  }
  public toDashString(): string
  {
    return `${this._countryCode !== undefined ? this._accessCode : '1'}-${this._areaCode}-${this._localCode}-${this._accessCode}`;
  }
  private strToPhoneNum(phoneNum: string): boolean
  {
    const aPhoneNum: string[] = Array.from(phoneNum);
    if(aPhoneNum.includes('-'))
    {
      const result = this.dashStrToPhoneNum(phoneNum);
      if(result) return true;
      return false;
    }
    else
    {
      const result = this.stdStrToPhoneNum(phoneNum);
      if(result) return true;
      return false;
    }
  }
  private dashStrToPhoneNum(phoneNum: string): boolean
  {
    const aPhoneNum: string[] = phoneNum.split('-');
    if(phoneNum.length === 12)
    {
      if(aPhoneNum[0].length === 3 && aPhoneNum[1].length === 3 && aPhoneNum[2].length === 4)
      {
        const result = this.phoneNumArraytoPhoneNum(aPhoneNum);
        if(result) return true;
        else return false;
      }
    }
    else if (phoneNum.length === 14)
    {
      if(aPhoneNum[0].length < 4 && aPhoneNum[1].length === 3 && aPhoneNum[2].length === 3 && aPhoneNum[3].length === 4)
      {
        const result = this.phoneNumArraytoPhoneNum(aPhoneNum);
        if(result) return true;
        else return false;
      }
    }
    return false;
  }
  private stdStrToPhoneNum(phoneNum: string) : boolean
  {
    if(phoneNum.length === 10)
    {
      this._areaCode === parseInt(phoneNum.substring(0, 2));
      this._localCode === parseInt(phoneNum.substring(3, 5));
      this._accessCode === parseInt(phoneNum.substring(6, 9));
    }
    else if (phoneNum.length === 11 || phoneNum.length === 12 || phoneNum.length === 13)
    {
      this._countryCode === parseInt(phoneNum.substring(0, 2));
      this._areaCode === parseInt(phoneNum.substring(3, 5));
      this._localCode === parseInt(phoneNum.substring(6, 9));
      this._accessCode === parseInt(phoneNum.substring())
    }
    return false;
  }
  private phoneNumArraytoPhoneNum(aPhoneNum: string[]): boolean
  {
    if(aPhoneNum.length === 3)
    {
      this._areaCode === parseInt(aPhoneNum[0]);
      this._localCode === parseInt(aPhoneNum[1]);
      this._accessCode === parseInt(aPhoneNum[2]);
      return true;
    }
    else if (aPhoneNum.length === 4)
    {
      this._countryCode === parseInt(aPhoneNum[0]);
      this._areaCode === parseInt(aPhoneNum[0]);
      this._localCode === parseInt(aPhoneNum[1]);
      this._accessCode === parseInt(aPhoneNum[2]);
      return true;
    }
    return false;
  }
}

export class IPAddress
{
  private _value: string;
  constructor(ip: string)
  {
    this.validateIPv4(ip);
    this.validateIPv6(ip);
  }
  public locate(): Address
  {
    
  }
  public toString(): string
  {
    return this._value;
  }
  private validateIPv4(ip: string)
  {
    if(isIPv4(ip)) this._value = ip;
  }
  private validateIPv6(ip: string)
  {
    if(isIPv6(ip)) this._value = ip;
  }
  public static generate(req: Request)
  {
    return new IPAddress(req.header('x-forward-for') || req.connection.remoteAddress);
  }
}