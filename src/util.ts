import { ResponseType as AxiosResponseType } from 'axios'
import { Body, ResponseType as TauriResponseType } from '@tauri-apps/api/http'

export const base64Decode = (str: string): string => Buffer.from(str, 'base64').toString('binary')
export const base64Encode = (str: string): string => Buffer.from(str, 'binary').toString('base64')

export const getTauriResponseType = (type?: AxiosResponseType): TauriResponseType => {
  let responseType = TauriResponseType.JSON
  if (type !== undefined && type !== null) {
    switch (type.toLowerCase()) {
      case 'json': {
        responseType = TauriResponseType.JSON
        break
      }
      case 'text': {
        responseType = TauriResponseType.Text
        break
      }
      default: {
        responseType = TauriResponseType.Binary
      }
    }
  }
  return responseType
}

export const getTauriRequestData = (data?: any): Body | undefined => {
  if (data === undefined || data === null) {
    return undefined
  }
  if (typeof data === 'string') {
    return Body.text(data)
  } else if (typeof data === 'object') {
    return Body.json(data)
  }
  return Body.bytes(data)
}
