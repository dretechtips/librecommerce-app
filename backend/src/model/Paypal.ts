import { Money } from "../type/Money";
import { default as axios, AxiosAdapter, AxiosResponse } from "axios";
import { Order } from "./Order";
import { OrderProduct } from "../interface/Order.interface";
import { Product } from "../model/Inventory";
import { ProductConstructor } from "../interface/Inventory.interface";

export class PaypalSetup
{
  private _client: string;
  private _secret: string;
  constructor(client: string = "", secret: string = "")
  {
    this._client = client;
    this._secret = secret;
    this.auth();
  }

  private async auth(): Promise<Paypal>
  {
    try {
      const buffer: Buffer = new Buffer(`${this._client}:${this._secret}`, "base64");
      const sBuffer: string = buffer.toString();
      const auth: AxiosResponse = await axios({
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${sBuffer}`
        },
        data: {
          grant_type: "client_credentials"
        }
      });
      if (auth.status === (200 || 201 || 202)) {
        return new Paypal(auth.data.access_token);
      }
      else
        throw new Error("Paypal was unable to verify the credientals.");
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
}

export class Paypal {
  private _oauthAPI: string = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
  private _paymentAPI: string = 'https://api.sandbox.paypal.com/v2/payments/captures/';
  private _orderAPI: string = 'https://api.sandbox.paypal.com/v2/checkout/orders/';
  private _currency: string = "USD";
  private _accessToken: string;
  constructor(accessToken: string) {
    this._accessToken = accessToken;
  }
  public async refund(captureID: string, total: Money): Promise<void> {
    try {
      const result = await axios({
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
    catch (e) {
      const ex: Error = e;
      hconsole.log(ex.message);
    }
  }
  public async searchTransaction() {
    try {

    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex.message);
    }
  }
  public async verifyTransaction(orderID: string) {
    try {
      const order: Order = Order.From.id(orderID);
      const products: OrderProduct[] = order.getProducts();
      const pOrder: AxiosResponse = await axios({
        method: "GET",
        url: this._orderAPI + orderID,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this._accessToken}`,
        },
      });
      if (pOrder.data.error)
        throw new Error("Paypal order verification error!");
      if (pOrder.data.purhcase_units[0].amount.value !== order.getTotalPay())
        throw new Error("Server and Paypal transaction cost doesn't match");
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
}