import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../../constants";

export interface IHttpService {
  get: <T>(url: string, params?: any) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data: any) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, data?: any) => Promise<AxiosResponse<T>>;
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  getClient: () => AxiosInstance;
  attachHeaders: (headers: any) => void;
  removeHeaders: (headerKeys: string[]) => void;
  setBaseUrl: (url: string) => void;
}

export class HttpService implements IHttpService {
  readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;

    this.client.defaults.headers.post = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  public getClient = (): AxiosInstance => this.client;

  public get = <T>(url: string, params?: any): Promise<AxiosResponse<T>> => {
    if (params) {
      return this.client.get<T>(url, {
        params,
      });
    }
    return this.client.get<T>(url);
  };

  public post = <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return this.client.post<T>(url, data);
  };

  public put = <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return this.client.put<T>(url, data);
  };

  public delete = <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return this.client.delete<T>(url, config);
  };

  public attachHeaders = (headers: any): void => {
    Object.assign(this.client.defaults.headers, headers);
  };

  public removeHeaders = (headerKeys: string[]): void => {
    headerKeys.forEach((key) => delete this.client.defaults.headers[key]);
  };

  setBaseUrl = (url: string): void => {
    this.client.defaults.baseURL = url;
  };
}

const clientConfig: AxiosRequestConfig = {
  baseURL: API.BASE_URL[process.env.NODE_ENV],
};

const axiosClient = axios.create(clientConfig);

export default new HttpService(axiosClient);
