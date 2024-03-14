import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { addRequestInterceptor } from "./interceptor";
import { addAuthorizationInterceptor } from "./addAuthorizationInterceptor";

export class ApiService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
    this.instance.defaults.baseURL = import.meta.env.VITE_RPC_URL;
    this.instance.defaults.timeout = 1500;
  }

  setBearerToken(token: string | null) {
    if (!token) return;
    addRequestInterceptor(this.instance, addAuthorizationInterceptor(token));
  }

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put(url, data, config);
  }

  patch<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch(url, data, config);
  }

  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete(url, config);
  }
}
