import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }: { mode: string }): UserConfigExport => ({
  server: {
    host: "127.0.0.1", // Melhor para Windows
    port: 8080,
    open: true, // Abre no navegador automaticamente
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));