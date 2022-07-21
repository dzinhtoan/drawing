import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      // dev specific config
      plugins: [vue()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      base:'/',
    }
  } else {
    // command === 'build'
    return {
      // build specific config
      // dev specific config
      plugins: [vue()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      base:'/drawing/',
    }
  }
})