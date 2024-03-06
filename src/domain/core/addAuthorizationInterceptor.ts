import { Interceptor } from "@/domain/core/interceptor";
import { AxiosRequestConfig } from "axios";

export const addAuthorizationInterceptor: (
  token: string
) => Interceptor<AxiosRequestConfig> = (token) => ({
  onFulfilled: async (config) => {
    return {
      ...config,
      headers: token
        ? { ...config.headers, Authorization: `Bearer ${token}` }
        : config.headers,
    };
  },
});
