import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        product: resolve(__dirname, 'product.html'),
        cart: resolve(__dirname, 'cart.html'),
        artists: resolve(__dirname, 'artists.html'),
        archive: resolve(__dirname, 'archive.html'),
        settings: resolve(__dirname, 'settings.html')
,
      },
    },
  },
})
