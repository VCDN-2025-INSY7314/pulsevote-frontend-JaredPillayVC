// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const sslDir = path.resolve(__dirname, 'ssl')

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.join(sslDir, 'key.pem')),
      cert: fs.readFileSync(path.join(sslDir, 'cert.pem')),
    },
    port: 5173, // default Vite dev port
  },
})
