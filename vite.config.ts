import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import imageminPlugin from 'vite-plugin-imagemin';
import { resolve } from 'path'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          '@/store': [
            'useLocal',
            'useTemp'
          ],
          '@arco-design/web-vue':[
            'Message',
            'Modal',
            'Notification'
          ],
          'vue-i18n':[
            'useI18n'
          ],
          '@/api': [
            'apiSystem',
            'apiAdmin',
            'apiOtc',
            'apiTrs',
            'apiWealth',
            'apiCms',
            'apiMarket'
          ],
          'lodash':[
            'cloneDeep',
            'throttle',
            'debounce'
          ],
          '@/hooks/filter':['useFilter'],
          '@/hooks/tree':['useTreeToList'],
          '@/hooks/permission':['usePermission','useFirstMenu'],
          '@/hooks/export':['downloadExcel','useDownloadExcel'],
          '@/hooks/rules':['useRules']
        }
      ],
      resolvers: [
        ArcoResolver()
      ],
      dts:'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
          resolveIcons:true
        })
      ],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    imageminPlugin()
  ],
  build:{
    minify: 'terser',
    terserOptions: {
      compress: {
          //生产环境时移除console.log()
          drop_console: true,
          drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 2000, // 根据项目需求调整
  },
  base: './',//相对路径
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      'vue':'vue/dist/vue.esm-bundler.js'
    },
    extensions: ['.js', '.json', '.ts', '.mjs']
  },
  server: {
    host: '0.0.0.0',
    port: 886,
    open: false,
    proxy: {
      '/api': {
        target: "http://api.link-common.dev.linknet.ltd/",
        // target: "http://api.hx-trs.dev.linknet.ltd/",
        // target: "http://api.link-otc.dev.linknet.ltd/",
        // target: "http://100.0.6.69:9501/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/')
      },
    },
  }
})
