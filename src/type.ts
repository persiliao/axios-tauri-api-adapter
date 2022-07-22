import { AxiosRequestConfig } from 'axios'

export interface Authorization {
  Authorization: string
}

export interface TauriAxiosRequestConfig extends AxiosRequestConfig {
  jwt?: string
}
