import {
  default as axios,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse
} from "axios";
import * as ENV from "../env";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export class HTTP {
  private static readonly Mode = ENV.MODE;
  private static readonly Target = ENV.TARGET;
  private static readonly Development: AxiosRequestConfig = {
    baseURL: "http://localhost/" + HTTP.Target + "/api/",
    timeout: 1000
  };
  private static readonly Production: AxiosRequestConfig = {
    baseURL: "https://rufftiger.com" + HTTP.Target + "/api/",
    timeout: 1000
  };
  private path: string;
  constructor(path: string) {
    this.path = path;
  }
  private getInstance() {
    if (HTTP.Mode === "development") return axios.create(HTTP.Development);
    else return axios.create(HTTP.Production);
  }
  public get(config?: AxiosRequestConfig) {
    if (config) config.method = "get";
    return this.getInstance().get(this.path, config);
  }
  public post(config?: AxiosRequestConfig) {
    if (config) config.method = "post";
    return this.getInstance().post(this.path, config);
  }
  public patch(config?: AxiosRequestConfig) {
    if (config) config.method = "patch";
    return this.getInstance().patch(this.path, config);
  }
  public delete(config?: AxiosRequestConfig) {
    if (config) config.method = "delete";
    return this.getInstance().delete(this.path, config);
  }
}

export default HTTP;
