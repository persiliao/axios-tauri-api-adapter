import { getClient, HttpVerb } from '@tauri-apps/api/http'
import { AxiosError, AxiosPromise } from 'axios'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { TauriAxiosRequestConfig } from './type'
import {
  buildBasicAuthorization,
  buildJWTAuthorization,
  buildTauriRequestData,
  buillRequestUrl,
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
        body: buildTauriRequestData(config.data),
        headers: {
          ...config.headers,
          ...(config.auth && buildBasicAuthorization(config.auth)),
          ...(config.jwt && buildJWTAuthorization(config.jwt)),
        },
        responseType: getTauriResponseType(config.responseType),
        timeout: timeout,
        url: buillRequestUrl(config),
        method: <HttpVerb>config.method?.toUpperCase(),
      })
      .then((response) => {
        // @ts-ignore
        const statusText = ReasonPhrases[StatusCodes[response.status]]
        if (response.ok) {
          return resolve({
            data: response.data,
            status: response.status,
            statusText: statusText,
            headers: response.headers,
            config: config,
          })
        } else {
          reject(
            new AxiosError(
              'Request failed with status code ' + response.status,
              [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
              config,
              client,
              {
                data: response.data,
                status: response.status,
                statusText: statusText,
                headers: response.headers,
                config: config,
              }
            )
          )
        }
      })
      .catch((error) => {
        return reject(error)
      })
  })

export default axiosTauriApiAdapter
