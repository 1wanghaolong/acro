import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    configArcoStyleImportPlugin(),
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
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.js', '.json', '.ts', '.mjs'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/breakpoint.less'
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 886,
    open: false,
    proxy: {
      '/api': {
        target: "http://aos.esop.dev.linknet.ltd",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/')
      },
    },
  }
});
