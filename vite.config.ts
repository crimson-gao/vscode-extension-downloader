import tailwindcss from '@tailwindcss/vite';
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(),],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
      },
    },
  };
});
