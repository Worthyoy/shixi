import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus()],
  transpileDependencies: true,
  server: {
    cors: true,//默认启用运行任何源
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'http://43.138.12.254:9005/',
        changeOrigin: true,
        withCredentials: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }


})
