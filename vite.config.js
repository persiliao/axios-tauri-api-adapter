import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, "src/index.js")],
      formats: ['es']
    }
  },
  resolve: {
      alias: {
          'axios/lib': resolve(__dirname, './node_modules/axios/lib'),
      },
  },
  plugins: [
      viteStaticCopy({
        targets: [
          {
            src: resolve(__dirname, "src/index.d.ts"),
            dest: ""
          }
        ]
      })
  ]
});
