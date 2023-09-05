# axios-tauri-api-adapter

[![](https://img.shields.io/npm/v/axios-tauri-api-adapter)](https://www.npmjs.com/package/axios-tauri-api-adapter)
[![](https://img.shields.io/npm/l/axios-tauri-api-adapter)](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/LICENSE)
[![使用WebStorm开发维护](https://img.shields.io/badge/WebStorm-提供支持-blue.svg)](https://www.jetbrains.com/?from=axios-tauri-api-adapter)

Makes it easy to use Axios in Tauri App

# Installation

```
npm install axios-tauri-api-adapter
```

# Usage

###  **TypeScript / JavaScript**

```js
import axios from 'axios';
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';
const client = axios.create({ adapter: axiosTauriApiAdapter });
```

### **Tauri App**

Add the following configuration to the `tauri.config.json` [See Details](https://tauri.app/v1/api/config#httpallowlistconfig)

```json5
{
  "tauri": {
    "allowlist": {
      "http": {
        "all": true, // Use this flag to enable all HTTP API features.
        "request": true, // Allows making HTTP requests.
        "scope": ["https://example.com/*"] // access scope for the HTTP APIs.
      }
    }
  }
}
```

# Features
- HTTP Requests use `@tauri-apps/api/http` instead of `XHR(XMLHttpRequest)`
- Add `config.jwt` It's going to add JWT to the header

# Resources

* [Changelog](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/CHANGELOG.md)
* [Contributing Guide](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/CONTRIBUTING.md)
* [Code of Conduct](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/CODE_OF_CONDUCT.md)

## License

**MIT License**

## JetBrains Support

**The project has always been developed in the Idea integrated development environment under JetBrains, based on the
free JetBrains Open Source license(s) genuine free license, I would like to express my gratitude here**

![Jetbrains](https://github.com/persiliao/static-resources/blob/master/jetbrains-logos/jetbrains-variant-4.svg)