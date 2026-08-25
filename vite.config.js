import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Prevent EBUSY crashes on Windows from filenames with spaces/special chars
      ignored: ['**/public/**'],
    },
  },
})
