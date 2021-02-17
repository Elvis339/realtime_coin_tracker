import { HttpService, IHttpService } from "./HttpService";

export interface IBaseService {
  readonly apiClient: IHttpService;
}

export class BaseService implements IBaseService {
  readonly apiClient: IHttpService;

  get client() {
    return this.apiClient;
  }

  constructor() {
    this.apiClient = HttpService;
  }
}

export default BaseService;
