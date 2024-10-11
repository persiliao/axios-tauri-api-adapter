import { AxiosPromise, InternalAxiosRequestConfig } from 'axios'

export interface TauriAxiosRequestConfig extends InternalAxiosRequestConfig {
  jwt?: string
}
export declare const axiosTauriApiAdapter: (config: TauriAxiosRequestConfig) => AxiosPromise
export default axiosTauriApiAdapter
declare module 'axios-tauri-api-adapter'
