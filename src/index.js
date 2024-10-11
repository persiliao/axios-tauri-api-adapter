import { fetch } from '@tauri-apps/plugin-http'
import buildURL from 'axios/lib/helpers/buildURL'
import buildFullPath from 'axios/lib/core/buildFullPath'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { AxiosError } from 'axios'

const base64Encode = (str) => Buffer.from(str, 'binary').toString('base64')

const buildBasicAuthorization = (basicCredentials) => {
  const username = basicCredentials.username || ''
  const password = basicCredentials.password ? encodeURIComponent(basicCredentials.password) : ''
  return {
    Authorization: `Basic ${base64Encode(`${username}:${password}`)}`,
  }
}

const buildJWTAuthorization = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  }
}

const transform = (data, type) => {
  switch (type) {
    case 'arrayBuffer': {
      return new Response(data).arrayBuffer()
    }
    case 'blob': {
      return new Response(data).blob()
    }
    case 'formData': {
      return new Response(data).formData()
    }
    case 'json': {
      return new Response(data).json()
    }
    case 'text': {
      return new Response(data).text()
    }
    default: {
      throw new Error('Response type unsupported type: ' + type)
    }
  }
}

export default (config) => {
  return new Promise((resolve, reject) => {
    const requestUrl = buildURL(buildFullPath(config.baseURL, config.url), config.params, config.paramsSerializer)
    console.log('axios.config', config)
    const requestConfig = {
      method: config.method,
      headers: {
        ...config.headers,
        ...(config.auth && buildBasicAuthorization(config.auth)),
        ...(config.jwt && buildJWTAuthorization(config.jwt)),
      },
      connectTimeout: config.timeout,
      maxRedirections: config.maxRedirects,
      body: config.data,
    }
    fetch(requestUrl, requestConfig).then((response) => {
      const statusText = ReasonPhrases[StatusCodes[response.status]]
      const responseType = config.responseType || 'json'
      if (response.ok) {
        transform(response.body, responseType).then(body => {
          return resolve({
            data: body,
            status: response.status,
            statusText: statusText,
            headers: {
              ...response.headers,
            },
            config: config,
          })
        })
      } else {
        transform(response.body, responseType).then(body => {
          return reject(
              new AxiosError(
                  'Request failed with status code ' + response.status,
                  [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
                  config,
                  {
                    url: requestUrl,
                    ...requestConfig
                  },
                  {
                    config: config,
                    data: body,
                    headers: response.headers,
                    status: response.status,
                    statusText: statusText,
                  },
              ),
          )
        })
      }
    }).catch(reason => {
      return reject(
          new AxiosError(
              reason,
              AxiosError.ERR_BAD_REQUEST,
              config,
          ),
      )
    })
  })
}
