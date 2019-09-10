import { Money } from "../type/Money";
import { default as axios } from "axios";
import hconsole from "./Console";

export class Paypal
{
  private _client: string;
  private _secret: string;
  private _oauthAPI: string = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
  private _paymentAPI: string = 'https://api.sandbox.paypal.com/v2/payments/captures/';
  private _currency: string = "USD";
  private _accessToken: string;
  constructor(client: string = "", secret: string = "")
  {
    this._client = client;
    this._secret = secret;
    this.auth();
  }
  private auth()
  {
    this._accessToken = 'dasasa';
  }
  public async refund(captureID: string, total: Money)
  {
    try
    {
      const result =  await axios({
        method: "POST",
        url: this._paymentAPI + captureID + '/refund',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this._accessToken}`
        },
        data: JSON.stringify({
          amount: {
            currency_code: this._currency,
            value: total.getValue()
          }
        })
      });
      const refund = result.data;
    }
    catch(e)
    {
      const ex: Error = e;
      hconsole.log(ex.message);
    }
  }
  public async searchTransaction()
  {
    try {
      
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  public async transaction()
  {
    
  }
}