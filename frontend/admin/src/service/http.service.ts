import { default as axios, AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

export class Http
{
  private static _value: AxiosRequestConfig = {
    baseURL: "localhost",
    timeout: 1000,
  }
  private static _instance: AxiosInstance = axios.create(Http._value);
  public static get(path: string, config: AxiosRequestConfig): Promise<AxiosResponse>
  {
    return this._instance.get(this._value.baseURL +  path , config);
  }
  public static post(path: string, config: AxiosRequestConfig): Promise<AxiosResponse>
  {
    return this._instance.post(this._value.baseURL + path , config)
  }
  public static patch(path: string, config: AxiosRequestConfig): Promise<AxiosResponse>
  {
    return this._instance.patch(this._value.baseURL + path , config);
  }
  public static delete(path: string, config: AxiosRequestConfig): Promise<AxiosResponse>
  {
    return this._instance.delete(this._value.baseURL + path , config);
  }
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";