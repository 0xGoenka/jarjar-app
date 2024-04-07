import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
    this.instance.defaults.baseURL = import.meta.env.VITE_RPC_URL;
    this.instance.defaults.timeout = 1500;

    this.instance.interceptors.request.use(
      (config) => {
        // You can modify the request config here
        // For example, you can add a token to the request headers
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
        return config;
      },
      (error) => {
        // Handle request error here
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        // If the response is successful, return it as it is
        return response;
      },
      (error) => {
        // If the error status is 401 (Unauthorized), you can handle invalid token here
        if (error.response?.status && error.response.status === 401) {
          // Clear your token here
          // For example, if you are using localStorage for token storage
          console.log("Unauthorized");
          localStorage.removeItem("access_token");
          window.dispatchEvent(new Event("logout"));
        }
        return Promise.reject(error);
      }
    );
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
