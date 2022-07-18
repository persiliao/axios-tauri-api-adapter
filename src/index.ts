import { getClient, HttpVerb } from '@tauri-apps/api/http'
import { AxiosBasicCredentials, AxiosPromise, AxiosRequestConfig } from 'axios'
import { base64Encode, getTauriRequestData, getTauriResponseType } from './util'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { buildUrl } from './url'

export interface Authorization {
  Authorization: string
}

export function generateBasicAuthorization(basicCredentials: AxiosBasicCredentials): Authorization {
  const username = basicCredentials.username || ''
  const password = basicCredentials.password ? encodeURIComponent(basicCredentials.password) : ''
  return {
    Authorization: `Basic ${base64Encode(`${username}:${password}`)}`,
  }
}

export function generateJWTAuthorization(jwt: string): Authorization {
  return {
    Authorization: `Bearer ${jwt}`,
  }
}

export interface TauriAxiosRequestConfig extends AxiosRequestConfig {
  jwt?: string
}

export const axiosTauriApiAdapter = (config: TauriAxiosRequestConfig): AxiosPromise =>
  new Promise(async (resolve, reject) => {
    const client = await getClient({
      maxRedirections: config.maxRedirects,
    })
    let timeout = 5
    if (config.timeout !== undefined && config.timeout > 0) {
      timeout = Math.round(config.timeout / 1000)
    }

    client
      .request({
        body: getTauriRequestData(config.data),
        headers: {
          ...config.headers,
          ...(config.auth && generateBasicAuthorization(config.auth)),
          ...(config.jwt && generateJWTAuthorization(config.jwt)),
        },
        responseType: getTauriResponseType(config.responseType),
        timeout: timeout,
        url: buildUrl(config.baseURL, { path: config.url, queryParams: config.params }),
        method: <HttpVerb>config.method?.toUpperCase(),
      })
      .then((response) => {
        // @ts-ignore
        const statusText = ReasonPhrases[StatusCodes[response.status]]
        return resolve({
          data: response.data,
          status: response.status,
          statusText: statusText,
          headers: response.headers,
          config: config,
        })
      })
      .catch((error) => {
        return reject(error)
      })
  })

export default axiosTauriApiAdapter
