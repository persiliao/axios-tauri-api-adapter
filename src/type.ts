import { InternalAxiosRequestConfig } from 'axios'

export interface Authorization {
  Authorization: string
}

export interface TauriAxiosRequestConfig extends InternalAxiosRequestConfig {
  jwt?: string
}
