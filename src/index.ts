import { getClient, HttpVerb } from '@tauri-apps/api/http'
import { AxiosPromise } from 'axios'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { TauriAxiosRequestConfig } from './type'
import {
  generateBasicAuthorization,
  generateJWTAuthorization,
  generateUrl,
  getTauriRequestData,
  getTauriResponseType,
} from './util'

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
        url: generateUrl(config),
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
