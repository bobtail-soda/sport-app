import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${env.VITE_BASE_API_URL ?? 'http://localhost:5000/'}`;

  return {
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [react()],
  };
});


