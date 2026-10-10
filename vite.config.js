import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'

export default defineConfig({
  plugins: [{
    // script.js is a classic (non-module) script and CNAME is not referenced by
    // any page, so Vite would otherwise leave both out of the build output
    name: 'copy-static-files',
    generateBundle() {
      for (const fileName of ['script.js', 'CNAME']) {
        this.emitFile({ type: 'asset', fileName, source: readFileSync(resolve(__dirname, fileName)) })
      }
    }
  }],
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      // Multi-page site: list every HTML page so `vite build` includes it
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'VS-AboutUS.html'),
        careers: resolve(__dirname, 'VS-Careers.html'),
        articleBI: resolve(__dirname, 'VS-Insight-Articles/VS-Insight-Article-BIDisruption.html'),
        articleData: resolve(__dirname, 'VS-Insight-Articles/VS-Insight-Article-DataDilemma.html'),
        articleEnterprise: resolve(__dirname, 'VS-Insight-Articles/VS-Insight-Article-EnterpriseTransformation.html')
      }
    }
  }
})
