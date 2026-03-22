import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        inventory: resolve(__dirname, 'inventory.html'),
        orders: resolve(__dirname, 'orders.html'),
        users: resolve(__dirname, 'users.html'),
      },
    },
  },
})
