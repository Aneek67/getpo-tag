import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        archive: resolve(__dirname, 'archive.html'),
        cart: resolve(__dirname, 'cart.html'),
        'order-confirmation': resolve(__dirname, 'order-confirmation.html'),
        product: resolve(__dirname, 'product.html'),
        track: resolve(__dirname, 'track.html'),
        // 'admin-dashboard': resolve(__dirname, 'admin-dashboard.html'),
        // 'admin-inventory': resolve(__dirname, 'admin-inventory.html'),
        // 'admin-orders': resolve(__dirname, 'admin-orders.html'),
        // 'admin-users': resolve(__dirname, 'admin-users.html'),
      },
    },
  },
})
