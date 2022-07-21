import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let config = {
    plugins: [vue()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      base: env.PROD ? '/drawing/' : '/'
  }
  return config;
})