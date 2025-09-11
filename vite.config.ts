import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': process.env.APIs_URL || 'http://localhost:3000',
    },
  },
   define: {
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
    'process.env.VITE_APP_NAME': JSON.stringify(process.env.VITE_APP_NAME),
  },
  plugins: [react()],
})
