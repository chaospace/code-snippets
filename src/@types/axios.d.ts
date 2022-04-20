import 'axios';

/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'axios' {
  // intercepter를 통해 data를 바로 리턴하므로 불필욜한 AxiosResponse 제거
  export interface AxiosInstance {
    request<T = any, R = T>(config: AxiosRequestConfig): Promise<R>;
    get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    patch<T = any, R = T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  }
}
