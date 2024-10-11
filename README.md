# axios-tauri-api-adapter

[![](https://img.shields.io/npm/v/axios-tauri-api-adapter)](https://www.npmjs.com/package/axios-tauri-api-adapter)
[![](https://img.shields.io/npm/l/axios-tauri-api-adapter)](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/LICENSE)

Makes it easy to use Axios in Tauri App, Adapted for Tauri App 2.0.0

v1 version see https://github.com/persiliao/axios-tauri-api-adapter/tree/v1

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

Configure the allowed URLs [Tauri App HTTP client](https://v2.tauri.app/plugin/http-client/#usage)

```json5
{
  "permissions": [
    {
      "identifier": "http:default",
      "allow": [{ "url": "https://*.tauri.app" }],
      "deny": [{ "url": "https://private.tauri.app" }]
    }
  ]
}
```

# Features
- Add `config.jwt` It's going to add JWT to the header

# Resources

* [Changelog](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/CHANGELOG.md)
* [Contributing Guide](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/CONTRIBUTING.md)
* [Code of Conduct](https://github.com/persiliao/axios-tauri-api-adapter/blob/master/CODE_OF_CONDUCT.md)
