import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        archive: resolve(__dirname, 'archive.html'),
        artists: resolve(__dirname, 'artists.html'),
        cart: resolve(__dirname, 'cart.html'),
        'order-confirmation': resolve(__dirname, 'order-confirmation.html'),
        product: resolve(__dirname, 'product.html'),
        track: resolve(__dirname, 'track.html'),
      },
    },
  },
})
